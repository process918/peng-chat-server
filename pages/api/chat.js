import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  // 🔧 CORS-заголовки
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization");

  // 🔁 Обработка preflight-запроса
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ✅ Основной POST-запрос
  if (req.method === "POST") {
    try {
      const { message } = req.body;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      });

      const reply = response.choices[0].message.content;
      return res.status(200).json({ reply });
    } catch (error) {
      console.error("OpenAI error:", error);
      return res.status(500).json({ error: "Failed to process the request" });
    }
  }

  // ❌ Метод не разрешён
  return res.status(405).json({ error: "Method Not Allowed" });
}
