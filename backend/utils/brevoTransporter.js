// utils/brevoTransporter.js
import dotenv from 'dotenv';
dotenv.config();

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

// Send a single email with retry logic
export const sendEmail = async (to, subject, htmlContent, textContent = '', fromName = 'FarmSetu', retries = 2) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // Validate API key
      if (!BREVO_API_KEY) {
        throw new Error('BREVO_API_KEY is not set in environment variables');
      }
      
      if (!process.env.EMAIL_USER) {
        throw new Error('EMAIL_USER is not set in environment variables');
      }
      
      // Format recipients
      const recipients = Array.isArray(to) ? to.map(email => ({ email })) : [{ email: to }];
      
      // Prepare email payload
      const emailPayload = {
        sender: {
          name: fromName,
          email: process.env.EMAIL_USER
        },
        to: recipients,
        subject: subject,
        htmlContent: htmlContent
      };
      
      // Add plain text version if provided
      if (textContent) {
        emailPayload.textContent = textContent;
      }
      
      console.log(`📧 Sending email to: ${Array.isArray(to) ? to.join(', ') : to}${attempt > 1 ? ` (Attempt ${attempt})` : ''}`);
      
      // Send request to Brevo API
      const response = await fetch(BREVO_API_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': BREVO_API_KEY
        },
        body: JSON.stringify(emailPayload)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log(`✅ Email sent successfully! Message ID: ${data.messageId}`);
        return { 
          success: true, 
          messageId: data.messageId,
          message: 'Email sent successfully'
        };
      } else {
        // Don't retry on certain errors
        if (data.code === 'unauthorized' || data.code === 'invalid_parameter') {
          console.error('❌ Brevo API Error (non-retryable):', data);
          return { 
            success: false, 
            error: data.message || 'Failed to send email',
            details: data
          };
        }
        
        // Retry on server errors or rate limits
        if (attempt < retries && (response.status === 429 || response.status >= 500)) {
          console.log(`⚠️ Retry attempt ${attempt}/${retries} after error...`);
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
          continue;
        }
        
        console.error('❌ Brevo API Error:', data);
        return { 
          success: false, 
          error: data.message || 'Failed to send email',
          details: data
        };
      }
    } catch (error) {
      console.error(`❌ Error sending email (Attempt ${attempt}/${retries}):`, error.message);
      
      if (attempt === retries) {
        return { 
          success: false, 
          error: error.message 
        };
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
  
  return { success: false, error: 'Max retries exceeded' };
};

// Send bulk emails with batching and progress tracking
export const sendBulkEmails = async (recipients, subject, htmlContent, textContent = '', batchSize = 50, delayMs = 1000, onProgress = null) => {
  const results = {
    total: recipients.length,
    successful: 0,
    failed: 0,
    errors: [],
    startTime: Date.now()
  };
  
  if (!recipients || recipients.length === 0) {
    console.log('No recipients provided');
    return results;
  }
  
  console.log(`📧 Starting bulk email to ${recipients.length} recipients`);
  console.log(`Batch size: ${batchSize}, Delay: ${delayMs}ms`);
  
  for (let i = 0; i < recipients.length; i += batchSize) {
    const batch = recipients.slice(i, i + batchSize);
    const batchNumber = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(recipients.length / batchSize);
    
    console.log(`\n📦 Processing batch ${batchNumber}/${totalBatches} (${batch.length} emails)...`);
    
    // Process batch sequentially to avoid rate limits
    for (const email of batch) {
      const result = await sendEmail(email, subject, htmlContent, textContent);
      
      if (result.success) {
        results.successful++;
        console.log(`  ✅ ${email} - Sent successfully`);
      } else {
        results.failed++;
        results.errors.push({ email, error: result.error });
        console.log(`  ❌ ${email} - Failed: ${result.error}`);
      }
      
      // Call progress callback if provided
      if (onProgress) {
        onProgress({
          completed: results.successful + results.failed,
          total: results.total,
          successful: results.successful,
          failed: results.failed
        });
      }
      
      // Small delay between individual emails in the same batch
      if (batch.indexOf(email) < batch.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
    
    const batchSuccess = results.successful - (results.successful - batch.length);
    console.log(`✅ Batch ${batchNumber}/${totalBatches} completed. Success: ${batchSuccess}/${batch.length}`);
    
    // Delay between batches
    if (i + batchSize < recipients.length) {
      console.log(`⏳ Waiting ${delayMs}ms before next batch...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  
  const duration = ((Date.now() - results.startTime) / 1000).toFixed(2);
  console.log(`\n📊 BULK EMAIL SUMMARY (${duration}s):`);
  console.log(`   Total: ${results.total}`);
  console.log(`   Successful: ${results.successful}`);
  console.log(`   Failed: ${results.failed}`);
  console.log(`   Success Rate: ${((results.successful / results.total) * 100).toFixed(1)}%`);
  
  if (results.errors.length > 0) {
    console.log(`   Errors: ${results.errors.length}`);
  }
  
  return results;
};

// Test function to verify configuration
export const testEmailConfig = async () => {
  console.log('🔍 Testing Brevo Email Configuration...');
  console.log(`API Key present: ${BREVO_API_KEY ? '✅ Yes' : '❌ No'}`);
  console.log(`API Key prefix: ${BREVO_API_KEY ? BREVO_API_KEY.substring(0, 10) + '...' : 'None'}`);
  console.log(`EMAIL_USER present: ${process.env.EMAIL_USER ? '✅ Yes' : '❌ No'}`);
  console.log(`EMAIL_USER value: ${process.env.EMAIL_USER}`);
  
  if (!BREVO_API_KEY || !process.env.EMAIL_USER) {
    console.log('❌ Configuration incomplete. Please set BREVO_API_KEY and EMAIL_USER in .env');
    return false;
  }
  
  console.log('✅ Configuration looks good!');
  return true;
};