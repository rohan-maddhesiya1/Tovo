import express from 'express';
import { createNewOrder } from '../controllers/orderController.js';
import { getUserOrders } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/create', createNewOrder);
orderRouter.get('/:userId', getUserOrders);

export default orderRouter;
