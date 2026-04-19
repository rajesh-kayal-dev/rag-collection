import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { createChunks } from '../utils/chunk.js';
import { createEmbedding } from '../services/embedding.service.js';
import { addToStore } from '../services/vectorStore.service.js';

export const uploadPDF = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const loader = new PDFLoader(req.file.path);
        const docs = await loader.load();

        const chunks = createChunks(docs);

        const vectors = [];

        for (let i = 0; i < 20; i++) {
            const v = await createEmbedding(chunks[i]);
            vectors.push(v);
        }

        addToStore(chunks.slice(0, 20), vectors);

        res.json({
            message: 'PDF processed',
            chunks: chunks.length,
            stored: 20
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error loading PDF' });
    }
};