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
// Get all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error in fetching posts:', error);
        res.status(500).json({ error: 'Error in fetching posts' });
    }
});
router.delete('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        console.log("post ",post,"id is ",req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        await Post.deleteOne({_id : req.params.id});
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error in deleting post:', error);
        res.status(500).json({ error: 'Error in deleting post' });
    }
});


export default router;
