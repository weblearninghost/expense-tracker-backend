const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const EXP_TIME = process.env.EXP_TIME;
//Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Input validation
    if (!email || !name || !password) {
      return res.status(400).json({
        message: 'All fields are required.',
      });
    }

    //check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists.',
      });
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //cerate user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //send response
    return res.status(201).json({
      message: 'User registered successfully!',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Server while register user.',
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password required.',
      });
    }

    //Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.send().status(401).json({
        message: 'User not found.',
      });
    }
    //password comparison
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({
        message: 'Incorrect password.',
      });
    }
    //JWT token
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: EXP_TIME,
    });
    //successful login
    return res.status(200).json({
      message: 'Login successful.',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Server error while login user.',
      error: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      message: 'User Profile API Response.',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error.',
      error: error.message,
    });
  }
};
module.exports = { registerUser, loginUser, getUserProfile };
