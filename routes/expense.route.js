const express = require('express');
const {
  addExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
} = require('../controllers/expenseController');
const auth = require('../middleware/auth.middleware');
const { route } = require('./user.route');
const router = express.Router();

//add expense
router.post('/expense', auth, addExpense);
router.get('/', auth, getAllExpenses);
router.get('/:id', auth, getExpenseById);
router.put('/:id', auth, updateExpense);

module.exports = router;
