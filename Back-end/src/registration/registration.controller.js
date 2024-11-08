import { Router } from 'express';
import { RegisterService } from './registration.service.js';
import { EmailService } from '../email/email.service.js';

const router = Router();
const regService = new RegisterService();
const emailService = new EmailService();

// Валидация данных
const isValidName = (name) => /^[A-Za-z]+$/.test(name);
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d._-]{8,128}$/.test(password);

router.post('/User', async (req, res) => {
    const { name, email, password, phone_number } = req.body;

    // Проверка на заполненность всех полей
    if (!name || !email || !password || !phone_number) {
        return res.status(400).json({
            message: 'Please enter all data.',
            missingFields: {
                name: !name ? 'Name is required' : undefined,
                email: !email ? 'Email is required' : undefined,
                password: !password ? 'Password is required' : undefined,
                phone_number: !phone_number ? 'Phone number is required' : undefined
            }
        });
    }

    // Проверка имени
    if (!isValidName(name)) {
        return res.status(400).json({ message: 'Name can only contain Latin letters.' });
    }

    // Проверка email
    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Проверка пароля
    if (!isValidPassword(password)) {
        return res.status(400).json({
            message: 'Password must be 8-128 characters long, include at least one uppercase letter, one lowercase letter, one numeral, and may contain . _ -'
        });
    }

    try {
        // Проверка, не используется ли email уже
        const existingUser = await regService.findUserByEmail(req.db, email);
        if (existingUser) {
            return res.status(400).json({
                message: 'Email has already been used for another account. Use another email or sign in.'
            });
        }

        // Создание аккаунта
        const result = await regService.createAccount(req.db, name, email, password, phone_number);

        // Отправка подтверждающего email
        //await emailService.sendConfirmationEmail(email, name);

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create account', error: error.message });
    }
});

export const regRouter = router;
