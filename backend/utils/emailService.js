import path from 'path'
import ejs  from 'ejs'
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
// 1. Create the transporter using your SMTP credentials
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // false for port 587, true for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 15000,
  socketTimeout: 15000,
});

// 2. Reusable function to send emails
export const sendVerificationEmail = async (userEmail, userName, verificationToken) => {
  try {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}&email=${userEmail}`;
    const __dirname = path.resolve();
    // 3. Render your custom EJS template
    const templatePath = path.join(__dirname, '../backend/views/emails/verification.ejs');
    const htmlContent = await ejs.renderFile(templatePath, {
      name: userName,
      url: verificationUrl
    });

    // 4. Send the email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Please verify Account for FarmSetu',
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
