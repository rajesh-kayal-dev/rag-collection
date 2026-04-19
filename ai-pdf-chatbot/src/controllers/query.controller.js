import { createEmbedding } from '../services/embedding.service.js';
import { searchSimilar } from '../services/vectorStore.service.js';
import { generateAnswer } from '../services/llm.service.js';

export const askQuestion = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                message: 'Question is required'
            });
        }


        const enhancedQuery = `definition and explanation of ${question}`;
        const queryVector = await createEmbedding(enhancedQuery);
        const results = searchSimilar(queryVector, question);

        if (results.length === 0) {
            return res.json({
                question,
                answer: "I don't know..."
            });
        }
        console.log("Top results:", results);

        const context = results
            .map(r => r.text)
            .join(' ')
            .slice(0, 3000);

        const answer = await generateAnswer(question, context);


        res.json({
            question,
            // results,
            answer: answer
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error processing query'
        });
    }
}