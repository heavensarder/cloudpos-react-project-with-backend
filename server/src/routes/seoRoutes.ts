import express from 'express';
import { getSeoByPage, getAllSeo, updateSeo } from '../controllers/seoController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Public
router.get('/:page', getSeoByPage);

// Admin
router.get('/admin/all', protect, getAllSeo);
router.put('/admin/:id', protect, updateSeo);

export default router;
