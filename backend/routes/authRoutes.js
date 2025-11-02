import { registerUser, loginUser, getUserInfo } from '../controllers/authController.js';
import express from 'express';
import { protect } from '../middleware/middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getUser', protect, getUserInfo);

export default router;