import { Router } from 'express';
import { ServicesService } from './services.service.js';

const router = Router();
const servicesService = new ServicesService();

// Маршрут для получения информации о конкретной услуге
router.get('/service/:serviceId', async (req, res) => {
    const { serviceId } = req.params;

    try {
        const serviceDetails = await servicesService.getServiceDetails(req.db, serviceId);
        res.status(200).json(serviceDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Маршрут для получения отзывов об определённой услуге
router.get('/service/:serviceId/reviews', async (req, res) => {
    const { serviceId } = req.params;

    try {
        const reviews = await servicesService.getServiceReviews(req.db, serviceId);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Маршрут для получения календаря услуги
router.get('/service/:serviceId/calendar', async (req, res) => {
    const { serviceId } = req.params;

    try {
        const calendar = await servicesService.getServiceCalendar(req.db, serviceId);
        res.status(200).json(calendar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export const servicesRouter = router;
