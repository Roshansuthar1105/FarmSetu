// routes/passwordReset.routes.js
import express from 'express';
import {
    forgotPassword,
    verifyResetToken,
    resetPassword
} from '../controllers/passwordReset.controller.js';

const router = express.Router();

// Public routes (no authentication required)
router.post('/forgot-password', forgotPassword);
router.get('/verify-token/:token', verifyResetToken);
router.post('/reset-password', resetPassword);

export default router;