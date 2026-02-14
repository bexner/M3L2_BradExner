// ================================================================
// File Logger Utility
// ================================================================
// This module writes log messages to a file called "app.log"
// inside a "logs" folder. It also prints them to the console.
//
// It uses the built-in "fs" and "path" modules from Node.js
// so we dont need any extra packages installed.
//
// Log Levels:
//   INFO  - Normal operations (server start, request received, etc.)
//   WARN  - Something that might be a problem
//   ERROR - Something went wrong
//   DEBUG - Extra detail for developers during development
// ================================================================

const fs = require("fs");
const path = require("path");

// Get the log file path from config.env (LOG_PATH) or use default
// This way the path is configurable without changing the code
const configLogPath = process.env.LOG_PATH || "./logs/app.log";
const logFilePath = path.resolve(configLogPath);

// Create the logs folder if it doesnt exist yet
const logsDir = path.dirname(logFilePath);
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Format a log message with timestamp and level
function formatMessage(level, message) {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level}] ${message}`;
}

// Write a message to both the console and the log file
function writeLog(level, message) {
  const formatted = formatMessage(level, message);

  // Print to console
  if (level === "ERROR") {
    console.error(formatted);
  } else if (level === "WARN") {
    console.warn(formatted);
  } else {
    console.log(formatted);
  }

  // Append to the log file (adds a new line at the end)
  fs.appendFileSync(logFilePath, formatted + "\n");
}

// Public functions for each log level

function info(message) {
  writeLog("INFO", message);
}

function warn(message) {
  writeLog("WARN", message);
}

function error(message) {
  writeLog("ERROR", message);
}

function debug(message) {
  // Only show debug in development mode
  if (process.env.NODE_ENV !== "production") {
    writeLog("DEBUG", message);
  }
}

// Export the functions
module.exports = { info, warn, error, debug };
