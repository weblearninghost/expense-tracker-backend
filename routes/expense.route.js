const express = require('express');
const {
  addExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenseController');
const auth = require('../middleware/auth.middleware');
const { route } = require('./user.route');
const router = express.Router();

router.post('/expense', auth, addExpense);
router.get('/', auth, getAllExpenses);
router.get('/:id', auth, getExpenseById);
router.put('/:id', auth, updateExpense);
router.delete('/:id', auth, deleteExpense);

module.exports = router;
