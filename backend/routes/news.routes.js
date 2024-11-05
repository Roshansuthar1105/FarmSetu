import express from 'express';
const router= express.Router();
import { news } from '../controllers/news.controller.js';
router.post('/',news );
export default router;