const Expense = require('../models/Expense');
const expense = require('../models/Expense');
const addExpense = async (req, res) => {
  try {
    //extract amount , category, description, date, from req
    const { amount, category, description, date } = req.body;

    //return error for ammount <=0
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      console.log('Amount must be a valid number.');
      return res
        .status(400)
        .json({ message: 'Amount must be a valid number.' });
    }

    //date validation
    const parsedDate = new Date(date);
    if (!date || isNaN(parsedDate.getTime())) {
      console.log('Invalid or missing date.');
      return res.status(400).json({
        message: 'Invalid or missing date.',
      });
    }

    //add expense to db
    const newExpense = await expense.create({
      amount,
      category,
      description,
      date,
      user: req.user._id,
    });

    return res.status(201).json({
      message: 'Expense added successfully.',
      expense: newExpense,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      message: 'Server error.',
      error: error.message,
    });
  }
};

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    if (!expense?.length) {
      console.log('Expenses not found.');
      res.status(404).json({
        message: 'Expenses not found.',
      });
    }

    return res.status(200).json({
      message: 'Expenses fetched successfully.',
      expenses,
    });
  } catch (error) {
    console.log('Sever Error:', error);
    res.status(500).json({
      message: 'Server error.',
      error: error.message,
    });
  }
};
module.exports = { addExpense, getAllExpenses };
