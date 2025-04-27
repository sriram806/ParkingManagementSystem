import express from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';

const authRoutes = express.Router();

// Register route
authRoutes.post('/register', register);

// Login route
authRoutes.post('/login', login);

// Logout route
authRoutes.post('/logout', logout);

export default authRoutes;
