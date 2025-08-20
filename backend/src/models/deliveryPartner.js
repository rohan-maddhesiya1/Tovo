import mongoose from "mongoose";

const deliveryPartnerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
})

const DeliveryPartner = mongoose.model("deliveryPartners", deliveryPartnerSchema,"deliveryPartners");
export default DeliveryPartner;