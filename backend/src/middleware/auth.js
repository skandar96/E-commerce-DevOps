const jwt = require('jsonwebtoken');

const getJwtSecret = () => process.env.JWT_SECRET || process.env.jwtSecret;

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  const jwtSecret = getJwtSecret();

  if (!jwtSecret) {
    return res.status(500).json({ message: 'JWT secret is not configured' });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Middleware to check if user is authenticated user or admin
const requireAuthOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  // Allow if user is admin or if the user is accessing their own resource
  if (req.user.role === 'admin' || req.user.id === req.params.id) {
    return next();
  }

  res.status(403).json({ message: 'Access denied' });
};

module.exports = {
  authenticateToken,
  requireAdmin,
  requireAuthOrAdmin
};