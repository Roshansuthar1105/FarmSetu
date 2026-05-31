// controllers/passwordReset.controller.js
import User from '../models/user.model.js';
import crypto from 'crypto';
import bcryptjs from 'bcryptjs';
import { sendPasswordResetEmail, sendPasswordResetSuccessEmail } from '../utils/passwordResetEmailService.js';

// Step 1: Forgot Password - Send Reset Link
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        
        if (!user) {
            return res.status(404).json({ error: 'No account found with this email address' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        
        // Hash token and save to database (security)
        const hashedToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // Save token to user document with expiration (1 hour)
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send reset email
        await sendPasswordResetEmail(user.email, user.name, resetToken);

        res.status(200).json({
            success: true,
            message: 'Password reset link sent to your email address'
        });

    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ error: 'Failed to process request' });
    }
};

// Step 2: Verify Reset Token
export const verifyResetToken = async (req, res) => {
    try {
        const { token } = req.params;

        // Hash the token to compare with stored hash
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        // Find user with valid token
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ 
                error: 'Invalid or expired password reset token' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'Token is valid',
            email: user.email
        });

    } catch (error) {
        console.error('Verify token error:', error);
        res.status(500).json({ error: 'Failed to verify token' });
    }
};

// Step 3: Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { token, password, confirmPassword } = req.body;

        // Validate passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        // Hash the token to compare with stored hash
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        // Find user with valid token
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ 
                error: 'Invalid or expired password reset token' 
            });
        }

        // Hash new password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Update user password and clear reset fields
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        // Send success email
        await sendPasswordResetSuccessEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: 'Password has been reset successfully'
        });

    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ error: 'Failed to reset password' });
    }
};