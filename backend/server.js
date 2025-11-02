import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import path from 'path';
import connectDatabase from './config/db.js';
import authRoutes from './routes/authRoutes.js'

const app = express();

// Middleware for cors
app.use(cors({
    origin: process.env || '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Middleware for parsing JSON
app.use(express.json());

const port = process.env.PORT || 3000;

// Connect to database
connectDatabase();

// Routes
app.use('/api/v1/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});