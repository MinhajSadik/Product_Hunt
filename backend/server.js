const app = require("./app");
const dotenv = require("dotenv");

dontenv.config(path: "./config/config.env");


app.listen(process.env.PORT, () => {
  console.log(`Listening on port http://localhost:${process.env.PORT}`);
});
