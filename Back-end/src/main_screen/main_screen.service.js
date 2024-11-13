import db from '../database/database.js';

class MainScreenService {
    // Повернення усіх послуг постачальника
    async getServicesByProvider(providerId) {
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
}

export default new MainScreenService();