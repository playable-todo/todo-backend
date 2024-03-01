import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

//For env File 
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;

// Cors
import cors from 'cors';
const corsOptions = require('./config/corsOptions');

app.use(cors(corsOptions));

// Redis
const redis = require('./helpers/redis');

// Middlewares
const errorHandler = require('./middleware/errorHandler')

// Routes
const authRoutes = require('./routes/auth');

app.use('/oauth', authRoutes);

app.use(errorHandler);

const startUp = async () => {
    try {
        await redis.RedisClient.connect();
    }
    catch(err){
        console.error(err);
    }
    app.listen(PORT, () => {
        console.log(`Started at http://localhost:${PORT}`);
    });
}
startUp();
