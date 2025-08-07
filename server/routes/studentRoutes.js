// server/routes/studentRoutes.js

const express = require('express');
const router = express.Router();
const { createStudent, getAllStudents } = require('../controllers/studentController');

// @route   POST /api/students
// @desc    Create a new student
router.post('/', createStudent);

// @route   GET /api/students
// @desc    Get all students
router.get('/', getAllStudents);

module.exports = router;
