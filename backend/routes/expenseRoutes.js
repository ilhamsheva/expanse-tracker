import express from 'express';
import { protect } from '../middleware/middleware.js';
import { addExpense, deleteExpense, downloadExcelExpense, getAllExpense } from '../controllers/expenseController.js';

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.delete("/delete/:id", protect, deleteExpense);
router.get("/download-excel", protect, downloadExcelExpense);

export default router;