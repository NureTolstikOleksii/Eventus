import { Router } from 'express';
import { OrderService } from './order.service.js';

const router = Router();
const orderService = new OrderService();

router.post('/create', async(req, res) => {

})

export const orderRouter = router;
