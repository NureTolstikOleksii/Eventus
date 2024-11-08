export class ChangeDataService {
   
    //Зміна паролю замовника 
    async updateUserPassword(db, userId, oldPassword, newPassword) {
        try {
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
    async updateProviderPassword(db, providerId, oldPassword, newPassword) {
        try {
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
}