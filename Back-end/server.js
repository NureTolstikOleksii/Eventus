import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './database/database.js';
import { regRouter } from './src/registration/registration.controller.js';

dotenv.config();

const app = express();

async function main() {
    app.use(express.json());

    // Подключаемся к базе данных
    const db = await connectToDatabase();

    // Регистрация замовника
    app.use('/api', (req, res, next) => {
        req.db = db;
        next();
    }, regRouter);

    // сюда добавляем функционал

  
    
    
   
   
   
    // Не трогаем
    app.all('*', (req, res) => {
        res.status(404).json({ message: 'Not Found' });
    });

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Oops, something happened...');
    });

    app.listen(process.env.PORT || 4200, () => {
        console.log(`Server is running on port ${process.env.PORT || 4200}`);
    });
}

main();
