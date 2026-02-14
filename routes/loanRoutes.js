const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loanController");
const logger = require("../utils/fileLogger");

// ================================================================
// Swagger JSDoc Annotations for Loan Routes
// ================================================================
// These comments are read by swagger-jsdoc to generate the
// API documentation automatically. Each route has a @swagger
// block that describes what it does, what it returns, etc.
// ================================================================

/**
 * @swagger
 * /api/:
 *   get:
 *     summary: Get all loans
 *     description: Retrieves all loan records from the MongoDB database. Returns a JSON array of all loans with their details like name, amount, borrower, interest rate, and status.
 *     tags:
 *       - Loans
 *     responses:
 *       200:
 *         description: Successfully retrieved all loans
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 results:
 *                   type: integer
 *                   description: Number of loans found
 *                   example: 3
 *                 data:
 *                   type: object
 *                   properties:
 *                     loans:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Loan'
 *       400:
 *         description: Bad request or database error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       429:
 *         description: Too many requests - rate limit exceeded (3 per minute)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RateLimitError'
 */
router.get("/", (req, res, next) => {
  logger.info("Route hit: GET /api/ - Requesting all loans");
  next();
}, loanController.getAllLoans);

/**
 * @swagger
 * /api/loans:
 *   post:
 *     summary: Create a new loan
 *     description: Creates a new loan record in the MongoDB database. You must provide the name, amount, borrower, and interestRate fields in the request body. The status field defaults to "pending" if not provided.
 *     tags:
 *       - Loans
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - amount
 *               - borrower
 *               - interestRate
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the person applying
 *                 example: John Doe
 *               amount:
 *                 type: number
 *                 description: Loan amount in dollars
 *                 example: 5000
 *               borrower:
 *                 type: string
 *                 description: Name of the borrower
 *                 example: John Doe
 *               interestRate:
 *                 type: number
 *                 description: Interest rate percentage
 *                 example: 5.5
 *     responses:
 *       201:
 *         description: Loan created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     loan:
 *                       $ref: '#/components/schemas/Loan'
 *       400:
 *         description: Validation error or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       429:
 *         description: Too many requests - rate limit exceeded (3 per minute)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RateLimitError'
 */
router.post("/loans", (req, res, next) => {
  logger.info("Route hit: POST /api/loans - Creating a new loan");
  next();
}, loanController.createLoan);

module.exports = router;
