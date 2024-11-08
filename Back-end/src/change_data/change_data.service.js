export class ChangeDataService {
   
    //Перевірки
    #passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[._-])[A-Za-z\d._-]{8,128}$/;
    #nameRegex = /^[A-Za-z]+$/;

    //Зміна паролю замовника 
    async updateUserPassword(db, userId, oldPassword, newPassword, confirmPassword) {
        try {
            if (newPassword !== confirmPassword) {
                throw new Error('New password and confirmed password do not match');
            }

            if (!this.#passwordRegex.test(newPassword)) {
                throw new Error('Password does not meet complexity requirements');
            }

            // Перевірка на введння старого паролю
            const user = await db.get('SELECT password FROM User WHERE user_id = ?', [userId]);
            if (!user || user.password !== oldPassword) {
                throw new Error('Old password is incorrect');
            }

            // Оновлення паролю
            await db.run('UPDATE User SET password = ? WHERE user_id = ?', [newPassword, userId]);
            return { message: 'Password updated successfully' };
        } catch (error) {
            throw new Error('Error updating password: ' + error.message);
        }
    }

    //Зміна паролю постачальника 
    async updateProviderPassword(db, providerId, oldPassword, newPassword, confirmPassword) {
        try {
            if (newPassword !== confirmPassword) {
                throw new Error('New password and confirmed password do not match');
            }

            if (!this.#passwordRegex.test(newPassword)) {
                throw new Error('Password does not meet complexity requirements');
            }

            // Проверка старого пароля поставщика
            const provider = await db.get('SELECT password FROM Provider WHERE provider_id = ?', [providerId]);
            if (!provider || provider.password !== oldPassword) {
                throw new Error('Old password is incorrect');
            }

            // Обновление пароля поставщика
            await db.run('UPDATE Provider SET password = ? WHERE provider_id = ?', [newPassword, providerId]);
            return { message: 'Provider password updated successfully' };
        } catch (error) {
            throw new Error('Error updating provider password: ' + error.message);
        }
    }

    //Зміна імені замовника
    async updateUserName(db, userId, newName) {
        try {
            if (!this.#nameRegex.test(newName)) {
                throw new Error('Name must contain only Latin letters, without spaces or special characters');
            }

            await db.run('UPDATE User SET name = ? WHERE user_id = ?', [newName, userId]);
            return { message: 'User name updated successfully' };
        } catch (error) {
            throw new Error('Error updating user name: ' + error.message);
        }
    }

    //Зміна імені постачальника
    async updateUserName(db, providerId, newName) {
        try {
            if (!this.#nameRegex.test(newName)) {
                throw new Error('Name must contain only Latin letters, without spaces or special characters');
            }

            await db.run('UPDATE User SET name = ? WHERE user_id = ?', [newName, providerId]);
            return { message: 'User name updated successfully' };
        } catch (error) {
            throw new Error('Error updating user name: ' + error.message);
        }
    }

    //Зміна типу послуг постачальника
    async updateServiceCategory(db, providerId, newCategory) {
        try {
            if (!this.validateServiceCategory(newCategory)) {
                throw new Error('Invalid service category');
            }

            await db.run('UPDATE Provider SET service_category = ? WHERE provider_id = ?', [newCategory, providerId]);
            return { message: 'Service category updated successfully' };
        } catch (error) {
            throw new Error('Error updating service category: ' + error.message);
        }
    }

    // Перевірка типу послуг
    validateServiceCategory(category) {
        // Здесь можно указать допустимые категории
        const allowedCategories = ['Photography', 'Catering', 'Entertainment', 'Floral Design']; // Дописать остальные
        return allowedCategories.includes(category);
    }
        
}