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
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static(path.join(__dirname, '../public')))

// Middlewares
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');

// Routes
const authRoutes = require('./routes/auth');
const memberRoutes = require('./routes/member');
const todoRoutes = require('./routes/todo');

app.use('/oauth', authRoutes);
app.use('/account', memberRoutes);
app.use('/todo', todoRoutes);
app.use(verifyJWT)
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
