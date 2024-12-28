import express from 'express';
import path from 'path';
import fs from 'fs'
const router = express.Router();
const __dirname = path.resolve();
console.log(__dirname,"dirname");

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/staticfile/homepage.html'));
});

export default router;

