const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" });

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
