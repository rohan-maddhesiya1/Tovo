import express from 'express';
import { getAllProducts } from '../controllers/productsController.js';

const productRouter = express.Router();

productRouter.get('/', getAllProducts);


export default productRouter;