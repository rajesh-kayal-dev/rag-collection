export const generateAnswer = async (question, context) => {
    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: [
                    {
                        role: 'system',
                        content: `
You are a Data Structures expert.

Rules:
- Give a clean, natural answer (like a human explaining)
- Do NOT use headings like "Definition" or "Explanation"
- Answer in 2-4 simple sentences
- Use ONLY given context
- If not found, say "I don't know"
`
                    },
                    {
                        role: 'user',
                        content: `Context:\n${context}\n\nQuestion:\n${question}`
                    }
                ]
            })
        });
        const data = await response.json();
        console.log(data);


        if (!data.choices || !data.choices.length) {
            console.error('Groq Error:', data);
            return 'Error generating answer';
        }


        return data.choices[0].message.content;

    } catch (error) {
        console.error(error);
        return 'Error generating answer';
    }
}
