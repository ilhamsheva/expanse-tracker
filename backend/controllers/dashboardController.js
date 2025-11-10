import { Types } from "mongoose";
import Income from "../models/Income.js";
import Expense from "../models/Expense.js";

export const getDashboardData = async (req, res) => {
  const userId = req.user._id;
  const objectedUserId = new Types.ObjectId(String(userId));

  try {
    // Total Income 30 days
    const totalIncome = await Income.aggregate([
      {
        $match: {
          userId: objectedUserId,
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = await Expense.aggregate([
      {
        $match: {
          userId: objectedUserId,
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Get income 30 last days
    const last30DaysIncomeTransaction = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // Get total income 30 last days
    const totalIncome30Days = last30DaysIncomeTransaction.reduce(
      (sum, total) => {
        return sum + total.amount;
      },
      0
    );

    // Get expense 30 last days
    const last30DaysExpenseTransaction = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // Get total expense 30 last days
    const totalExpense30Days = last30DaysExpenseTransaction.reduce(
      (sum, total) => {
        return sum + total.amount;
      },
      0
    );

    // Fetch 7 last data income and expanse
    const lastTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(7)).map(
        (item) => ({
          ...item.toObject(),
          type: "income",
        })
      ),

      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(7)).map(
        (item) => ({
          ...item.toObject(),
          type: "expense",
        })
      ),
    ]
      .sort((a, b) => b.date - a.date)
      .slice(0, 7);

    // Final Response
    res.status(200).json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      lastIncome30Days: {
        transaction: last30DaysIncomeTransaction,
        total: totalIncome30Days,
      },
      lastExpense30Days: {
        transaction: last30DaysExpenseTransaction,
        total: totalExpense30Days,
      },
      lastTransactions7Days: lastTransactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
