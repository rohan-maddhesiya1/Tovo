import Order from '../models/order.js';
import User from '../models/user.js';

export const createNewOrder = async (req, res) => {
    const { userId, items, totalAmount } = req.body;
    if (!userId || !items || !totalAmount) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {

        const newOrder = new Order({
            userId,
            items,
            totalAmount,
            time: Date.now(),
            status: "pending",
            deliveryPartner: "Not Assigned"
        });

        await Order.create(newOrder);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
};
