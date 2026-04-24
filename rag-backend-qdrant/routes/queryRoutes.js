import express from "express";
import { generateEmbedding } from "../services/embeddingService.js";
import { searchSimilarChunks } from "../services/qdrantService.js";

const router = express.Router();

router.post("/query", async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ error: "Question is required" });
        }

        const queryEmbedding = await generateEmbedding(question);

        const results = await searchSimilarChunks(queryEmbedding);

        const filtered = results.filter(item => item.score > 0.7);

        const finalResults = filtered.length > 0 ? filtered : results;

        const matchedChunks = finalResults.map(item => item.payload.text);

        res.json({
            question,
            results: finalResults.map(item => ({
                text: item.payload.text,
                score: item.score
            }))
        });

    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

export default router;