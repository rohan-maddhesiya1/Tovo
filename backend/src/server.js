import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import Product from './models/product.js';

const PORT = 3000;

const app = express();


app.use(express.json());
app.use(cors());
connectDB();

app.get('/api/products',async (req,res)=>{
    const products = await Product.find();
    res.json(products);
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});