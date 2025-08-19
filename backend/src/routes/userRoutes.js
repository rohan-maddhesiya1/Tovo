import express from 'express'
import { registerUser } from '../controllers/usersController.js';
import { loginUser } from '../controllers/usersController.js';


export const userRouter = express.Router();


userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);
