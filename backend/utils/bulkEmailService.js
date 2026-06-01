// utils/bulkEmailService.js
import dotenv from 'dotenv';
import { sendBulkEmails, sendEmail } from './brevoTransporter.js';
import EmailLog from '../models/EmailLog.model.js';

dotenv.config();

export const sendBulkNewsletterEmail = async (recipients, subject, content, contentType = 'html') => {
  try {
    const isHTML = contentType === 'html';
    
    // Prepare content for email
    const htmlContent = isHTML ? content : null;
    const textContent = !isHTML ? content : null;
    
    // Add unsubscribe link to content (replace {{EMAIL}} placeholder)
    const unsubscribeText = `<p style="font-size: 12px; color: #666; margin-top: 30px;">To unsubscribe, <a href="${process.env.FRONTEND_URL}/newsletter/unsubscribe?email={{EMAIL}}">click here</a></p>`;
    const finalHtmlContent = isHTML ? content + unsubscribeText : null;
    
    // Send bulk emails with progress tracking
    const results = await sendBulkEmails(
      recipients,
      subject,
      finalHtmlContent,
      textContent,
      50, // batch size
      1000, // 1 second delay between batches
      (progress) => {
        // Optional: Log progress every 10 emails
        if (progress.completed % 10 === 0) {
          console.log(`📊 Progress: ${progress.completed}/${progress.total} (${progress.successful} success, ${progress.failed} failed)`);
        }
      }
    );
    
    // Log ALL results to database (fixed from the simplified version)
    for (const email of recipients) {
      const emailIndex = recipients.indexOf(email);
      const error = results.errors.find(e => e.email === email);
      
      await EmailLog.create({
        recipient: email,
        subject,
        status: error ? 'failed' : 'sent',
        error: error ? error.error : null,
        sentAt: new Date()
      }).catch(err => console.error(`Failed to log email for ${email}:`, err.message));
    }
    
    console.log(`📊 Bulk email completed: ${results.successful}/${results.total} logged to database`);
    return results;
    
  } catch (error) {
    console.error('❌ Bulk email service error:', error);
    return {
      total: recipients.length,
      successful: 0,
      failed: recipients.length,
      errors: [{ error: error.message }]
    };
  }
};

// Send single newsletter email with unsubscribe link
export const sendSingleNewsletterEmail = async (email, subject, content, contentType = 'html') => {
  try {
    const isHTML = contentType === 'html';
    
    // Add unsubscribe link with actual email
    const unsubscribeLink = `${process.env.FRONTEND_URL}/newsletter/unsubscribe?email=${email}`;
    const unsubscribeText = `<p style="font-size: 12px; color: #666; margin-top: 30px;">To unsubscribe, <a href="${unsubscribeLink}">click here</a></p>`;
    
    const finalHtmlContent = isHTML ? content + unsubscribeText : null;
    
    const result = await sendEmail(
      email,
      subject,
      finalHtmlContent,
      !isHTML ? content : null,
      'FarmSetu Newsletter'
    );
    
    // Log to database
    await EmailLog.create({
      recipient: email,
      subject,
      status: result.success ? 'sent' : 'failed',
      error: result.success ? null : result.error,
      sentAt: new Date()
    });
    
    return result;
    
  } catch (error) {
    console.error('❌ Error sending single newsletter email:', error);
    return { success: false, error: error.message };
  }
};