import express from 'express';
import { protect } from '../middleware/middleware.js';

const router = express.Router();

router.get("/getDashboard", protect, getDashboardData);

export default router;