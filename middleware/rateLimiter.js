// ================================================================
// Rate Limiter Middleware
// ================================================================
// This middleware limits how many times a client (IP address)
// can call any endpoint. If they go over the limit, they get
// a 429 "Too Many Requests" response.
//
// Settings:
//   - Max 3 requests per minute per IP address
//   - The counter resets after 1 minute
//
// It also logs every block to the file logger so we can see
// who is hitting the API too much.
// ================================================================

const logger = require("../utils/fileLogger");

// Store request counts per IP
// Each entry looks like: { count: 2, startTime: 1707849600000 }
const requestCounts = {};

// Configuration - reads from config.env or uses defaults
// RATE_LIMIT_MAX in config.env controls how many requests are allowed
const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX) || 3;  // default 3 calls
const WINDOW_MS = 60 * 1000;  // per 1 minute (60000 milliseconds)

function rateLimiter(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress || "unknown";
  const now = Date.now();

  // If this IP has no record yet, create one and let them through
  if (!requestCounts[ip]) {
    requestCounts[ip] = { count: 1, startTime: now };
    logger.debug(`Rate limiter: first request from IP ${ip}`);
    return next();
  }

  const record = requestCounts[ip];

  // If the 1-minute window has passed, reset their counter
  if (now - record.startTime > WINDOW_MS) {
    record.count = 1;
    record.startTime = now;
    logger.debug(`Rate limiter: window reset for IP ${ip}`);
    return next();
  }

  // Still inside the window, add to the count
  record.count++;

  // If they went over the limit, block them
  if (record.count > MAX_REQUESTS) {
    const waitTime = Math.ceil((WINDOW_MS - (now - record.startTime)) / 1000);
    logger.warn(
      `Rate limit BLOCKED: IP ${ip} made ${record.count} requests. ` +
      `Limit is ${MAX_REQUESTS} per minute. Must wait ${waitTime}s.`
    );

    return res.status(429).json({
      status: "fail",
      message: `Too many requests. You are limited to ${MAX_REQUESTS} requests per minute. Please wait ${waitTime} seconds and try again.`,
    });
  }

  // They are still under the limit, let them through
  logger.debug(
    `Rate limiter: IP ${ip} request ${record.count}/${MAX_REQUESTS}`
  );
  next();
}

module.exports = rateLimiter;
