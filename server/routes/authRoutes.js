import express from 'express';
import { register, registerNGO, login, loginNGO } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/register-ngo', registerNGO);
router.post('/login', login);
router.post('/login-ngo', loginNGO);


export default router;