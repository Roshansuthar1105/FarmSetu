import express from 'express';
import { getHeatmapData, matchSchemeBeneficiaries } from '../controllers/admin.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js'; // <--- Import both

const router = express.Router();

// Apply 'protect' AND 'admin' to ensure security
router.get('/heatmap', protect, admin, getHeatmapData);
router.post('/schemes/match', protect, admin, matchSchemeBeneficiaries);

export default router;