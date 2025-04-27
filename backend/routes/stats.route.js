import express from 'express';
import { getDashboardStats } from '../controllers/stats.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const statsRoutes = express.Router();

statsRoutes.use(authenticate);
statsRoutes.use(authorize(['admin']));

statsRoutes.get('/dashboard', getDashboardStats);

export default statsRoutes;