export class ChangeDataService {
   
    //Перевірки
    #passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[._-])[A-Za-z\d._-]{8,128}$/;
    #nameRegex = /^[A-Za-z]+$/;
    #organizationNameRegex = /^[A-Za-z]+$/;

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
    async updateServiceCategory(db, providerId, newCategory) {
        try {
            // Проверка существования категории в таблице Service_Category
            const category = await db.get('SELECT * FROM Service_Category WHERE name = ?', [newCategory]);
            if (!category) {
                throw new Error('Invalid service category');
            }

            // Обновление категории услуг у поставщика
            await db.run('UPDATE Provider SET service_category = ? WHERE provider_id = ?', [newCategory, providerId]);
            return { message: 'Service category updated successfully' };
        } catch (error) {
            throw new Error('Error updating service category: ' + error.message);
        }
    }

    //Зміна назви організації постачальника
    async updateOrganizationName(db, providerId, newOrganizationName) {
        try {
            if (!this.#organizationNameRegex.test(newOrganizationName)) {
                throw new Error('Organization name must contain only allowed characters');
            }

            const existingOrganization = await db.get('SELECT * FROM Provider WHERE company_name = ?', [newOrganizationName]);
            if (existingOrganization) {
                throw new Error('Organization name already registered');
            }

            await db.run('UPDATE Provider SET company_name = ? WHERE provider_id = ?', [newOrganizationName, providerId]);
            return { message: 'Organization name updated successfully' };
        } catch (error) {
            throw new Error('Error updating organization name: ' + error.message);
        }
    }
        
}