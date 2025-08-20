import DeliveryPartner from "../models/deliveryPartner.js";


export const activePartners = async (req, res) => {
    try {
        const partners = await DeliveryPartner.find({ status: "active" });
        res.status(200).json(partners);
    } catch (error) {
        res.status(500).json({ message: "Error fetching active partners", error });
    }
};
