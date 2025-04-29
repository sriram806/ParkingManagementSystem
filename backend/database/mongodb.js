import mongoose from "mongoose";
import { NODE_ENV, DB_URI } from "../config/env.js";

// Check if DB_URI is defined in the environment variables
if (!DB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.<development/production>.local');
}

const connectToDatabase = async () => {
    try {
        // MongoDB connection options with increased timeouts for reliability
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // Increase the timeout to 30 seconds
            socketTimeoutMS: 45000, // Socket timeout for requests (in ms)
        };

        // Attempt to connect to the database
        await mongoose.connect(DB_URI, options);

        // Log success message with environment details
        console.log(`MongoDB connection successful in ${NODE_ENV} mode`);
        
    } catch (error) {
        // Log error message and exit process in case of failure
        console.error('Error connecting to database:', error.message || error);
        
        // Optional: You can log the stack trace for debugging in development
        if (NODE_ENV === 'development') {
            console.error(error.stack);
        }
        
        process.exit(1);  // Exit the process if the connection fails
    }
}

export default connectToDatabase;
