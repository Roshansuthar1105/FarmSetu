import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import connectToMongoDb from './db/connectMongo.js';
import newsRoutes from './routes/news.routes.js';
import marketRoutes from './routes/market.routes.js';
import contactRoutes from './routes/contact.routes.js';
import allusers from './routes/allusers.routes.js';
import chats from './routes/chats.routes.js';
import productRoutes from './routes/products.routes.js';
import userCartRoute from './routes/userCartRoute.routes.js';
import communityRoute from './routes/communityRoute.routes.js';

import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();
const app= express();
// const __dirname = path.resolve();
// Enable CORS for all routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const PORT= process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes );
app.use('/api/marketdata', marketRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/users',allusers)
app.use('/api/chats',chats)
app.use('/api/products',productRoutes)
app.use('/api/profile/cart',userCartRoute);
app.use('/api/community',communityRoute);
// app.use(express.static(path.join(__dirname, '/frontend/dist')));
// app.get('*', (req, res)=>{
//     res.sendFile(path.join(__dirname, '/frontend/dist/index.html'));
// });
app.listen(PORT, ()=>{
    connectToMongoDb();
    console.log(`Server is running on port ${PORT}`);
});