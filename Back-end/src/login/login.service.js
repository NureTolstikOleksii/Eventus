import bcrypt from 'bcrypt';

export class LoginService {
    // Функция для входа заказчика
    async loginCustomer(db, email, password) {
        const customer = await db.get(`SELECT * FROM User WHERE email = ? AND role = 0`, [email]);
        if (customer && bcrypt.compareSync(password, customer.password)) {
            return customer;
        }
        return null;
    }

    // Функция для входа поставщика
    async loginProvider(db, email, password) {
        const provider = await db.get(`SELECT * FROM Provider WHERE email = ?`, [email]);
        if (provider && bcrypt.compareSync(password, provider.password)) {
            return provider;
        }
        return null;
    }
}
