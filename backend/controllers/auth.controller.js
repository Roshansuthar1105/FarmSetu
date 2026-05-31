import User from "../models/user.model.js";
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import {sendVerificationEmail} from "../utils/emailService.js"
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: 'Invalid Password or email' });
        }
        
        const token = generateTokenAndSetCookie(user._id,'30d', res);
        
        // --- FIX: Include 'farms' in the response object ---
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            mobileNumber: user.mobileNumber,
            address: user.address,
            farms: user.farms, // <--- ADD THIS LINE
            token: token
        });

    } catch (err) {
        console.log('Error in login controller', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export const signup= async(req, res)=>{
    try{
        const { name, email, password, role, confirmPassword,avatar,mobileNumber, address} = req.body;
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
            role,
            avatar,
            mobileNumber,
            address,
            isVerified:false
        });
        if(newUser){
            await newUser.save();
            const verificationToken = jwt.sign(
                { userId: newUser._id },
                process.env.JWT_SECRET,
                { expiresIn: '15m' }
            );
            const token = generateTokenAndSetCookie(newUser._id,'30d', res);
            console.log("Token : ",verificationToken);
            await sendVerificationEmail(newUser.email, newUser.name, verificationToken);
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                avatar: newUser.avatar,
                address: newUser.address,
                token: token,
                message: 'Signup successful! Please check your email to verify your account.'
            });
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
// controllers/authController.js

export const resendVerificationEmail = async (req, res) => {
    try {
      const { email } = req.body;
        console.log("email: ",email,req.body,req);
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }
  
      if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      if (user.isVerified) {
        return res.status(400).json({ error: 'Email already verified' });
      }
  
      // Generate new verification token
      const verificationToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );
  
      // Send verification email
      await sendVerificationEmail(user.email, user.name, verificationToken);
  
      res.status(200).json({
        message: 'Verification email sent successfully! Please check your inbox.'
      });
  
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
export const sendEmail = async(req,res)=>{
    try{
        const verificationToken = jwt.sign(
            { userId: '6a1b54d8e587c206f792e766' },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );
        // const token = generateTokenAndSetCookie(newUser._id,'15m', res);
        console.log("Token : ",verificationToken);
        await sendVerificationEmail('roshansuthar2023@gmail.com','Roshan Suthar',verificationToken);
        res.status(201).json({
            message: 'Please check your email to verify your account.'
        });
    }catch(err){
        console.log('Error in sending email route', error);
        res.status(400).json({ error: 'Error in sending email'});
    }
}
export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.body; // Assuming the frontend sends this in a POST body
        
        if (!token) {
             return res.status(400).json({ error: 'Verification token is missing' });
        }

        // Verify the temporary JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user and update their status
        const user = await User.findByIdAndUpdate(
            decoded.userId, 
            { isVerified: true }, 
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Email verified successfully! You can now log in.' });
    } catch (error) {
        console.log('Error in verifyEmail route', error);
        res.status(400).json({ error: 'Invalid or expired verification token' });
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