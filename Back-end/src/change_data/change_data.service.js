export class ChangeDataService {
    async updatePassword(db, userId, oldPassword, newPassword) {
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
}