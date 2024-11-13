import db from '../database/database.js';

class MainScreenService {
    // Повернення усіх послуг постачальника
    async getServicesByProvider(db, providerId) {
        try {
            const services = await db.all('SELECT * FROM Services WHERE provider_id = ?', [providerId]);

            if (!services || services.length === 0) {
                throw new Error('No services found for the specified provider');
            }

            return { message: 'Services retrieved successfully', data: services };
        } catch (error) {
            throw new Error('Error fetching services by provider: ' + error.message);
        }
    }

    // Повернення усіх відгуків про послугу
    async getReviewsByService(db, serviceId) {
        try {
            // Запрос к базе данных для получения отзывов по идентификатору услуги
            const reviews = await db.all('SELECT * FROM Reviews WHERE service_id = ?', [serviceId]);

            // Проверка, что отзывы найдены
            if (!reviews || reviews.length === 0) {
                throw new Error('No reviews found for the specified service');
            }

            return { message: 'Reviews retrieved successfully', data: reviews };
        } catch (error) {
            throw new Error('Error fetching reviews for service: ' + error.message);
        }
    }
}

export default new MainScreenService();