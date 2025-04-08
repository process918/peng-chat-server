import { OpenAI } from 'openai';  // Если ты используешь SDK OpenAI

// Инициализация OpenAI API с ключом
const openai = new OpenAI({
  apiKey: process.env.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, // Используй свой API ключ из переменных окружения
});

export default async function handler(req, res) {
  // Добавление заголовка CORS
  res.setHeader("Access-Control-Allow-Origin", "*"); // Разрешаем доступ с любых доменов

  if (req.method === "POST") {
    try {
      const { message } = req.body;

      // Обработка запроса через OpenAI API
      const openaiResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      });

      const reply = openaiResponse.choices[0].message.content;

      // Отправка ответа
      res.status(200).json({ reply });
    } catch (error) {
      console.error("OpenAI Error: ", error);
      res.status(500).json({ error: "Failed to process the request" });
    }
  } else {
    // Если метод не POST, возвращаем ошибку
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

