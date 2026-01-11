import express from 'express';
import { getSettings, updateSettings } from '../controllers/siteSettingController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getSettings);
router.put('/', protect, updateSettings);

export default router;
