import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'guard'],
        required: true,
    },
    shift: {
        type: String,
        enum: ['day', 'night'],
        required: function() {
            return this.role === 'guard'; // Only guards have a shift
        }
    }
}, {
    timestamps: true
});

// Add method to compare password
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);

export default User;
