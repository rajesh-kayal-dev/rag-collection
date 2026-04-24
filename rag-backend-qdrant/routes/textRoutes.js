import express from "express";
import { createChunks } from "../services/chunkService.js";
import { generateEmbedding } from "../services/embeddingService.js";
import { storeEmbedding } from "../services/qdrantService.js";

const router = express.Router();

router.post("/add-text", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const chunks = createChunks(text);

    let id = Date.now();

    for (const chunk of chunks) {
      const embedding = await generateEmbedding(chunk);
      await storeEmbedding(id++, chunk, embedding);
    }

    res.json({
      message: "Stored in Qdrant",
      chunks
    });

  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;