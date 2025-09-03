const cheerio = require("cheerio");

function fallbackHeal(html, brokenLocator) {
  const $ = cheerio.load(html);

  // Strategy 1: Try by id
  let candidate = $("[id]").first().attr("id");
  if (candidate) return `#${candidate}`;

  // Strategy 2: Try by name
  candidate = $("[name]").first().attr("name");
  if (candidate) return `[name="${candidate}"]`;

  // Strategy 3: Try by placeholder
  candidate = $("[placeholder]").first().attr("placeholder");
  if (candidate) return `[placeholder="${candidate}"]`;

  // Strategy 4: Try by aria-label
  candidate = $("[aria-label]").first().attr("aria-label");
  if (candidate) return `[aria-label="${candidate}"]`;

  // Strategy 5: Try by visible text (button, link, span)
  let textCandidate = $("button, a, span").first().text().trim();
  if (textCandidate && textCandidate.length < 40) {
    return `text="${textCandidate}"`;
  }

  console.warn("⚠️ Fallback healing could not find a reliable locator.");
  return null;
}

module.exports = { fallbackHeal };
