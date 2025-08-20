import express from 'express';
import { addToCart } from '../controllers/cartController.js';
import {getCartItems} from '../controllers/cartController.js';
import { deleteCartItems } from '../controllers/cartController.js';
// import { updateCartItems } from '../controllers/cartController.js';


const cartRouter = express.Router();

cartRouter.post('/add', addToCart);

cartRouter.get('/items/:userId', getCartItems);

cartRouter.delete('/items/:cartId', deleteCartItems);

// cartRouter.put('/items/:userId', updateCartItems);


export default cartRouter;