// utils/bulkEmailService.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import EmailLog from '../models/EmailLog.model.js';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    pool: true,
    maxConnections: 5,
    maxMessages: 100
});

export const sendBulkNewsletterEmail = async (recipients, subject, content, contentType = 'html') => {
    const results = {
        total: recipients.length,
        successful: 0,
        failed: 0,
        errors: []
    };
    
    // Process in batches to avoid rate limiting
    const batchSize = 50;
    
    for (let i = 0; i < recipients.length; i += batchSize) {
        const batch = recipients.slice(i, i + batchSize);
        
        await Promise.allSettled(
            batch.map(async (email) => {
                try {
                    const mailOptions = {
                        from: `"FarmSetu Newsletter" <${process.env.EMAIL_USER}>`,
                        to: email,
                        subject: subject,
                        [contentType === 'html' ? 'html' : 'text']: content,
                        headers: {
                            'List-Unsubscribe': `<${process.env.FRONTEND_URL}/newsletter/unsubscribe?email=${email}>`,
                        }
                    };
                    
                    await transporter.sendMail(mailOptions);
                    results.successful++;
                    
                    // Log successful email
                    await EmailLog.create({
                        recipient: email,
                        subject,
                        status: 'sent',
                        sentAt: new Date()
                    });
                    
                } catch (error) {
                    results.failed++;
                    results.errors.push({ email, error: error.message });
                    
                    // Log failed email
                    await EmailLog.create({
                        recipient: email,
                        subject,
                        status: 'failed',
                        error: error.message,
                        sentAt: new Date()
                    });
                    
                    console.error(`Failed to send to ${email}:`, error.message);
                }
            })
        );
        
        // Delay between batches to avoid rate limiting
        if (i + batchSize < recipients.length) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    
    console.log(`Bulk email completed: ${results.successful}/${results.total} sent successfully`);
    return results;
};