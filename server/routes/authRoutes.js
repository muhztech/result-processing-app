// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Dummy login route to simulate login and send back role
router.post('/login', (req, res) => {
  const { name, role } = req.body;
  if (!name || !role) {
    return res.status(400).json({ error: 'Name and role are required' });
  }

  // You can store session info or send token here if needed
  return res.status(200).json({ message: 'Logged in', name, role });
});

module.exports = router;
