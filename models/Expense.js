const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    amount: {
      type: Number,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
