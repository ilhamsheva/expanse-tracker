import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import path from 'path';
import connectDatabase from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import incomeRoutes from './routes/incomeRoutes.js'

const app = express();

// Middleware for cors
app.use(cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Middleware for parsing JSON
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const port = process.env.PORT || 3000;

// Connect to database
connectDatabase();

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v2/income', incomeRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});