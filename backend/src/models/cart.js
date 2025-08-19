import mongoose from 'mongoose'

const cartItemSchema = mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    quantity: {
        type: Number,
        required: true
    }
})

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    items: [cartItemSchema],
    totalAmount: {
        type: Number,
        required: true
    }
})

const Cart = mongoose.model('cart', cartSchema)

export default Cart