// ================================================================
// Swagger / OpenAPI Configuration
// ================================================================
// This file sets up the Swagger documentation for the Loan API.
// It uses swagger-jsdoc to scan route files for JSDoc comments
// and generates the OpenAPI 3.0 specification automatically.
//
// The Swagger UI will be available at: http://localhost:3000/api-docs
// ================================================================

const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Loan API Documentation",
      version: "1.0.0",
      description:
        "This is the API documentation for the Loan Management System. " +
        "This API allows you to create and retrieve loan records from MongoDB. " +
        "It also has rate limiting (3 requests per minute) and file logging.",
      contact: {
        name: "IFT 458 - Middleware Programming",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development server",
      },
    ],
    components: {
      schemas: {
        // The Loan model schema for documentation
        Loan: {
          type: "object",
          required: ["name", "amount", "borrower", "interestRate"],
          properties: {
            _id: {
              type: "string",
              description: "Auto-generated MongoDB ID",
              example: "65f1a2b3c4d5e6f7a8b9c0d1",
            },
            name: {
              type: "string",
              description: "The name of the person applying for the loan",
              example: "John Doe",
            },
            amount: {
              type: "number",
              description: "The loan amount in dollars",
              example: 5000,
            },
            borrower: {
              type: "string",
              description: "The name of the borrower",
              example: "John Doe",
            },
            interestRate: {
              type: "number",
              description: "The interest rate as a percentage",
              example: 5.5,
            },
            status: {
              type: "string",
              description: "The status of the loan (defaults to pending)",
              example: "pending",
              default: "pending",
            },
          },
        },
        // Error response schema
        ErrorResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "fail",
            },
            message: {
              type: "string",
              example: "Error message here",
            },
          },
        },
        // Rate limit error schema
        RateLimitError: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "fail",
            },
            message: {
              type: "string",
              example:
                "Too many requests. You are limited to 3 requests per minute. Please wait 45 seconds and try again.",
            },
          },
        },
      },
    },
  },
  // Tell swagger-jsdoc where to find the route annotations
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
