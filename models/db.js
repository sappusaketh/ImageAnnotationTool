const mongoose = require('mongoose');
const URI =
  'mongodb+srv://admin:admin123@cluster0-xrjrb.mongodb.net/test?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(URI, { useNewUrlParser: true });
    console.log(`connected to mongoDB`);
  } catch (error) {
    console.log(error.message);
    // exit Process incase a failure
    process.exit(1);
  }
};

module.exports = connectDB;
