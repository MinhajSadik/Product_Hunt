const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");
const app = require("./app");

dotenv.config({ path: "./backend/config/config.env" });

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

const PORT = process.env.PORT || 5000;

app.all("/", (req, res) => {
  res.json("Product Hunt API Viewers");
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
