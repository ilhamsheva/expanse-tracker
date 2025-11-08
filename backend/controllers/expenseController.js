import Expense from "../models/Expense.js";
import xlsx from 'xlsx';

export const addExpense = async (req, res) => {
    const userId = req.user._id;

    try {
        const {icon, category, amount, date} = req.body;

        if (!icon || !category || !amount || !date) {
            return res.status(400).json({message: "All field are required"});
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date,
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
}

export const getAllExpense = async (req, res) => {
    const userId = req.user._id;

    try {
        const expense = await Expense.find({userId}).sort({date: -1});

        if (!expense) {
            return res.status(404).json({message: "Expense not found"});
        }
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({message: "Server error"});
   }
}

export const deleteExpense = async (req, res) => {
    const userId = req.user._id;

    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);

        if (!expense) {
            return res.status(404).json({message: "Expense not found"});
        }

        res.status(200).json({message: "Expense Deleted Successfully"});
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
}

export const downloadExcelExpense = async (req, res) => {
    const userId = req.user._id;

    try {
        const expenses = await Expense.find({userId}).sort({date: -1});

        // Prepare data for excel
        const data = expenses.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);

        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        
        // Set headers for file download
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=expense.xlsx');
        
        // Write file to response
        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
        res.send(buffer);
    } catch (error) {
        res.status(500).json({message: 'Something went wrong. Server error'});
    }
}