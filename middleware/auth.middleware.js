const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(400).json({
        message: 'Auth token required.',
      });
    }
    const payload = jwt.verify(token, JWT_SECRET);
    if (!payload) {
      return res.status(400).json({
        message: 'Invalid Token.',
      });
    }

    req.user = payload;
    console.log('User authentication done!');
    next();
  } catch (error) {
    res.status(500).json({
      message: 'Server error.',
      error: error.message,
    });
  }
};

module.exports = auth;
