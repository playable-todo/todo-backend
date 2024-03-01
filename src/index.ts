import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

//For env File 
dotenv.config();


const app: Express = express();
const PORT = process.env.PORT || 8000;

// Redis
const redis = require('./helpers/redis');

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

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
