const OpenAI = require("openai");
require("dotenv").config();  // <-- add this

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = client;
