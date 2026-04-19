export const generateAnswer = async (question, context) => {
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
                    role: 'user',
                    content: `
                            Answer the question in simple, clear language.

                            Do not use formal or textbook style.
                            Explain like a developer would explain in an interview.

                            Context:
                            ${context}

                            Question:
                            ${question}
                            `
                }
            ]
        })
    });

    const data = await response.json();

    return data.choices?.[0]?.message?.content || "No answer";
};