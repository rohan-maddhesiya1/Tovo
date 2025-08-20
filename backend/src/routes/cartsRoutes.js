import express from 'express';
import { addToCart } from '../controllers/cartController.js';
import {getCartItems} from '../controllers/cartController.js';


const cartRouter = express.Router();

cartRouter.post('/add', addToCart);

cartRouter.get('/items', getCartItems);


export default cartRouter;