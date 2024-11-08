import express from 'express';
import User from '../models/user.model.js';

const router = express.Router();

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
