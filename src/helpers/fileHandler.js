const fs = require("fs");
const path = require("path");

const SNAPSHOT_DIR = path.join(__dirname, "../../snapshots");
const SNAPSHOT_FILE = path.join(SNAPSHOT_DIR, "latest.html");

// Save current DOM into a single snapshot file (overwrites every time)
async function saveDOMSnapshot(page, locator) {
  try {
    if (!fs.existsSync(SNAPSHOT_DIR)) {
      fs.mkdirSync(SNAPSHOT_DIR, { recursive: true });
    }

    const html = await page.content();

    // Always overwrite the same file
    fs.writeFileSync(SNAPSHOT_FILE, html, "utf-8");

    console.log(`[INFO] Snapshot reset → ${SNAPSHOT_FILE}`);
    return SNAPSHOT_FILE;
  } catch (err) {
    console.error("Failed to save DOM snapshot:", err);
    return null;
  }
}

// Read back HTML from snapshot file
function getHTMLFromSnapshot() {
  try {
    return fs.readFileSync(SNAPSHOT_FILE, "utf-8");
  } catch (err) {
    console.error("Failed to read snapshot:", err);
    return null;
  }
}

module.exports = { saveDOMSnapshot, getHTMLFromSnapshot };
