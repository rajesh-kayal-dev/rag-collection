import { createEmbedding } from '../services/embedding.service.js';
import { searchSimilar } from '../services/vectorStore.service.js';
import { generateAnswer } from '../services/llm.service.js';

export const askQuestion = async (req, res) => {
    try {
        const question = req.body?.question;

        if (!question) {
            return res.status(400).json({ message: 'Question is required' });
        }

        const queryVector = await createEmbedding(question);

        const results = searchSimilar(queryVector);

        const context = results
            .map(r => r.text)
            .join('\n\n');

        const answer = await generateAnswer(question, context);

        res.json({
            question,
            answer
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error processing query' });
    }
};