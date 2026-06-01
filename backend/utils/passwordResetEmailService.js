// utils/passwordResetEmailService.js
import dotenv from 'dotenv';
import { sendEmail } from './brevoTransporter.js';

dotenv.config();

export const sendPasswordResetEmail = async (email, name, resetToken) => {
  try {
    console.log(`📧 Attempting to send password reset email to: ${email}`);
    
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
                      <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Reset Your Password</a>
                  </div>
                  
                  <div class="warning">
                      <strong>⚠️ This link will expire in 1 hour</strong>
                  </div>
                  
                  <p>If you didn't request this, please ignore this email.</p>
                  <p>For security reasons, never share this link with anyone.</p>
                  
                  <p>Best regards,<br><strong>FarmSetu Team</strong></p>
              </div>
              <div class="footer">
                  <p>© ${new Date().getFullYear()} FarmSetu. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `;

    const result = await sendEmail(
      email,
      '🔐 Reset Your FarmSetu Password',
      htmlContent,
      `Reset your password by visiting: ${resetUrl}\n\nThis link expires in 1 hour.`,
      'FarmSetu Security'
    );

    if (result.success) {
      console.log(`✅ Password reset email sent successfully to ${email}`);
      return true;
    } else {
      console.error(`❌ Failed to send password reset to ${email}:`, result.error);
      return false;
    }

  } catch (error) {
    console.error('❌ Error in sendPasswordResetEmail:', error);
    throw error;
  }
};

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
                  <p>Best regards,<br><strong>FarmSetu Security Team</strong></p>
              </div>
              <div class="footer">
                  <p>© ${new Date().getFullYear()} FarmSetu. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `;

    const result = await sendEmail(
      email,
      '✅ Your FarmSetu Password Has Been Changed',
      htmlContent,
      'Your password has been successfully changed.',
      'FarmSetu Security'
    );

    return result.success;

  } catch (error) {
    console.error('❌ Error sending success email:', error);
    return false;
  }
};