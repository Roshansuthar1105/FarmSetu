// controllers/newsletter.controller.js
import Newsletter from '../models/Newsletter.model.js';
import { sendSubscriptionConfirmation } from '../utils/newsletterEmailService.js';
import validator from 'validator';
// Subscribe to newsletter
export const subscribe = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        // Check if email already exists
        const existingSubscriber = await Newsletter.findOne({ email: email.toLowerCase() });

        if (existingSubscriber) {
            if (!existingSubscriber.isActive) {
                // Reactivate if inactive
                existingSubscriber.isActive = true;
                await existingSubscriber.save();
                await sendSubscriptionConfirmation(email);
                return res.status(200).json({ 
                    message: 'Welcome back! You have been resubscribed to our newsletter.' 
                });
            }
            return res.status(200).json({ message: 'Email already subscribed to newsletter' });
        }

        // Create new subscriber
        const newSubscriber = new Newsletter({
            email: email.toLowerCase()
        });

        await newSubscriber.save();

        // Send confirmation email
        await sendSubscriptionConfirmation(email);

        res.status(201).json({ 
            message: 'Successfully subscribed to monthly newsletter! Check your email for confirmation.' 
        });

    } catch (error) {
        console.error('Newsletter subscription error:', error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email already subscribed' });
        }
        res.status(500).json({ error: 'Failed to subscribe. Please try again later.' });
    }
};

// Unsubscribe from newsletter
export const unsubscribe = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        const subscriber = await Newsletter.findOne({ email: email.toLowerCase() });

        if (!subscriber) {
            return res.status(404).json({ error: 'Email not found in our newsletter list' });
        }

        subscriber.isActive = false;
        await subscriber.save();

        res.status(200).json({ 
            message: 'Successfully unsubscribed from newsletter. We will miss you!' 
        });

    } catch (error) {
        console.error('Unsubscribe error:', error);
        res.status(500).json({ error: 'Failed to unsubscribe. Please try again.' });
    }
};

// ==================== ADMIN ROUTES ====================

// Get all subscribers (admin only)
export const getAllSubscribers = async (req, res) => {
    try {
        const { isActive, page = 1, limit = 50 } = req.query;
        
        let filter = {};
        if (isActive !== undefined) {
            filter.isActive = isActive === 'true';
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

// Get subscriber statistics (admin only)
export const getSubscriberStats = async (req, res) => {
    try {
        const totalSubscribers = await Newsletter.countDocuments();
        const activeSubscribers = await Newsletter.countDocuments({ isActive: true });
        const inactiveSubscribers = await Newsletter.countDocuments({ isActive: false });
        
        // Get last 7 days subscriptions
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        const newThisWeek = await Newsletter.countDocuments({
            subscribedAt: { $gte: lastWeek }
        });
        
        res.json({
            success: true,
            stats: {
                total: totalSubscribers,
                active: activeSubscribers,
                inactive: inactiveSubscribers,
                newThisWeek
            }
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
};

// Export subscribers as CSV (admin only)
export const exportSubscribers = async (req, res) => {
    try {
        const subscribers = await Newsletter.find({ isActive: true })
            .sort({ subscribedAt: -1 });
        
        // Create CSV content
        let csvContent = 'Email,Subscribed Date,Status\n';
        subscribers.forEach(sub => {
            csvContent += `${sub.email},${sub.subscribedAt.toISOString()},${sub.isActive ? 'Active' : 'Inactive'}\n`;
        });
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=newsletter_subscribers_${Date.now()}.csv`);
        res.send(csvContent);
        
    } catch (error) {
        console.error('Export error:', error);
        res.status(500).json({ error: 'Failed to export subscribers' });
    }
};

// Delete subscriber (admin only)
export const deleteSubscriber = async (req, res) => {
    try {
        const { id } = req.params;
        
        const subscriber = await Newsletter.findByIdAndDelete(id);
        
        if (!subscriber) {
            return res.status(404).json({ error: 'Subscriber not found' });
        }
        
        res.json({ message: 'Subscriber deleted successfully' });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: 'Failed to delete subscriber' });
    }
};