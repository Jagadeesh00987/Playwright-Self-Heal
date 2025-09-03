const { getHTMLFromSnapshot } = require("./fileHandler");
const client = require("../clients/openaiClient");
const logger = require("../utils/logger");

async function healLocator(snapshotPath, brokenLocator) {
  const html = getHTMLFromSnapshot(snapshotPath);
  if (!html) return null;

  // 🔹 Try LLM healing with OpenAI
  try {
    const prompt = `
You are a Playwright test assistant. 
The following locator is broken: "${brokenLocator}"
Here is the page HTML snapshot:

${html}

Suggest the most correct Playwright locator (CSS or text-based).
Return ONLY the locator string.
    `;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // or whichever model you want
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    const suggestion = response.choices?.[0]?.message?.content?.trim();
    if (suggestion) {
      return suggestion;
    }
  } catch (err) {
    logger.error("OpenAI healing failed: " + err.message);
  }

  // 🔹 Basic fallback healing (hard-coded rules for demo)
  if (brokenLocator.includes("Login123")) {
    return 'button:has-text("Login")';
  }

  if (brokenLocator.match(/\d+/)) {
    return brokenLocator.replace(/\d+/, "");
  }

  return null;
}

module.exports = { healLocator };
