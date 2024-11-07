export class RegisterService {
    async createAccount(db, name, email, password, phone_number) {
        try {
            await db.run(
                `INSERT INTO User (name, photo_url, email, password, phone_number, role) VALUES (?, "url", ?, ?, ?, 0)`,
                [name, email, password, phone_number]
            );
            return { message: 'Account created successfully', name, email };
        } catch (error) {
            throw new Error('Error inserting user into database: ' + error.message);
        }
    }
}
