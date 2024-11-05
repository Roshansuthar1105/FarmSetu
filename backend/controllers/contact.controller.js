const Contact = require('../models/Contact.model.js');
const createContact = async (req, res) => {
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
        // The error occurs because Contact model is not properly imported
        // Change require to import since we're using ES modules
        // And update the import statement at the top of the file to:
        // import Contact from '../models/Contact.model.js';
        res.status(500).json({ error: 'Error sending message' });
    }
};
exports.createContact = createContact;