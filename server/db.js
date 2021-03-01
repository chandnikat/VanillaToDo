const mongoose = require("mongoose");

const MONGO_URI =
  // "enter MondoDB database url;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Mongo DB!");
  } catch (error) {
    console.log("Connecting to Mongo DB ERROR: " + error);
  }
};

module.exports = connectDB;
