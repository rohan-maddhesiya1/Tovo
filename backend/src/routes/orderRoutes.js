import express from 'express';
import { createNewOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/create', createNewOrder);

export default orderRouter;
