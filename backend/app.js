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
import cors from 'cors';

const app = express();

// CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://sri-sangakumaran-parking.onrender.com',
      'https://sri-sangakumaran-parking.onrender.com/login',
      'http://localhost:5173'
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight requests
app.options('*', cors());

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files from the public directory
app.use(express.static('public'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/guards', guardRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/stats', statsRoutes);

// Home route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Parking Management System</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
      <style>
        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(to right, #667eea, #764ba2);
          color: #fff;
        }
        .container {
          text-align: center;
          background: rgba(0, 0, 0, 0.3);
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }
        p {
          font-size: 1.2rem;
          margin-top: 0;
        }
        .icon {
          font-size: 3rem;
          margin-bottom: 10px;
          color: #ffd700;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="icon">🚗</div>
        <h1>Parking Management System</h1>
        <p>Welcome! The backend is running successfully.</p>
      </div>
    </body>
    </html>
  `);
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
