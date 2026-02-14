const Loan = require("../model/loadModel.js");
const logger = require("../utils/fileLogger");

// Get all loans
exports.getAllLoans = async (req, res) => {
  try {
    logger.info("getAllLoans: Fetching all loans from database...");
    const loans = await Loan.find(); // Retrieve all loans from the database
    logger.info(`getAllLoans: Found ${loans.length} loans successfully`);

    res.status(200).json({
      status: "success",
      results: loans.length, // Number of loans found
      data: {
        loans, // The loans array
      },
    });
  } catch (err) {
    logger.error("getAllLoans FAILED: " + err.message);
    res.status(400).json({
      status: "fail",
      message: err.message, // Return the error message if there's a failure
    });
  }
};

// Create a new loan
exports.createLoan = async (req, res) => {
  try {
    logger.info("createLoan: Creating new loan with data: " + JSON.stringify(req.body));
    // Create a new loan using the data from the request body
    const newLoan = await Loan.create(req.body);
    logger.info(`createLoan: Loan created successfully with ID: ${newLoan._id}`);

    res.status(201).json({
      status: "success",
      data: {
        loan: newLoan, // Return the created loan object
      },
    });
  } catch (err) {
    logger.error("createLoan FAILED: " + err.message);
    res.status(400).json({
      status: "fail",
      message: err.message, // Return the error message if there's a failure
    });
  }
};
