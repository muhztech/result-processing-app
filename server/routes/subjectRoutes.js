const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all subjects
router.get('/', async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
});

// Temporary route to seed subjects
router.get('/seed', async (req, res) => {
  try {
    await prisma.subject.createMany({
      data: [
        { name: 'Mathematics' },
        { name: 'English Language' },
        { name: 'Physics' },
      ],
    });
    res.send('Subjects seeded ✅');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Seeding failed' });
  }
});

module.exports = router;
