// server/routes/uploadRoutes.js

const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Use memory storage for Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to upload students via Excel
router.post('/upload-students', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Read Excel file from buffer
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert Excel sheet to JSON
    const students = xlsx.utils.sheet_to_json(sheet);

    // Transform rows into expected format
    const data = students.map((row) => ({
      regNumber: String(row.MatricNumber).trim(),
      name: String(row.Name).trim(),
      level: row.Level?.trim() || 'ND1',
    }));

    // Save to DB
    await prisma.student.createMany({
      data,
      skipDuplicates: true, // avoid duplicates based on unique regNumber
    });

    res.status(200).json({ message: '✅ Students uploaded successfully' });
  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
