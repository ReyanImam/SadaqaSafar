import express from 'express';
import { createCause, getCauses, getNGOCauses } from '../controllers/causeController.js';
import { protect, ngoOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, ngoOnly, createCause);
router.get('/', getCauses);
router.get('/ngo/:ngoId', getNGOCauses);

export default router;