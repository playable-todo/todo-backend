import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

//For env File 
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(PORT, () => {
  console.log(`Started at http://localhost:${PORT}`);
});