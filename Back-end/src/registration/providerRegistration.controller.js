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

router.post('/Provider', async (req, res) => {
    const { name, email, password, company_name, service_category } = req.body;

    // Проверка на заполненность обязательных полей
    if (!name || !email || !password || !company_name || service_category === undefined) {
        return res.status(400).json({
            message: 'Please enter all required fields: name, email, password, company_name, and service_category.',
            missingFields: {
                name: !name ? 'Name is required' : undefined,
                email: !email ? 'Email is required' : undefined,
                password: !password ? 'Password is required' : undefined,
                company_name: !company_name ? 'Company name is required' : undefined,
                service_category: service_category === undefined ? 'Service category is required' : undefined
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
        // Проверка на существование поставщика с таким же email
        const existingProvider = await regService.findProviderByEmail(req.db, email);
        if (existingProvider) {
            return res.status(400).json({
                message: 'Email has already been used for another account. Use another email or sign in.'
            });
        }

        // Регистрация поставщика
        const result = await regService.registerProvider(req.db, name, null, email, password, company_name, service_category, 1);

        // Отправка подтверждающего email
        // await emailService.sendConfirmationEmail(email, name);

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to register provider', error: error.message });
    }
});

export const providerRouter = router;
