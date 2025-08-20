import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET
});


export const createPayment = async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const options = {
            amount: amount * 100,  // Convert to paise
            currency: currency,
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);
        res.status(201).json(order);
    } catch (error) {
        console.error("Error creating payment:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}