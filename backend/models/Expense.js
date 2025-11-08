import mongoose from "mongoose";

const ExpenseSchema = mongoose.Schema({
   userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", require: true},
   icon: {type: String},
   category: {type: String, require: true},
   amount: {type: Number, require: true},
   date: {type: Date, default: Date.now} 
}, {timestamp: true});

export default mongoose.model("Expense", ExpenseSchema);