// utils/passwordResetEmailService.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Send password reset email
export const sendPasswordResetEmail = async (email, name, resetToken) => {
    try {
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #4CAF50; color: white; padding: 20px; text-align: center; }
                    .content { padding: 30px 20px; background: #f9f9f9; }
                    .button { display: inline-block; padding: 12px 24px; background: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #777; }
                    .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🔐 Password Reset Request</h1>
                    </div>
                    <div class="content">
                        <h2>Hello ${name || 'User'},</h2>
                        <p>We received a request to reset your password for your FarmSetu account.</p>
                        
                        <div style="text-align: center;">
                            <a href="${resetUrl}" class="button">Reset Your Password</a>
                        </div>
                        
                        <div class="warning">
                            <strong>⚠️ This link will expire in 1 hour</strong>
                        </div>
                        
                        <p>If you didn't request this, please ignore this email. Your password will remain unchanged.</p>
                        
                        <p>For security reasons, never share this link with anyone.</p>
                        
                        <hr style="margin: 20px 0;">
                        <p style="font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:</p>
                        <p style="font-size: 12px; color: #666; word-break: break-all;">${resetUrl}</p>
                        
                        <p>Best regards,<br><strong>FarmSetu Team</strong></p>
                    </div>
                    <div class="footer">
                        <p>© ${new Date().getFullYear()} FarmSetu. All rights reserved.</p>
                        <p>Empowering farmers with technology</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        await transporter.sendMail({
            from: `"FarmSetu Security" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '🔐 Reset Your FarmSetu Password',
            html: htmlContent
        });

        console.log(`Password reset email sent to ${email}`);
        return true;

    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw error;
    }
};

// Send password reset success email
export const sendPasswordResetSuccessEmail = async (email, name) => {
    try {
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #4CAF50; color: white; padding: 20px; text-align: center; }
                    .content { padding: 30px 20px; background: #f9f9f9; }
                    .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #777; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>✅ Password Changed Successfully</h1>
                    </div>
                    <div class="content">
                        <h2>Hello ${name || 'User'},</h2>
                        <p>Your FarmSetu account password has been successfully changed.</p>
                        
                        <p>If you made this change, you can safely ignore this email.</p>
                        
                        <div class="warning" style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
                            <strong>🔒 Did not make this change?</strong>
                            <p style="margin-top: 10px;">Please contact our support team immediately at support@farmsetu.com</p>
                        </div>
                        
                        <p>For security, we recommend enabling two-factor authentication on your account.</p>
                        
                        <p>Best regards,<br><strong>FarmSetu Security Team</strong></p>
                    </div>
                    <div class="footer">
                        <p>© ${new Date().getFullYear()} FarmSetu. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        await transporter.sendMail({
            from: `"FarmSetu Security" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '✅ Your FarmSetu Password Has Been Changed',
            html: htmlContent
        });

        console.log(`Password reset success email sent to ${email}`);
        return true;

    } catch (error) {
        console.error('Error sending success email:', error);
        return false;
    }
};