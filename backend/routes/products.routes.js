import express from 'express'; 
// const Contact = require('../models/Contact.model.js');
import Contact from '../models/Contact.model.js';
import Product from '../models/Product.model.js';
// const contactController = require('../controllers/contact.controller.js');
const router = express.Router();

// Contact form submission route
// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error in getProducts:', error);
        res.status(500).json({ error: 'Error getting products' }); 
    }
});
router.get('/:seller', async (req, res) => {
    try {
        const {seller}=req.params;
        const products = await Product.find({ "seller":seller });
        res.json(products);
    } catch (error) {
        console.error('Error in getProducts:', error);
        res.status(500).json({ error: 'Error getting products' }); 
    }
});
router.get('/:productId', async (req, res) => {
    try {
        const {productId} = req.params;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error in getProducts:', error);
        res.status(500).json({ error: 'Error getting products' }); 
    }
});

router.post('/addproduct', async (req, res) => {
    try {
        const { name, price, description, image, category ,seller } = req.body;
        if (!name || !price || !description || !image || !category || !seller) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newProduct = new Product({ name, price, description, image, category ,seller });
        await newProduct.save();
        
        res.status(201).json({ message: 'Product added successfully',id:newProduct._id });
    } catch (error) {
        console.error('Error in addProduct:', error);
        res.status(500).json({ error: 'Error adding product' }); 
    }
});
router.delete('/delete/:productId', async (req, res) => {
    try {
        const {productId} = req.params;
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error in deleteProduct:', error);
        res.status(500).json({ error: 'Error deleting product' });
    }
});
router.patch('/update/:productId', async (req, res) => {
    try {
        const {productId} = req.params;
        const product = await Product.findByIdAndUpdate(productId, req.body, {new: true});
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({message:"Product updated !",product:product});
    } catch (error) {
        console.error('Error in updateProduct:', error);
        res.status(500).json({ error: 'Error updating product' });
    }
});

export default router;
