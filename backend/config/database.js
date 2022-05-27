const mongoose = require("mongoose");

const connectDatabase = () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(process.env.DB_URI_LOCAL, options)
    .then(() => console.log("Database connected"));
};

module.exports = connectDatabase;
