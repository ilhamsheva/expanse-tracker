import { registerUser, loginUser, getUserInfo, uploadImage } from '../controllers/authController.js';
import express from 'express';
import { protect } from '../middleware/middleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getUser', protect, getUserInfo);
// route for upload photo
router.post('/upload-image', upload.single('image'), uploadImage);

export default router;