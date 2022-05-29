const express = require("express");
const errorMiddleware = require("./middlewares/error");
const app = express();

app.use(express.json());
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use("/api/v1/", product);
app.use("/api/v1/", user);

// error middleware
app.use(errorMiddleware);

module.exports = app;
