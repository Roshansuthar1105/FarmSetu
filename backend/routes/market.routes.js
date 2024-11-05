import express from 'express';
const router= express.Router();
import { getMarketData } from '../controllers/market.controller.js';
router.post('/',getMarketData );
export default router;