const express = require("express");
const dotenv = require("dotenv");
const loanRoutes = require("./routes/loanRoutes");
const logger = require("./utils/fileLogger");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  logger.info(`App.js server running on port ${port}`);
});
