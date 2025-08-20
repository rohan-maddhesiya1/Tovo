import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartsRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();


app.use(express.json());
app.use(cors());
connectDB();


app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/carts', cartRouter);


app.use(express.static(path.join(__dirname, '../../frontend')));
app.get('/' , (req,res)=>{
    res.sendFile(path.join(__dirname, '../../frontend/html/login.html'));
})



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});