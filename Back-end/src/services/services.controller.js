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

// Маршрут для получения отзывов о поставщике
router.get('/provider/:providerId/reviews', async (req, res) => {
    const { providerId } = req.params;

    try {
        const reviews = await servicesService.getProviderReviews(req.db, providerId);
        if (reviews.length === 0) {
            res.status(200).json({ message: 'Отзывы о поставщике отсутствуют.' });
        } else {
            res.status(200).json(reviews);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Маршрут для получения полного текста отзыва
router.get('/review/:reviewId', async (req, res) => {
    const { reviewId } = req.params;

    try {
        const fullReview = await servicesService.getFullReview(req.db, reviewId);

        if (!fullReview) {
            res.status(404).json({ message: 'Отзыв не может быть загружен.' });
        } else {
            res.status(200).json(fullReview);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Маршрут для получения пакетов услуг поставщика
router.get('/provider/:providerId/packages', async (req, res) => {
    const { providerId } = req.params;

    try {
        const packages = await servicesService.getProviderPackages(req.db, providerId);

        if (!packages || packages.length === 0) {
            res.status(200).json({ message: 'Нет доступных пакетов услуг.' });
        } else {
            res.status(200).json(packages);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export const servicesRouter = router;
