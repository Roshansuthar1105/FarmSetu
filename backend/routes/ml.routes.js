import express from 'express';
import { logPrediction, getUserHistory } from '../controllers/ml.controller.js';
import { protect } from '../middleware/auth.middleware.js'; // <--- Import this

const router = express.Router();

// Apply 'protect' so req.user is available
router.post('/log', protect, logPrediction);
router.get('/history', protect, getUserHistory);

export default router;