const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
} = require('../controllers/userController');
const auth = require('../middleware/auth.middleware');
//Register user route
router.post('/register', registerUser);
router.post('/login', loginUser);

//Protected Routes
router.get('/profile', auth, getUserProfile);

module.exports = router;
