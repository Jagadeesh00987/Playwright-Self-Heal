const fs = require("fs-extra");
const path = require("path");

// Ensure logs directory exists
const logDir = path.join(__dirname, "../../logs");
fs.ensureDirSync(logDir);

// Create unique log file per run
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const logFile = path.join(logDir, `autoheal-${timestamp}.log`);

function log(level, message) {
  const time = new Date().toISOString();
  const logMsg = `[${level.toUpperCase()}] ${time} → ${message}`;

  // Print to console
  if (level === "error") {
    console.error(logMsg);
  } else if (level === "warn") {
    console.warn(logMsg);
  } else {
    console.log(logMsg);
  }

  // Append to run-specific log file
  fs.appendFileSync(logFile, logMsg + "\n");
}

module.exports = {
  info: (msg) => log("info", msg),
  warn: (msg) => log("warn", msg),
  error: (msg) => log("error", msg),
};
