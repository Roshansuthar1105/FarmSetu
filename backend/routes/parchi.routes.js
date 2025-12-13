import express from 'express';
import { generateSchedule, getMyParchi, getLiveStatus } from '../controllers/parchi.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';
import { applyForWater, getMyRequests } from '../controllers/parchi.controller.js';
const router = express.Router();

// Admin creates the roster
router.post('/generate', protect, admin, generateSchedule);

// Farmer checks their specific turn
router.get('/my-turns', protect, getMyParchi);
router.post('/apply', protect, applyForWater);
// Public/Farmer checks who is irrigating right now
router.get('/live', protect, getLiveStatus);
router.get('/my-requests', protect, getMyRequests);
export default router;