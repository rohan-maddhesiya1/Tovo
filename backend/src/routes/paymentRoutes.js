import express from 'express';
import {createPayment} from '../controllers/paymentController.js';

const paymentRouter = express.Router();


paymentRouter.post('/create', createPayment )

export default paymentRouter;