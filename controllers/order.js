import { Router } from 'express';
import { OrderService } from '../services/order.js';

const router = Router();

router.get('/',
    async (_, res, next) => {
        try {
            const response = await new OrderService().findAll();

            res.json(response);
        } catch (error) {
            next(error);
        }
    }
);

export default router;