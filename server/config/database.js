const mongoose = require("mongoose");

console.log(process.env.MONGO_URL);

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(async (connection) => {
      console.log(`Databse connected on ${connection.connection.host}`);
    })
    .catch((error) => {
      console.log(error);
    });
};

// connectDB();

module.exports = connectDB;
