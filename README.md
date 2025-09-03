Playwright Self-Heal Framework

This project is a Playwright automation framework with self-healing locators.
When a locator fails, the framework automatically:

Captures a DOM snapshot

Suggests a healed locator using AI (with fallback logic)

Retries the failed action with the healed locator


Self_Heal/
│── tests/                  # Test specs
│   └── example.spec.js
│── helpers/                # Safe wrappers for actions
│   └── autoheal.js
│── core/                   # Healing engine
│   ├── healingCore.js
│   └── fileHandler.js
│── utils/
│   └── logger.js
│── snapshots/              # Auto-generated DOM snapshots
│── .env                    # API keys (ignored in git)
│── package.json
│── README.md

⚙️ Setup

1.git clone https://github.com/<your-username>/Playwright-Self-Heal.git
2.cd Playwright-Self-Heal
3.npm install
4.npx playwright install

5.OPENAI_API_KEY=your_api_key_here(Your own OpenAI API key)

 Run File:

1.npx playwright test
2.npx playwright test tests/example.spec.js --project=chromium --headed


🔧 Healing Flow

1.Locator fails

2.DOM snapshot is saved

3.Healing core suggests a new locator

4.Action is retried with the healed locator

Example:
await safeFill(page, "input[name='username123']", "Admin"); 

Output:
[WARN] Fill failed for: input[name='username123']
[INFO] Healing suggested: input[name='username']
[PASS] Retried fill with healed locator

📊 Roadmap

1.Add HTML/JSON healing reports

2.Extend healing for XPath locators

3.Support multiple LLM providers (OpenAI, Bedrock, Local LLMs)

