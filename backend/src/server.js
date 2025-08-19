import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartsRoutes.js';

const PORT = 3000;

const app = express();


app.use(express.json());
app.use(cors());
connectDB();


app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/carts', cartRouter);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});