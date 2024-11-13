import express from 'express'; 
// const Contact = require('../models/Contact.model.js');
import Post from '../models/UserCommunity.model.js';
// const contactController = require('../controllers/contact.controller.js');
const router = express.Router();

// Contact form submission route
router.post('/',async (req, res) => {
    try {
        const { name, email, message , title } = req.body;

        if (!name || !email || !message || !title) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newPost = new Post({ name, email, message ,title });
        await newPost.save();
        
        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        console.error('Error in Post Creation at backend :', error);
        res.status(500).json({ error: 'Error in creating post' }); 
    }
});

export default router;
