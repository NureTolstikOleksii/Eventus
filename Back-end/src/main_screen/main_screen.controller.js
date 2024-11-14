import { Router } from 'express';
import MainScreenService from './main_screen.service.js';

const router = Router();
const mainScreenService = new MainScreenService();

// Повернення усіх послуг постачальника
router.get('/main_screen/services/:providerId', async (req, res) => {
    const { providerId } = req.params;

    try {
        const result = await mainScreenService.getServicesByProvider(req.db, providerId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve services', error: error.message });
    }
});

// Повернення усіх відгуків про послугу
router.get('/main_screen/reviews/:serviceId', async (req, res) => {
    const { serviceId } = req.params;

    try {
        const result = await mainScreenService.getReviewsByService(req.db, serviceId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve reviews', error: error.message });
    }
});

// Фільтр
router.post('/', async (req, res) => {
    //далі буде
});


export const mainScreenRouter = router;
