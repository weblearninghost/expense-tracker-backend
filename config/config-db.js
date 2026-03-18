const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING || 'sample_uri';

async function connectDatabase() {
  try {
    //console.log(`MONGO URI:${MONGO_CONNECTION_STRING}`);
    const mongodbConnection = await mongoose.connect(MONGO_CONNECTION_STRING);
    console.log(
      `Database connection successful! ${mongodbConnection.connection.host} `
    );
  } catch (error) {
    console.log(`Database connection failed!`);
    console.log(error);
  }
}

module.exports = connectDatabase;
