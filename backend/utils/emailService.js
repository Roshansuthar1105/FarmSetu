// utils/emailService.js
import path from 'path';
import ejs from 'ejs';
import dotenv from 'dotenv';
import { sendEmail } from './brevoTransporter.js';

dotenv.config();

export const sendVerificationEmail = async (userEmail, userName, verificationToken) => {
  try {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}&email=${userEmail}`;
    const __dirname = path.resolve();
    
    // Render EJS template
    const templatePath = path.join(__dirname, '../backend/views/emails/verification.ejs');
    const htmlContent = await ejs.renderFile(templatePath, {
      name: userName,
      url: verificationUrl
    });

    // Send using Brevo
    const result = await sendEmail(
      userEmail,
      'Please verify your Account for FarmSetu',
      htmlContent,
      `Please verify your account by visiting: ${verificationUrl}`,
      'FarmSetu Verification'
    );

    if (result.success) {
      console.log('✅ Verification email sent successfully');
    } else {
      console.error('❌ Failed to send verification email:', result.error);
    }
    
    return result;
    
  } catch (error) {
    console.error('❌ Error sending verification email:', error);
    return { success: false, error: error.message };
  }
};