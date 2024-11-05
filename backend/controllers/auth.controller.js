import User from "../models/user.model.js";
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const login= async(req, res)=>{
    try{
        const {email, password}= req.body;
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({error:'User not found'});
        }
        const isPasswordCorrect= await bcryptjs.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({error:'Invalid Password or email'});
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        });

    }
    catch(err){
        console.log('Error in login controller');
        res.status(500).json({error:'Internal Server Error'});
    }
}
export const signup= async(req, res)=>{
    try{
        const { name, email, password, role, confirmPassword} = req.body;
        if(password !=confirmPassword){
            return res.status(400).json({error:`Passwords don't match`});
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        const user= await User.findOne({email});
        if(user){
            return res.status(400).json({error:'Email already exists'});
        }
        const salt= await bcryptjs.genSalt(10);
        const hashedPassword= await bcryptjs.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            role
        });
        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
        res.status(201).json({_id:newUser._id, name:name, email:email, role:role});
        }
        else{
            res.status(400).json({error:'Invalid user data'});
        }
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:'Internal Server Error'});
    }
}
export const logout= async(req, res)=>{
    try{
        res.cookie('jwt', '', {maxAge:0});
        res.status(200).json({success:'Logout Succesful'});
    }
    catch(err){
        console.log('Error in logout route');
        res.status(500).json({error:'Internal Server Error'});
    }
}