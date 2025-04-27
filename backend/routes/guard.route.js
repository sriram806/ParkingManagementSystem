import express from 'express';
import { getGuards,createGuard,updateGuard,deleteGuard} from '../controllers/guards.controllers.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const guardRoutes = express.Router();

guardRoutes.use(authenticate);
guardRoutes.use(authorize(['admin']));

guardRoutes.get('/', getGuards);
guardRoutes.post('/', createGuard);
guardRoutes.put('/:id', updateGuard);
guardRoutes.delete('/:id', deleteGuard);

export default guardRoutes;