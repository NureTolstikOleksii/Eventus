import { Router } from 'express';
import { LoginService } from './login.service.js';

const router = Router();
const loginService = new LoginService();

// Маршрут для входа заказчика
router.post('/customer', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter both email and password.' });
    }

    try {
        const customer = await loginService.loginCustomer(req.db, email, password);
        if (!customer) {
            return res.status(401).json({ message: 'Invalid email or password for customer.' });
        }
        res.status(200).json({ message: 'Customer logged in successfully', customer });
    } catch (error) {
        res.status(500).json({ message: 'Failed to log in customer', error: error.message });
    }
});

// Маршрут для входа поставщика
router.post('/provider', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter both email and password.' });
    }

    try {
        const provider = await loginService.loginProvider(req.db, email, password);
        if (!provider) {
            return res.status(401).json({ message: 'Invalid email or password for provider.' });
        }
        res.status(200).json({ message: 'Provider logged in successfully', provider });
    } catch (error) {
        res.status(500).json({ message: 'Failed to log in provider', error: error.message });
    }
});

export const loginRouter = router;
