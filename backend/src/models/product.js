import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    actualPrice: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
    },
    size: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema, "products");

export default Product;