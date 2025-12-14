import express from 'express';
import { 
    getHeatmapData, 
    matchSchemeBeneficiaries, 
    getAllUsers, 
    adminUpdateUser 
} from '../controllers/admin.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

// User Management
router.get('/users', protect, admin, getAllUsers);       // See all users
router.patch('/user/:id', protect, admin, adminUpdateUser); // Edit any user

// Analytics & Schemes
router.get('/heatmap', protect, admin, getHeatmapData);
router.post('/schemes/match', protect, admin, matchSchemeBeneficiaries);

export default router;