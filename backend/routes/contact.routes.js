import express from 'express'; 
// const Contact = require('../models/Contact.model.js');
import Contact from '../models/Contact.model.js';
// const contactController = require('../controllers/contact.controller.js');
const router = express.Router();

// Contact form submission route
router.post('/',async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newContact = new Contact({ name, email, message });
        await newContact.save();
        
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error in createContact:', error);
        res.status(500).json({ error: 'Error sending message' }); 
    }
});

export default router;
