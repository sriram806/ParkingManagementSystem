import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';

// Register a new user
export const register = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name, email, password, role, shift } = req.body;

        // Check if required fields are missing
        if (!name || !email || !password || !role) {
            const error = new Error('Missing required fields');
            error.statusCode = 400;
            throw error;
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error('Email already registered');
            error.statusCode = 400;
            throw error;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create(
            [{
                name,
                email,
                password: hashedPassword,
                role,
                shift: role === 'guard' ? shift : undefined
            }],
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: newUser[0],
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

// Login user
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      // Check if email exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Compare the password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          role: user.role,
          shift: user.shift,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );
  
      // Log successful login attempt
      console.log(`Login successful for email: ${email}`);
  
      res.json({ token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Login failed', error: error.message });
    }
  };

// Logout user (optional, frontend handles client-side token removal)
export const logout = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: 'User logged out successfully. Please remove token on client side.'
        });
    } catch (error) {
        next(error);
    }
};
