import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protect = async (req, res, next) => {
    const token = req.body.token;
    // console.log("object pre...........................")
        // 1. Read token safely
    // if (req.cookies && req.cookies.jwt) {
    //     token = req.cookies.jwt;
    // }
    // console.log(req.body.token);
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // 2. Fetch user and CHECK if it exists
            req.user = await User.findById(decoded.userId).select('-password');
            
            
            if (!req.user) {
                // IMPORTANT: Use return to stop execution
                return res.status(401).json({ error: 'Not authorized, user not found' });
            }

            // 3. Proceed to controller
            next();
            
        } catch (error) {
            console.error("Token verification failed:", error);
            // IMPORTANT: Check if headers are already sent to prevent crash
            if (!res.headersSent) {
                return res.status(401).json({ error: 'Not authorized, token failed' });
            }
        }
    } else {
        return res.status(401).json({ error: 'Not authorized, no token' });
    }
};

// ... keep admin middleware as is ...
export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Not authorized as admin' });
    }
};