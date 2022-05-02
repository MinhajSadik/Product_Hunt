const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

console.log(process.env.PORT);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port http://localhost:${process.env.PORT}`);
});
