import express from 'express';
import { addIncome, deleteIncome, downloadExcelIncome, getAllIncome } from '../controllers/incomeController.js';
import { protect } from '../middleware/middleware.js';

const router = express.Router();

router.post('/add', protect, addIncome);
router.get('/get', protect, getAllIncome);
router.delete('/delete/:id', protect, deleteIncome);
router.get('/download-excel', protect, downloadExcelIncome);

export default router;