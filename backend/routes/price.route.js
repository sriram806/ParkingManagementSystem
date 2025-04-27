import express from 'express';
import { getPricingSettings,updatePricingSettings } from '../controllers/pricing.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const pricingRoutes = express.Router();

pricingRoutes.use(authenticate);

pricingRoutes.get('/', authorize(['admin', 'guard']), getPricingSettings);
pricingRoutes.put('/', authorize(['admin']), updatePricingSettings);

export default pricingRoutes;