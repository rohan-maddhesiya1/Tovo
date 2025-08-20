import express from 'express';
import { activePartners } from '../controllers/deliveryPartnerController.js';


const deliveryPartnerRouter = express.Router();


deliveryPartnerRouter.get('/active', activePartners);

export default deliveryPartnerRouter;
