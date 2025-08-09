const express = require('express');
const router = express.Router();

// For now, we'll hardcode some sample users
const users = [
  { username: 'admin', password: '123456', role: 'admin' },
  { username: 'staff', password: 'staff123', role: 'staff' },
  { username: 'hod', password: 'hod123', role: 'hod' },
  { username: 'exam', password: 'exam123', role: 'exam_officer' }
];

// Updated login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Find the user in our "database"
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // In a real app, you’d generate a JWT or set a session here
  return res.status(200).json({
    message: 'Login successful',
    username: user.username,
    role: user.role
  });
});

module.exports = router;
