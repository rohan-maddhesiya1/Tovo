import express from 'express';

const productRouter = express.Router();


productRouter.get('/product',(req,res)=>{
    res.json(products);
})