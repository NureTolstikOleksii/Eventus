import crypto from 'crypto';
import axios from 'axios';




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

    // Метод для получения отзывов о поставщике
    async getProviderReviews(db, providerId) {
    try {
        const query = `
            SELECT 
                r.review_id, 
                r.rating, 
                r.comment, 
                r.review_date, 
                c.name AS customer_name
            FROM Review r
            JOIN Customer c ON r.customer_id = c.customer_id
            WHERE r.provider_id = ?
        `;
        const reviews = await db.all(query, [providerId]);

        return reviews || [];
    } catch (error) {
        throw new Error('Ошибка при получении отзывов о поставщике: ' + error.message);
    }

    
    }

    // Метод для получения полного текста отзыва
    async getFullReview(db, reviewId) {
        try {
            const query = `
            SELECT 
                r.review_id, 
                r.rating, 
                r.comment, 
                r.review_date, 
                c.name AS customer_name
            FROM Review r
            JOIN Customer c ON r.customer_id = c.customer_id
            WHERE r.review_id = ?
        `;
        const review = await db.get(query, [reviewId]);

        return review || null;
        } catch (error) {
        throw new Error('Ошибка при получении полного текста отзыва: ' + error.message);
     }
    }


    // Метод для получения пакетов услуг поставщика
    async getProviderPackages(db, providerId) {
    try {
        const query = `
            SELECT 
                pp.package_id, 
                pp.name AS package_name, 
                pp.description, 
                pp.price, 
                GROUP_CONCAT(s.name) AS included_services
            FROM Package pp
            JOIN Service_Package sp ON pp.package_id = sp.package_id
            JOIN Service s ON sp.service_id = s.service_id
            WHERE pp.provider_id = ?
            GROUP BY pp.package_id
        `;
        const packages = await db.all(query, [providerId]);

        return packages || [];
    } catch (error) {
        throw new Error('Ошибка при получении пакетов услуг: ' + error.message);
    }
    }

    async processTestPayment(db, orderId, amount) {
        try {
            // Проверка существования заказа
            const orderQuery = 'SELECT * FROM Orders WHERE order_id = ?'; // Убедитесь, что таблица "Orders" существует
            const order = await db.get(orderQuery, [orderId]);
            if (!order) {
                throw new Error('Order not found');
            }
    
            // Заглушка для тестового платежа
            const paymentResponse = {
                status: 'success',
                transactionId: 'TEST12345',
                amount,
                currency: 'UAH',
                orderId,
                details: 'Test payment of 1 UAH',
            };
    
            // Запись транзакции в таблицу Payment
            const insertQuery = `
                INSERT INTO Payment (payment_amount, payment_details, payment_status, payment_date, order_id)
                VALUES (?, ?, ?, DATE('now'), ?)
            `;
            await db.run(insertQuery, [amount, paymentResponse.details, paymentResponse.status, orderId]);
    
            return paymentResponse;
        } catch (error) {
            throw new Error('Ошибка при обработке тестового платежа: ' + error.message);
        }
    }

    async processRealPaymentDonatello(db, orderId, amount) {
        const donatelloApiUrl = 'https://donatello.to/EVENTUS';
        const apiKey = process.env.DONATELLO_API_KEY;
    
        try {
            // Проверка существования заказа
            const orderQuery = 'SELECT * FROM Orders WHERE order_id = ?';
            const order = await db.get(orderQuery, [orderId]);
            if (!order) {
                throw new Error('Order not found');
            }
    
            // Параметры платежа
            const paymentData = {
                amount: amount , // Donatello API принимает сумму в копейках
                currency: 'UAH',
                description: `Payment for order #${orderId}`,
                order_id: `${orderId}_${Date.now()}`, // Уникальный ID заказа
                result_url: 'http://localhost:3000/payment-success', // URL для редиректа после успешного платежа
                server_url: 'http://localhost:4200/services/payment-callback', // URL для вебхука
            };
    
            console.log('Payment Data:', paymentData); // Логируем параметры перед отправкой
    
            const headers = {
                'X-Token': apiKey, // Используем X-Token вместо Authorization
                'Content-Type': 'application/json',
            };
    
            // Отправка запроса на создание платежа
            const response = await axios.post(donatelloApiUrl, paymentData, { headers });
            const paymentLink = response.data.link;
    
            // Сохранение информации о платеже
            const insertQuery = 
                `INSERT INTO Payment (payment_amount, payment_details, payment_status, payment_date, order_id)
                VALUES (?, ?, ?, DATE('now'), ?)`
            await db.run(insertQuery, [amount, 'Pending payment via Donatello', 'pending', orderId]);
    
            return { status: 'pending', paymentLink };
        } catch (error) {
            console.error('Error creating payment via Donatello API:', error.response ? error.response.data : error.message);
            throw new Error('Ошибка при создании платежа через Donatello API: ' + error.message);
        }
    }
    
    async handlePaymentCallbackDonatello(db, callbackData) {
        try {
            if (!callbackData || !callbackData.order_id || !callbackData.status || !callbackData.amount) {
                throw new Error('Invalid callback data');
            }
    
            const { order_id, status, amount } = callbackData;
    
            // Обновление статуса в базе данных
            const updateQuery = `
                UPDATE Payment
                SET payment_status = ?, payment_details = ?
                WHERE payment_details LIKE ? AND payment_amount = ?
            `;
            await db.run(updateQuery, [status, JSON.stringify(callbackData), `%${order_id}%`, amount]);
    
            return { status: 'success', message: 'Payment status updated' };
        } catch (error) {
            console.error('Ошибка при обработке callback от Donatello:', error.message);
            throw error;
        }
    }
    
    
    

}
