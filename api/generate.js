export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { prompt } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: 'API key not configured on server' });
        }

        const apiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: prompt }
                        ]
                    }
                ]
            })
        });

        const data = await apiRes.json();
        
        if (!apiRes.ok) {
            console.error('Google API Error:', data);
            return res.status(500).json({ error: data.error?.message || 'Google API Error' });
        }

        // Надежно извлекаем текст из ответа Google API
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || data.text || JSON.stringify(data);

        // Возвращаем клиенту объект с полем text, как ожидает фронтенд
        return res.status(200).json({ text: aiText });

    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}
