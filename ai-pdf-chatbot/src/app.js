import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import uploadRoutes from './routers/upload.routes.js';
import queryRoutes from './routers/query.routes.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api', uploadRoutes);
app.use('/api', queryRoutes);

app.get('/', (req, res) => {
    res.send('Server is running...');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});