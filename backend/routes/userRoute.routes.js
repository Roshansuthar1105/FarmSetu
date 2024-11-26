import express from 'express'; 
import User from '../models/user.model.js';
// const contactController = require('../controllers/contact.controller.js');
const router = express.Router();

// Contact form submission route
// Get all products
router.get('/:id', async (req, res) => {
    try {
        const {id}=req.params;
        const user = await User.find({_id:id},{cart:0,createdAt:0,password:0});
        res.json(user);
    } catch (error) {
        console.error('Error in getUser:', error);
        res.status(500).json({ error: 'Error getting user details' }); 
    }
});
router.patch('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body, { new: true, select: '-cart -createdAt -password' });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error in getUser:', error);
        res.status(500).json({ error: 'Error getting user details' }); 
    }
})
// router.get('/:productId', async (req, res) => {
//     try {
//         const {productId} = req.params;
//         const product = await Product.findById(productId);
//         if (!product) {
//             return res.status(404).json({ error: 'Product not found' });
//         }
//         res.json(product);
//     } catch (error) {
//         console.error('Error in getProducts:', error);
//         res.status(500).json({ error: 'Error getting products' }); 
//     }
// });

// router.post('/addproduct', async (req, res) => {
//     try {
//         const { name, price, description, image, category ,seller } = req.body;
//         if (!name || !price || !description || !image || !category || !seller) {
//             return res.status(400).json({ error: 'All fields are required' });
//         }

//         const newProduct = new Product({ name, price, description, image, category ,seller });
//         await newProduct.save();
        
//         res.status(201).json({ message: 'Product added successfully' });
//     } catch (error) {
//         console.error('Error in addProduct:', error);
//         res.status(500).json({ error: 'Error adding product' }); 
//     }
// });



export default router;
