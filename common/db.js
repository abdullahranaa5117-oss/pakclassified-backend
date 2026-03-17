const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    console.log(' Db Not Connected')
  }
};

module.exports = connectDB;
