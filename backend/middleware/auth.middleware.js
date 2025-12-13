import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// 1. Protect Route (For logged-in users like Farmers)
export const protect = async (req, res, next) => {
    let token;

    // Check for token in cookies
    token = req.cookies.jwt;

    if (token) {
        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token, exclude password
            req.user = await User.findById(decoded.userId).select('-password');

            next();
        } catch (error) {
            console.error("Token verification failed:", error);
            res.status(401).json({ error: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ error: 'Not authorized, no token' });
    }
};

// 2. Admin Route (For Government/Admin Dashboard)
export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Not authorized as admin' });
    }
};