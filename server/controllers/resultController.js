// resultController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Helper function to compute grade and remark
function computeGrade(total) {
  let grade = '';
  let remark = '';

  if (total >= 70) {
    grade = 'A';
    remark = 'Excellent';
  } else if (total >= 60) {
    grade = 'B';
    remark = 'Very Good';
  } else if (total >= 50) {
    grade = 'C';
    remark = 'Good';
  } else if (total >= 45) {
    grade = 'D';
    remark = 'Fair';
  } else if (total >= 40) {
    grade = 'E';
    remark = 'Pass';
  } else {
    grade = 'F';
    remark = 'Fail';
  }

  return { grade, remark };
}

// ✅ Create result (with duplicate prevention)
const createResult = async (req, res) => {
  try {
    const { studentId, subject, ca, exam, semester } = req.body;

    if (!studentId || !subject || ca == null || exam == null || semester == null) {
      return res.status(400).json({ error: 'All fields (studentId, subject, ca, exam, semester) are required.' });
    }

    // Prevent duplicate for same student+subject+semester
    const existing = await prisma.result.findFirst({
      where: { studentId, subject, semester },
    });
    if (existing) {
      return res.status(400).json({ error: 'Result for this student, subject, and semester already exists.' });
    }

    const total = ca + exam;
    const { grade, remark } = computeGrade(total);

    const result = await prisma.result.create({
      data: {
        studentId,
        subject,
        ca,
        exam,
        total,
        grade,
        remark,
        semester,
      },
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all results
const getAllResults = async (req, res) => {
  try {
    const results = await prisma.result.findMany({
      include: { student: true },
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update result with role & semester restrictions
const updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { ca, exam, semester, role } = req.body;

    if (ca == null || exam == null) {
      return res.status(400).json({ error: 'CA and exam scores are required for update.' });
    }

    const existing = await prisma.result.findUnique({ where: { id: Number(id) } });
    if (!existing) {
      return res.status(404).json({ error: 'Result not found.' });
    }

    // Normalize role string
    const normalizedRole = String(role || '').toUpperCase().replace(/\s+/g, '');
    const isPrivileged = ['HOD', 'EXAMOFFICER', 'EXAM_OFFICER'].includes(normalizedRole);

    // Restrict modifying a passed result unless privileged
    if (existing.total >= 40 && !isPrivileged) {
      return res.status(403).json({ error: 'Only HOD or Exam Officer can update a passed result.' });
    }

    // Restrict semester change unless privileged
    if (semester != null && semester !== existing.semester && !isPrivileged) {
      return res.status(403).json({ error: 'Only HOD or Exam Officer can change the semester of an existing result.' });
    }

    const newTotal = ca + exam;
    const { grade, remark } = computeGrade(newTotal);

    const updated = await prisma.result.update({
      where: { id: Number(id) },
      data: {
        ca,
        exam,
        total: newTotal,
        grade,
        remark,
        ...(semester != null ? { semester } : {}),
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete result (admin only)
const deleteResult = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (String(role).toLowerCase() !== 'admin') {
    return res.status(403).json({ error: 'Only admin can delete results' });
  }

  try {
    await prisma.result.delete({
      where: { id: Number(id) },
    });

    res.json({ message: 'Result deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete result' });
  }
};

module.exports = {
  createResult,
  getAllResults,
  updateResult,
  deleteResult,
};
