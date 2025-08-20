import Order from '../models/order.js';
import User from '../models/user.js';
import DeliveryPartner from '../models/deliveryPartner.js';

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
        const partner = await DeliveryPartner.findOne({ status: "active" });
        if(partner) {
            setTimeout( async()=>{
                newOrder.deliveryPartner = partner.name;
                newOrder.status = "shipped";
                await newOrder.save();
            }, 10000);
        }
        
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
};


export const getUserOrders = async (req, res) => {
    const { userId } = req.params;
    try {
        const orders = await Order.find({ userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};

// export const addDeliveryPartner = async (req, res) => {
//     const { orderId, deliveryPartnerId } = req.body;
//     if (!orderId || !deliveryPartnerId) {
//         return res.status(400).json({ message: "Missing required fields" });
//     }

//     try {
//         const order = await Order.findById(orderId);
//         if (!order) {
//             return res.status(404).json({ message: "Order not found" });
//         }

//         order.deliveryPartner = deliveryPartnerId;
//         await order.save();

//         res.status(200).json(order);
//     } catch (error) {
//         res.status(500).json({ message: "Error adding delivery partner", error });
//     }
// };