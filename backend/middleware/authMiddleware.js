import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Session from '../models/Session.js';

// Protect routes
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Verify session is active in DB
      const session = await Session.findOne({ jwtToken: token, isActive: true });
      if (!session) {
        return res.status(401).json({ message: 'Session expired or invalidated' });
      }

      // Update last active time
      session.lastActiveAt = Date.now();
      await session.save();

      // Get user from decoded token
      req.user = await User.findById(decoded.id).select('-password');
      req.token = token;

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Admin role check
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};
