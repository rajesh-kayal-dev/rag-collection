import express from 'express';
import dotenv from 'dotenv';
import uploadRoutes from './routes/upload.routes.js';
import queryRoutes from './routes/query.routes.js';

dotenv.config();

const app = express();


app.use('/upload', uploadRoutes);

app.use(express.json());

app.use('/ask', queryRoutes);



app.get('/', (req, res) => {
    res.send('LangChain RAG API Running');
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});