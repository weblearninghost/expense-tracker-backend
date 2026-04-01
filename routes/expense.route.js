const express = require('express');
const { addExpense } = require('../controllers/expenseController');
const auth = require('../middleware/auth.middleware');
const router = express.Router();

//add expense
router.post('/expense', auth, addExpense);

module.exports = router;
