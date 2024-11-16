import express from 'express';
import { getNGOs, getNGOById } from '../controllers/ngoController.js';

const router = express.Router();

router.get('/', getNGOs);
router.get('/:id', getNGOById);

export default router;