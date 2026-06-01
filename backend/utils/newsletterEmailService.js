// utils/newsletterEmailService.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

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

export const sendSubscriptionConfirmation = async (email) => {
    try {
        const mailOptions = {
            from: `"FarmSetu" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '✅ Successfully Subscribed to FarmSetu Monthly Newsletter',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: #4CAF50; color: white; padding: 20px; text-align: center; }
                        .content { padding: 20px; background: #f9f9f9; }
                        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #777; }
                        .button { display: inline-block; padding: 10px 20px; background: #4CAF50; color: white; text-decoration: none; border-radius: 5px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🌾 FarmSetu Newsletter</h1>
                        </div>
                        <div class="content">
                            <h2>Welcome to FarmSetu Community! 🎉</h2>
                            <p>Dear Farmer,</p>
                            <p>Thank you for subscribing to our <strong>Monthly Newsletter</strong>! You'll now receive:</p>
                            <ul>
                                <li>📊 Latest Market Prices Updates</li>
                                <li>🌱 Farming Tips & Best Practices</li>
                                <li>🏦 New Government Schemes for Farmers</li>
                                <li>🤖 AI/ML Insights for Better Crop Yield</li>
                                <li>💧 Water Management Techniques</li>
                            </ul>
                            <p>Stay tuned for our first newsletter coming your way soon!</p>
                            <p>Happy Farming! 🌟</p>
                            <p><strong>- Team FarmSetu</strong></p>
                        </div>
                        <div class="footer">
                            <p>© ${new Date().getFullYear()} FarmSetu. All rights reserved.</p>
                            <p>You're receiving this because you subscribed to our newsletter.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Confirmation email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        return false;
    }
};