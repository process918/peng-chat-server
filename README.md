# Peng Chat Server

This is a simple Vercel-compatible backend to handle OpenAI GPT chat requests.

## 📦 Files:
- `api/chat.js` — serverless function that sends messages to OpenAI.
- `vercel.json` — Vercel deployment config.

## 🚀 Deployment Steps:
1. Push this folder to GitHub as a new repo.
2. Go to https://vercel.com → "New Project".
3. Link your GitHub repo.
4. Add your `OPENAI_API_KEY` in project settings (Environment Variables).
5. Deploy & use endpoint: `https://your-project.vercel.app/api/chat`

