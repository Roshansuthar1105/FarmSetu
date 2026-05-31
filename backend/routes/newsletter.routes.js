// routes/newsletter.routes.js
import express from 'express';
import { protect, admin } from '../middleware/auth.middleware.js';
import {
    subscribe,
    unsubscribe,
    getAllSubscribers,
    getSubscriberStats,
    exportSubscribers,
    deleteSubscriber
} from '../controllers/newsletter.controller.js';

const router = express.Router();

// Public routes
router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);

// Admin routes (protected)
router.get('/admin/subscribers', protect, admin, getAllSubscribers);
router.get('/admin/stats', protect, admin, getSubscriberStats);
router.get('/admin/export', protect, admin, exportSubscribers);
router.delete('/admin/subscriber/:id', protect, admin, deleteSubscriber);

export default router;