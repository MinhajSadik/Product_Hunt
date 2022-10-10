const express = require("express");
const errorMiddleware = require("./middlewares/error");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const corsOptions = {
  origin: "https://product-hunt-minhajsadik.vercel.app",
  credentials: true,
  // optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors(corsOptions));

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1/", product);
app.use("/api/v1/", user);
app.use("/api/v1/", order);

// if (process.env.NODE_ENV) {
// console.log(path.resolve(__dirname, "../frontend/build/index.html"));
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname + "../frontend/build/index.html"));
// });
// }

// error middleware
app.use(errorMiddleware);

module.exports = app;
