import express from 'express';
import { getActiveSessions, logoutSession } from '../controllers/sessionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/active', protect, getActiveSessions);
router.delete('/:id', protect, logoutSession);

export default router;
