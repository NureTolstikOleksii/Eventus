import { Router } from 'express';

const router = Router();

// Маршрут для выхода заказчика
router.post('/customer', async (req, res) => {
    try {
        // Очистка сессии или токена для заказчика
        req.session = null; // если используется сессия
        res.status(200).json({ message: 'Customer logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to log out customer', error: error.message });
    }
});

// Маршрут для выхода поставщика
router.post('/provider', async (req, res) => {
    try {
        // Очистка сессии или токена для поставщика
        req.session = null; // если используется сессия
        res.status(200).json({ message: 'Provider logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to log out provider', error: error.message });
    }
});

export const logoutRouter = router;
