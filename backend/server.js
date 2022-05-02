const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 3001;

app.listen(process.env.PORT, () => {
  console.log(`Listening on port http://localhost:${process.env.PORT}`);
});
