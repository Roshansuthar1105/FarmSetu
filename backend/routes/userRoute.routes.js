import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { 
    getUserProfile, 
    updateUserProfile, 
    getUserById,
    addFarm, 
    updateFarm, 
    deleteFarm 
} from '../controllers/user.controller.js';

const router = express.Router();

// --- Personal Profile (SECURE) ---
// Frontend should use these for the "My Account" page
router.get('/profile', protect, getUserProfile);       
router.patch('/profile', protect, updateUserProfile);  

// --- Farm Management (SECURE) ---
router.post('/add-farm', protect, addFarm);            
router.patch('/farm/:farmId', protect, updateFarm);    
router.delete('/farm/:farmId', protect, deleteFarm);   

// --- Public / Other Users (Restoring Old Functionality) ---
// Frontend uses this when clicking on a product to see the seller
// Note: Put this AT THE END so it doesn't confuse 'profile' with an 'id'
router.get('/:id', getUserById); 

export default router;