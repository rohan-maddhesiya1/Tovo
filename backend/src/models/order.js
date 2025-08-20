import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items:[
        {
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            name:{
                type: String,
                required: true
            },
            actualPrice:{
                type: Number,
                required: true
            },
            discountPrice:{
                type: Number,
                required: true
            },
            quantity:{
                type: Number,
                required: true,
                min: 1
            },
        },
    ],
    totalAmount:{
        type: Number,
        required: true
    },
    time:{
        type: Date,
        default: Date.now
    },
    status:{
        type: String,
        enum: ["pending", "shipped", "delivered", "cancelled"],
        default: "pending"
    },
    deliveryPartner: {
        type: String,
        required: true
    }
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
