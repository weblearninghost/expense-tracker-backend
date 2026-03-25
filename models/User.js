const mongoose = require('mongoose');

//User Schema Definition
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

//User Model Creation
const User = mongoose.Model('User', userSchema);

module.exports = User;
