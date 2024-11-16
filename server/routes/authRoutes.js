import express from 'express';
import { register, registerNGO, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/register-ngo', registerNGO);
router.post('/login', login);
router.post('/login-NGO', login);


export default router;