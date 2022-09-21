const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

dotenv.config({ path: "./config/config.env" });

// handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log(`Shutting down the server due to uncaught exception`);
  process.exit(1);
});

connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const app = require("./app");
const PORT = process.env.PORT || 5000;

app.all("/", (req, res) => {
  res.send("Product Hunt API Viewers");
});

const server = app.listen(PORT, () => {
  console.log(`server running on port:${PORT}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`unhandledRejection: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection...`);
  server.close(() => {
    process.exit(1);
  });
});
