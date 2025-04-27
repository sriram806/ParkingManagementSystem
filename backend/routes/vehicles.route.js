import express from 'express';
import { getVehicles, getActiveVehicles, getVehicleByNumber, createVehicleEntry, processVehicleExit } from '../controllers/vehicle.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const vehicleRoutes = express.Router();  // Correctly defined router

// Apply the authenticate middleware to all routes in this file
vehicleRoutes.use(authenticate);

// Define the routes
vehicleRoutes.get('/', authorize(['admin']), getVehicles);
vehicleRoutes.get('/active', authorize(['admin', 'guard']), getActiveVehicles);
vehicleRoutes.get('/:vehicleNumber', authorize(['admin', 'guard']), getVehicleByNumber);
vehicleRoutes.post('/', authorize(['guard']), createVehicleEntry);
vehicleRoutes.put('/:id/exit', authorize(['guard']), processVehicleExit);

export default vehicleRoutes;  // Export the correct router
