const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.get('/token', async (req, res) => {
  const header = req.headers.authorization;
  if (!header) return res.status(200).json({ header: null, message: 'No Authorization header present' });
  const maskHeader = header.length > 24 ? `${header.slice(0, 12)}...${header.slice(-8)}` : header;
  const parts = header.split(' ');
  if (parts.length !== 2) return res.status(400).json({ header: maskHeader, message: 'Malformed Authorization header' });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    try {
      const user = await User.findById(payload.id).select('-passwordHash');
      return res.json({ header: maskHeader, payload, user: user ? { id: user._id, name: user.name, email: user.email, role: user.role } : null });
    } catch (dberr) {
      return res.json({ header: maskHeader, payload, user: null, dbError: (dberr && dberr.message) || 'DB error' });
    }
  } catch (err) {
    return res.status(401).json({ header: maskHeader, error: (err && err.message) || 'Invalid token' });
  }
});

module.exports = router;
