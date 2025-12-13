import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protect = async (req, res, next) => {
    let token;

    // 1. Check Authorization Header (Standard for Bearer tokens)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Get token after "Bearer"
        } catch (error) {
            console.error("Token extraction error:", error);
        }
    }
    // 2. Fallback: Check Cookies
    else if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // 3. Get User from Token
            req.user = await User.findById(decoded.userId).select('-password');
            
            if (!req.user) {
                return res.status(401).json({ error: 'Not authorized, user not found' });
            }

            next(); // Proceed to controller
        } catch (error) {
            console.error("Token verification failed:", error);
            // Check headersSent to avoid "Cannot set headers after they are sent" error
            if (!res.headersSent) {
                return res.status(401).json({ error: 'Not authorized, token failed' });
            }
        }
    } else {
        if (!res.headersSent) {
            return res.status(401).json({ error: 'Not authorized, no token' });
        }
    }
};

export const admin = (req, res, next) => {
    console.log(req.user,req.body);
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Not authorized as admin' });
    }
};