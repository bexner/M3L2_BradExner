const mongoose = require("mongoose");
const logger = require("../utils/fileLogger");

const loanDbContext = async () => {
  try {
    const DB = process.env.DATABASE.replace(
      "HelloMongo",
      process.env.DB_PASSWORD
    );
    logger.info("loanDbContext: Attempting to connect to MongoDB...");

    await mongoose.connect(DB, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    logger.info("loanDbContext: Database connected successfully");
  } catch (err) {
    logger.error("loanDbContext: Database connection FAILED: " + err.message);
  }
};

module.exports = loanDbContext;
