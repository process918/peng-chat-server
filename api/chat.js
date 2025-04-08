import { OpenAI } from 'openai';

// Инициализация OpenAI с API ключом
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://api.openai.com/v1',  // Это может понадобиться для указания правильного базового URL
});

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method === "POST") {
    try {
      const { message } = req.body;

      // Запрос к OpenAI для чата
      const openaiResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // Или используйте gpt-4, если он доступен
        messages: [{ role: 'user', content: message }],
      });

      const reply = openaiResponse.choices[0].message.content;

      // Ответ от сервера
      res.status(200).json({ reply });
    } catch (error) {
      console.error("OpenAI Error:", error);
      res.status(500).json({ error: "Failed to process the request" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

