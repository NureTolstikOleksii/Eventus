import { Router } from 'express';
import { ChangeDataService } from './change_data.service.js';

const router = Router();
const changeDataService = new ChangeDataService();

//Зміна паролю замовника 
router.put('/update_password', async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;
    try {
        const result = await changeDataService.updatePassword(req.db, userId, oldPassword, newPassword);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update password', error: error.message });
    }
});


//Зміна паролю постачальника 

export const changeDataRouter = router;