const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDatabase = () => {
  // const DB_URL =
  //   process.env.NODE_ENV === "production"
  //     ? process.env.DB_URI_PROD
  //     : process.env.DB_URI_DEV;

  const DB_URL = process.env.DB_URI_PROD;

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(DB_URL, options)
    .then(() => console.log("Database connected..."))
    .catch((error) => console.error(error.message));
};

module.exports = connectDatabase;
