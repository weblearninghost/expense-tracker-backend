const express = require('express');
const {
  addExpense,
  getAllExpenses,
} = require('../controllers/expenseController');
const auth = require('../middleware/auth.middleware');
const router = express.Router();

//add expense
router.post('/expense', auth, addExpense);
router.get('/', auth, getAllExpenses);

module.exports = router;
