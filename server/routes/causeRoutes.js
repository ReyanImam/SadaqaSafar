import express from 'express';
import { createCause, getNGOCauses } from '../controllers/causeController.js';
import { protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createCause);

router.get('/ngo/:ngoId', getNGOCauses);

export default router;