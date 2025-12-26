const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    console.warn('Auth failed: no Authorization header');
    return res.status(401).json({ message: 'No token' });
  }
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    const user = await User.findById(payload.id).select('-passwordHash');
    if (!user) {
      console.warn('Auth failed: token valid but user not found.');
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.warn('Auth failed: token verify error.', err && err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
