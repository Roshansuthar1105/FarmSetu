// controllers/adminNewsletter.controller.js
import Newsletter from '../models/Newsletter.model.js';
import { sendBulkNewsletterEmail } from '../utils/bulkEmailService.js';

// Get all subscribers with pagination and filters
export const getAllSubscribers = async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 20, 
            status = 'all',
            search = '' 
        } = req.query;
        
        let filter = {};
        
        if (status !== 'all') {
            filter.isActive = status === 'active';
        }
        
        if (search) {
            filter.email = { $regex: search, $options: 'i' };
        }
        
        const subscribers = await Newsletter.find(filter)
            .sort({ subscribedAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
        
        const total = await Newsletter.countDocuments(filter);
        
        res.json({
            success: true,
            subscribers,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error('Get subscribers error:', error);
        res.status(500).json({ error: 'Failed to fetch subscribers' });
    }
};

// Get subscriber statistics
export const getNewsletterStats = async (req, res) => {
    try {
        const total = await Newsletter.countDocuments();
        const active = await Newsletter.countDocuments({ isActive: true });
        const inactive = await Newsletter.countDocuments({ isActive: false });
        
        // Last 7 days growth
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        const newThisWeek = await Newsletter.countDocuments({
            subscribedAt: { $gte: lastWeek }
        });
        
        // Last 30 days growth
        const lastMonth = new Date();
        lastMonth.setDate(lastMonth.getDate() - 30);
        const newThisMonth = await Newsletter.countDocuments({
            subscribedAt: { $gte: lastMonth }
        });
        
        res.json({
            success: true,
            stats: {
                total,
                active,
                inactive,
                newThisWeek,
                newThisMonth
            }
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
};

// Send bulk email to subscribers
export const sendBulkEmail = async (req, res) => {
    try {
        const { 
            subject, 
            content, 
            contentType = 'html',
            sendTo = 'all', // 'all', 'active', 'specific'
            specificEmails = [],
            scheduleDate = null
        } = req.body;
        
        if (!subject || !content) {
            return res.status(400).json({ error: 'Subject and content are required' });
        }
        
        // Determine recipients
        let recipients = [];
        
        if (sendTo === 'specific' && specificEmails.length > 0) {
            recipients = specificEmails;
        } else {
            const filter = sendTo === 'active' ? { isActive: true } : {};
            const subscribers = await Newsletter.find(filter);
            recipients = subscribers.map(s => s.email);
        }
        
        if (recipients.length === 0) {
            return res.status(400).json({ error: 'No recipients found' });
        }
        
        // If schedule date is provided, save to scheduled queue
        if (scheduleDate) {
            // Save to scheduled emails collection (create this model)
            const scheduledEmail = new ScheduledEmail({
                subject,
                content,
                contentType,
                recipients,
                scheduledFor: new Date(scheduleDate),
                status: 'scheduled'
            });
            await scheduledEmail.save();
            
            return res.json({
                success: true,
                message: `Email scheduled for ${new Date(scheduleDate).toLocaleString()} to ${recipients.length} recipients`
            });
        }
        
        // Send immediately
        // Process in batches to avoid timeout
        const batchSize = 50;
        const batches = [];
        
        for (let i = 0; i < recipients.length; i += batchSize) {
            batches.push(recipients.slice(i, i + batchSize));
        }
        
        // Start async sending (don't wait for completion)
        sendBulkNewsletterEmail(recipients, subject, content, contentType);
        
        res.json({
            success: true,
            message: `Email sending started for ${recipients.length} recipients. You will receive a report shortly.`
        });
        
    } catch (error) {
        console.error('Send bulk email error:', error);
        res.status(500).json({ error: 'Failed to send emails' });
    }
};

// Send test email
export const sendTestEmail = async (req, res) => {
    try {
        const { testEmail, subject, content, contentType = 'html' } = req.body;
        
        if (!testEmail || !subject || !content) {
            return res.status(400).json({ error: 'Test email, subject, and content are required' });
        }
        
        await sendBulkNewsletterEmail([testEmail], subject, content, contentType);
        
        res.json({
            success: true,
            message: `Test email sent to ${testEmail}`
        });
        
    } catch (error) {
        console.error('Send test email error:', error);
        res.status(500).json({ error: 'Failed to send test email' });
    }
};

// Get email sending history
export const getEmailHistory = async (req, res) => {
    try {
        // You'll need to create an EmailLog model
        const history = await EmailLog.find()
            .sort({ sentAt: -1 })
            .limit(50);
        
        res.json({
            success: true,
            history
        });
    } catch (error) {
        console.error('Get email history error:', error);
        res.status(500).json({ error: 'Failed to fetch email history' });
    }
};

// Delete subscriber
export const deleteSubscriber = async (req, res) => {
    try {
        const { id } = req.params;
        
        const subscriber = await Newsletter.findByIdAndDelete(id);
        
        if (!subscriber) {
            return res.status(404).json({ error: 'Subscriber not found' });
        }
        
        res.json({
            success: true,
            message: 'Subscriber deleted successfully'
        });
    } catch (error) {
        console.error('Delete subscriber error:', error);
        res.status(500).json({ error: 'Failed to delete subscriber' });
    }
};

// Export subscribers as CSV
export const exportSubscribersCSV = async (req, res) => {
    try {
        const subscribers = await Newsletter.find({ isActive: true })
            .sort({ subscribedAt: -1 });
        
        let csvContent = 'Email,Subscribed Date,Status\n';
        subscribers.forEach(sub => {
            csvContent += `"${sub.email}",${sub.subscribedAt.toISOString()},${sub.isActive ? 'Active' : 'Inactive'}\n`;
        });
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=newsletter_subscribers_${Date.now()}.csv`);
        res.send(csvContent);
        
    } catch (error) {
        console.error('Export error:', error);
        res.status(500).json({ error: 'Failed to export subscribers' });
    }
};