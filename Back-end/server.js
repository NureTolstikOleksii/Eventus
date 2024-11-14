import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import { connectToDatabase } from './database/database.js';
import { regRouter } from './src/registration/registration.controller.js';
import { changeDataRouter } from './src/change_data/change_data.controller.js';
import { loginRouter } from './src/login/login.controller.js';
import { searchRouter } from './src/search/search.controller.js';
import { profileRouter } from './src/profile/profile.controller.js';
import { servicesRouter } from './src/services/services.controller.js';
import { mainScreenRouter } from './src/main_screen/main_screen.controller.js';


dotenv.config();

const app = express();

app.use(cors());

// Конфигурация сессии
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false, 
    cookie: { 
        maxAge: 24 * 60 * 60 * 1000, // Время жизни сессии в миллисекундах (24 часа)
        secure: false // Установите true, если используется HTTPS
    }
}));

async function main() {
    app.use(express.json());

    const db = await connectToDatabase();

    app.use((req, res, next) => {
        req.db = db;
        next();
    });

    app.use('/register', regRouter);
    app.use('/login', loginRouter);   
    app.use('/profile', profileRouter);   
    app.use('/services', servicesRouter);
    app.use('/main_screen', mainScreenRouter);

    //Зміна даних профілю
    app.use('/change_data', changeDataRouter);
    //Пошук
    app.use('/search', searchRouter);
  
    //Для перевірки існування сесії
    app.get('/session', (req, res) => {
        if (req.session.userId) {
            res.status(200).json({
                message: 'Session exists',
                userId: req.session.userId,
                userRole: req.session.userRole
            });
        } else {
            res.status(404).json({ message: 'No active session' });
        }
    });
      
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