export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method === "POST") {
    console.log("✅ Запрос получен");
    res.status(200).json({ reply: "👋 Сервер работает" });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

