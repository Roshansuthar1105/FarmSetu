// server.js or your main server file
import express from 'express'
import mpngoose from 'mongoose'
import Chat from '../models/Chat.model.js' 
const router = express.Router();
// Endpoint to send a chat message
router.post('/', async (req, res) => {
    const { sender, receiver, message } = req.body;
    const chatMessage = new Chat({ sender, receiver, message });

    try {
        await chatMessage.save();
        res.status(201).json(chatMessage);
    } catch (error) {
        res.status(500).json({ error: 'Error saving chat message' });
    }
});

// Endpoint to fetch chats between two users
router.post('/:userId', async (req, res) => {
    const { userId } = req.params;
    const {currentUserId} = req.body;// Assuming you have user authentication
    try {
        const chats = await Chat.find({
            $or: [
                { sender: currentUserId, receiver: userId },
                { sender: userId, receiver: currentUserId }
            ]
        }).sort({ timestamp: 1 }); 
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching chats' });
        console.log("Error : ",error)
    }
});
export default router;