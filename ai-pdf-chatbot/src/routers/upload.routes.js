import express from 'express';
import { uploadPDF } from '../controllers/upload.controller.js';
import { upload } from '../services/upload.service.js';

const router = express.Router();

router.post('/upload', upload.single('pdf'), uploadPDF);

export default router;
