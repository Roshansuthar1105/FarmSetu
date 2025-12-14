import express from 'express';
import { 
    getHeatmapData, 
    matchSchemeBeneficiaries, 
    getAllUsers, 
    adminUpdateUser,
    getMLActivityLog,
    getMLReportById
} from '../controllers/admin.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

// User Management
router.get('/users', protect, admin, getAllUsers);       // See all users
router.patch('/user/:id', protect, admin, adminUpdateUser); // Edit any user

// Analytics & Schemes
router.get('/heatmap', protect, admin, getHeatmapData);
router.post('/schemes/match', protect, admin, matchSchemeBeneficiaries);

// ML Reporting Routes (NEW)
router.get('/ml-reports', protect, admin, getMLActivityLog);
router.get('/ml-report/:id', protect, admin, getMLReportById);
export default router;