import { Router } from 'express';
import { ChangeDataService } from './change_data.service.js';

const router = Router();
const changeDataService = new ChangeDataService();

//Зміна паролю замовника 
router.put('/update_user_password', async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;
    try {
        const result = await changeDataService.updateUserPassword(req.db, userId, oldPassword, newPassword, confirmPassword);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update password', error: error.message });
    }
});

//Зміна паролю постачальника 
router.put('/update_provider_password', async (req, res) => {
    const { providerId, oldPassword, newPassword } = req.body;
    try {
        const result = await changeDataService.updateProviderPassword(req.db, providerId, oldPassword, newPassword, confirmPassword);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update provider password', error: error.message });
    }
});

    //Зміна імені замовника
router.put('/update_user_name', async (req, res) => {
    const { userId, newName } = req.body;
    try {
        const result = await changeDataService.updateUserName(req.db, userId, newName);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user name', error: error.message });
    }
});

    //Зміна типу послуг постачальника
    router.put('/update_service_category', async (req, res) => {
        const { providerId, newCategory } = req.body;
        try {
            const result = await changeDataService.updateServiceCategory(req.db, providerId, newCategory);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update service category', error: error.message });
        }
    });

    //Зміна назви організації постачальника
    router.put('/update_organization_name', async (req, res) => {
        const { providerId, newOrganizationName } = req.body;
        try {
            const result = await changeDataService.updateOrganizationName(req.db, providerId, newOrganizationName);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update organization name', error: error.message });
        }
    });

export const changeDataRouter = router;