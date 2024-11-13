import { Router } from 'express';
import MainScreenService from './main_screen.service.js';

const router = Router();
const mainScreenService = new mainScreenService();

// Повернення усіх послуг постачальника
router.get('/main_screen', async (req, res) => {
    const { providerId } = req.params;

    try {
        const result = await MainScreenService.getServicesByProvider(providerId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve services', error: error.message });
    }
});

// Повернення усіх відгуків про послугу
router.get('/main_screen', async (req, res) => {
    const { serviceId } = req.params;

    try {
        const result = await MainScreenService.getReviewsByService(serviceId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve reviews', error: error.message });
    }
});

export const mainScreenRouter = router;