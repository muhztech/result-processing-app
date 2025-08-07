// server/controllers/studentController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new student
const createStudent = async (req, res) => {
  try {
    const { regNumber, name, level } = req.body;

    if (!regNumber || !name) {
      return res.status(400).json({ error: 'regNumber and name are required' });
    }

    const existing = await prisma.student.findUnique({
      where: { regNumber },
    });

    if (existing) {
      return res.status(400).json({ error: 'Student already exists' });
    }

    const student = await prisma.student.create({
      data: {
        regNumber,
        name,
        level: level || 'ND1',
      },
    });

    res.status(201).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create student' });
  }
};

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
};
