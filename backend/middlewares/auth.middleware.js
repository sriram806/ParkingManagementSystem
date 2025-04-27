import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Middleware to authenticate user based on JWT token
export const authenticate = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1]; // Get the token from the header
        }

        // If no token is provided, return error
        if (!token) {
            return res.status(401).json({ message: 'Authentication required - No token' });
        }

        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch the user from the database using the decoded user id, excluding the password field
        const user = await User.findById(decoded.id).select('-password');
        
        // If user not found, return error
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Attach the user to the request object for further use in other routes
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        // Handle token expired error
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired. Please login again.' });
        }
        // Handle any other errors (invalid token, etc.)
        return res.status(401).json({ message: 'Invalid token', error: error.message });
    }
};

// Middleware to authorize users based on their roles
export const authorize = (roles = []) => {
    return (req, res, next) => {
        // If no roles are provided, the user is authorized to access the route
        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden - Unauthorized access' });
        }
        next(); // User has the necessary role, proceed to the next middleware or route handler
    };
};
