import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './database/database.js';
import { regRouter } from './src/registration/registration.controller.js';
import { changeDataRouter } from './src/change_data/change_data.controller.js';
import { loginRouter } from './src/login/login.controller.js';
import cors from 'cors';
import { logoutRouter } from './src/logout/logout.controller.js';
import { searchRouter } from './src/logout/search.controller.js';


dotenv.config();

const app = express();

app.use(cors());

async function main() {
    app.use(express.json());

    const db = await connectToDatabase();

    app.use((req, res, next) => {
        req.db = db;
        next();
    });

    // Регистрация 
    app.use('/register', regRouter);
      
    // Вход 
    app.use('/login', loginRouter);   

    //Зміна даних профілю
    app.use('/api/change_data', changeDataRouter);

    //Пошук
    app.use('/api/search', searchRouter);

    
    app.use('/logout', logoutRouter);

   
    /* Не трогаем */
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
    /* Не трогаем */
}

main();