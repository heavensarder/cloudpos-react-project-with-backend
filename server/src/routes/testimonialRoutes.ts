import express from 'express';
import { getTestimonials, addTestimonial, deleteTestimonial, updateTestimonial } from '../controllers/testimonialController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getTestimonials);
router.post('/', protect, addTestimonial);
router.put('/:id', protect, updateTestimonial);
router.delete('/:id', protect, deleteTestimonial);

export default router;
