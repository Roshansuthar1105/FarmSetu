import express from 'express';
import User from '../models/user.model.js';
const router = express.Router();

router.get('/all',async (req,res)=>{
    try {
        const allusers = await User.find({}, '_id name role avatar');        
        // const allusers = await User.find({}, 'name email');        
        res.status(200).json(allusers);
    } catch (error) {
        console.log("Error From backend allusers route : ",error);
    }
})
export default router;