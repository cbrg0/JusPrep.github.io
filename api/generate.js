export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not set in Vercel environment variables' });
    }

    let apiResponse;
    let data;
    let attempts = 3;

    // Цикл повторных попыток при высокой нагрузке
    while (attempts > 0) {
      apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      data = await apiResponse.json();

      if (apiResponse.ok) break;

      // Если ошибка связана с перегрузкой (503 или high demand), ждем и пробуем снова
      if (apiResponse.status === 503 || JSON.stringify(data).includes('high demand')) {
        attempts--;
        if (attempts === 0) break;
        await new Promise(resolve => setTimeout(resolve, 1500)); // пауза 1.5 сек
      } else {
        break;
      }
    }

    if (!apiResponse.ok) {
      throw new Error(data.error?.message || 'Gemini API request failed due to high demand');
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return res.status(200).json({ text });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: error.message });
  }
}
