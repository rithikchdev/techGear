import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import itemRoutes from './routes/item.routes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json()); // parses incoming JSON request bodies

app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));