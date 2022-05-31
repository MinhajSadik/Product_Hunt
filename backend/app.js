const express = require("express");
const errorMiddleware = require("./middlewares/error");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use("/api/v1/", product);
app.use("/api/v1/", user);

// error middleware
app.use(errorMiddleware);

module.exports = app;
