// routes/adminNewsletter.routes.js
import express from 'express';
import { protect, admin } from '../middleware/auth.middleware.js';
import {
    getAllSubscribers,
    getNewsletterStats,
    sendBulkEmail,
    sendTestEmail,
    deleteSubscriber,
    exportSubscribersCSV
} from '../controllers/adminNewsletter.controller.js';

const router = express.Router();

// All routes require admin authentication
// router.use(protect, admin);

router.get('/subscribers', getAllSubscribers);
router.get('/stats', getNewsletterStats);
router.post('/send-bulk', sendBulkEmail);
router.post('/send-test', sendTestEmail);
router.delete('/subscriber/:id', deleteSubscriber);
router.get('/export-csv', exportSubscribersCSV);

export default router;