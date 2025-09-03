const fs = require("fs");
const path = require("path");

const REPORT_DIR = path.join(__dirname, "../../reports");

function writeReport(testName, healedLocator) {
  try {
    if (!fs.existsSync(REPORT_DIR)) {
      fs.mkdirSync(REPORT_DIR, { recursive: true });
    }
    const filePath = path.join(REPORT_DIR, "healing-report.log");
    const log = `[${new Date().toISOString()}] ${testName} healed with: ${healedLocator}\n`;
    fs.appendFileSync(filePath, log, "utf-8");
  } catch (err) {
    console.error("Failed to write report:", err);
  }
}

module.exports = { writeReport };
