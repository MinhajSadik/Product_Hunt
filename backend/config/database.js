const mongoose = require("mongoose");

const connectDatabase = () => {
  const DB_URL =
    process.env.NODE_ENV === "production"
      ? process.env.DB_URI_PROD
      : process.env.DB_URI_DEV;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(DB_URL, options)
    .then(() => console.log("Database connected"));
};

module.exports = connectDatabase;
