import express from 'express';
import { 
    generateSchedule, getMyParchi, getLiveStatus, 
    applyForWater, getMyRequests, 
    createWaterSource, getAllSources, getAllPendingRequests, updateRequestStatus 
} from '../controllers/parchi.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

// --- Admin Routes ---
// Generates the weekly roster based on logic
router.post('/generate', protect, admin, generateSchedule); //
// Allows admin to add new water resources (Tube Wells/Canals)
router.post('/source', protect, admin, createWaterSource); //
// View all pending farmer requests
router.get('/admin/requests', protect, admin, getAllPendingRequests); //
// Approve or Reject a specific request
router.put('/admin/request-status', protect, admin, updateRequestStatus); //

// --- Public/Farmer Routes ---
// Get list of water sources to populate the dropdown
router.get('/sources', protect, getAllSources); //
// Check upcoming assigned slots
router.get('/my-turns', protect, getMyParchi); //
// Submit a new application for water
router.post('/apply', protect, applyForWater); //
// Check who is currently irrigating
router.get('/live', protect, getLiveStatus); //
// View status of submitted requests (Approved/Pending/Rejected)
router.get('/my-requests', protect, getMyRequests); //

export default router;