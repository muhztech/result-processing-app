// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Temporary route to seed courses
router.get('/seed', async (req, res) => {
  try {
    await prisma.course.createMany({
      data: [
        { name: 'Mathematics' },
        { name: 'English Language' },
        { name: 'Physics' },
      ],
    });
    res.send('Courses seeded ✅');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Seeding failed' });
  }
});

module.exports = router;
