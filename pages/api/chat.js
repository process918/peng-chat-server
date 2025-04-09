export default function handler(req, res) {
  // Устанавливаем заголовки CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization");

  // Обрабатываем preflight (CORS)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Дальше твоя логика
  if (req.method === "POST") {
    const { OpenAI } = require("openai");
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const { message } = req.body;

    openai.chat.completions
      .create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      })
      .then((response) => {
        res.status(200).json({ reply: response.choices[0].message.content });
      })
      .catch((error) => {
        console.error("OpenAI error:", error);
        res.status(500).json({ error: "Failed to process the request" });
      });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
