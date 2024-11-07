import { Router } from 'express';
import { RegisterService } from './registration.service.js';

const router = Router();
const regService = new RegisterService();

router.post('/add_user', async (req, res) => {
    const { name, email, password, phone_number } = req.body;
    try {
        const result = await regService.createAccount(req.db, name, email, password, phone_number);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create account', error: error.message });
    }
});

export const regRouter = router;
