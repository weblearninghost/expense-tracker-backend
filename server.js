const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/config-db');
require('dotenv').config();
const app = express();

const userRoutes = require('./routes/user.route');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);

connectDatabase();

app.get('/', (req, res) => {
  res.send(`Listening at port ${PORT}...`);
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}!`);
});
