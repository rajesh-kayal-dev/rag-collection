import fs from 'fs';
import { createChunk } from '../services/chunk.service.js';
import { createEmbedding } from '../services/embedding.service.js';
import { addToStore } from '../services/vectorStore.service.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');


export const uploadPDF = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: 'No file uploaded'
            });
        }

        const filePath = req.file.path;

        const dataBuffer = fs.readFileSync(filePath);

        const pdfData = await pdfParse(dataBuffer);

        const text = pdfData.text;

        const cleanedText = text
            .replace(/[^a-zA-Z0-9.,()\- ]/g, '')
            .trim();

        const chunks = createChunk(cleanedText);

        console.log('Total chunks:', chunks.length);


        const embeddings = [];

        for (const chunk of chunks.slice(0, 100)) {
            const vector = await createEmbedding(chunk);
            embeddings.push(vector);
        }

        addToStore(chunks.slice(0, 100), embeddings);

        res.json({
            message: 'PDF processed',
            textLength: text.length,
            chunks: chunks.length,
            embeddings: embeddings.length
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error processing PDF'
        });
    }
};