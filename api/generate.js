export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { prompt } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: 'API key not configured' });
        }

        // Создаем контроллер таймаута на 25 секунд, чтобы уложиться в лимит Vercel
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 25000);

        const apiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        const data = await apiRes.json();

        if (!apiRes.ok) {
            console.error('Gemini API Error:', data);
            return res.status(500).json({ error: data.error?.message || 'Gemini API Error' });
        }

        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Пустой ответ от модели';

        return res.status(200).json({ text: aiText });

    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('API Request Timeout');
            return res.status(504).json({ error: 'Превышено время ожидания ответа от ИИ. Попробуйте еще раз.' });
        }
        console.error('Server Internal Error:', error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}
