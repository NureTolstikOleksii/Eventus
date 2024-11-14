export class ServicesService {
    // Существующий метод для получения информации о услуге
    async getServiceDetails(db, serviceId) {
        try {
            const query = `
                SELECT 
                    s.service_id, 
                    s.name AS service_name, 
                    s.description, 
                    s.photo_url, 
                    s.price, 
                    p.name AS provider_name, 
                    sc.name AS category_name,
                    p.rating
                FROM Service s
                JOIN Provider p ON s.provider_id = p.provider_id
                JOIN Service_Category sc ON s.category_id = sc.category_id
                WHERE s.service_id = ?
            `;
            const result = await db.get(query, [serviceId]);

            if (!result) {
                throw new Error('Service not found');
            }

            return result;
        } catch (error) {
            throw new Error('Failed to retrieve service details: ' + error.message);
        }
    }

    // Метод для получения отзывов об услуге с проверкой на отсутствие отзывов
    async getServiceReviews(db, serviceId) {
        try {
            const query = `
                SELECT 
                    r.review_id, 
                    r.rating, 
                    r.comment, 
                    r.review_date, 
                    u.name AS user_name
                FROM Review r
                JOIN Provider u ON r.user_id = u.provider_id
                WHERE r.service_id = ?
            `;
            const reviews = await db.all(query, [serviceId]);

            if (!reviews || reviews.length === 0) {
                return { message: 'No reviews found for this service' };
            }

            return reviews;
        } catch (error) {
            throw new Error('Failed to retrieve service reviews: ' + error.message);
        }
    }
    
    // Метод для получения календаря услуги
    async getServiceCalendar(db, serviceId) {
        try {
            const query = `
                SELECT 
                    t.date, 
                    t.time, 
                    t.status 
                FROM Timeslot t
                JOIN Calendar c ON t.calendar_id = c.calendar_id
                JOIN Service s ON c.provider_id = s.provider_id
                WHERE s.service_id = ?
            `;
            const timeslots = await db.all(query, [serviceId]);

            if (!timeslots || timeslots.length === 0) {
                return { message: 'No available timeslots for this service' };
            }

            return timeslots;
        } catch (error) {
            throw new Error('Failed to retrieve service calendar: ' + error.message);
        }
    }
}
