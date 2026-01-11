import express from 'express';
import { getLogos, addLogo, deleteLogo } from '../controllers/clientLogoController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getLogos);
router.post('/', protect, addLogo);
router.delete('/:id', protect, deleteLogo);

export default router;
