import express from 'express';
import { upload, uploadFile } from '../controllers/uploadController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Protected route for image upload
router.post('/', protect, upload.any(), uploadFile);

export default router;
