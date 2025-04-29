import express from 'express';
import morgan from 'morgan';
import { PORT } from './config/env.js';
import authRoutes from './routes/auth.route.js';
import vehicleRoutes from './routes/vehicles.route.js';
import guardRoutes from './routes/guard.route.js';
import pricingRoutes from './routes/price.route.js';
import statsRoutes from './routes/stats.route.js';
import connecttoDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';  // For CORS support

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://your-frontend-domain.vercel.app', 'http://localhost:5173']
        : 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/guards', guardRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/stats', statsRoutes);

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Parking Management System Backend');
});

// Error handler middleware
app.use(errorMiddleware);

// Start server
const port = PORT;
const server = app.listen(port, async () => {
    console.log(`✅ Server live on http://localhost:${port}`);
    
    try {
        await connecttoDatabase();
    } catch (error) {
        console.error('❌ Error connecting to database:', error.message);
    }
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('SIGINT received, closing server...');
    await server.close();
    console.log('Server closed gracefully');
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('SIGTERM received, closing server...');
    await server.close();
    console.log('Server closed gracefully');
    process.exit(0);
});

export default app;
