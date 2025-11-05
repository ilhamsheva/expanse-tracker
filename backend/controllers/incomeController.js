import Income from '../models/Income.js';
import xlsx from 'xlsx';

export const addIncome = async (req, res) => {
    const userId = req.user._id;

    try {
        const {icon, source, amount, date} = req.body;

        if (!icon?.trim() || !source?.trim() || !amount || !date) {
            return res.status(400).json({message: 'All fields are required'});
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);

    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
}

export const getAllIncome = async (req, res) => {
    const userId = req.user._id;

    try {
        const income = await Income.find({userId}).sort({date: -1});
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
}

export const deleteIncome = async (req, res) => {
    const userId = req.user._id;

    try {
       await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Income deleted successfully'});
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
}

export const downloadExcelIncome = async (req, res) => {
    const userId = req.user._id;

    try {
        const income = await Income.find({ userId }).sort({date: -1 });

        // Prepare data for Excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book.append.sheet(wb, ws, 'Income');
        xlsx.writeFile(wb, 'income.xlsx');
        res.download('income.xlsx');
    } catch (error) {
        res.status(500).json({message: 'Something went wrong. Server error'});
    }
};