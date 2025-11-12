import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { cookieName, newError } from '../lib/utils/utils.js';

export const protectRoute = async (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  try {
    const token = req.cookies[cookieName];
    if (!token) {
      throw newError('Unauthorized - No Tokken Found', 401);
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      throw newError('Invalid Tokken Found', 401);
    }

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      throw newError('User not found', 401);
    }

    req.user = user;
    next();
  } catch (err) {
    console.log('ProtectRoute auth.middleware error: ', err.message);
    next(err);
  }
};
