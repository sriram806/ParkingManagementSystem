import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

// Get all guards
export const getGuards = async (req, res) => {
  try {
    const guards = await User.find({ role: 'guard' }).select('-password');
    if (guards.length === 0) {
      return res.status(404).json({ message: 'No guards found' });
    }
    res.json(guards);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: 'Error fetching guards' });
  }
};

// Create a new guard
export const createGuard = async (req, res) => {
  try {
    const { name, email, password, shift } = req.body;

    // Validate input
    if (!name || !email || !password || !shift) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the email already exists
    const existingGuard = await User.findOne({ email });
    if (existingGuard) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new guard
    const guard = new User({
      name,
      email,
      password: hashedPassword,
      role: 'guard',
      shift,
    });

    await guard.save();
    res.status(201).json({ message: 'Guard created successfully' });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: 'Error creating guard' });
  }
};

// Update guard information (including password)
export const updateGuard = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, shift, status, currentPassword, newPassword } = req.body;

    // Validate input
    if (!name || !email || !shift) {
      return res.status(400).json({ message: 'Name, email, and shift are required' });
    }

    // Find the guard to update
    const guard = await User.findById(id);
    if (!guard) {
      return res.status(404).json({ message: 'Guard not found' });
    }

    // Check if the email is different, and if so, ensure it's unique
    if (email !== guard.email) {
      const existingGuard = await User.findOne({ email });
      if (existingGuard) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    // If a new password is provided, verify the current password
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: 'Current password is required to change password' });
      }

      // Compare current password with the stored one
      const isMatch = await bcrypt.compare(currentPassword, guard.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      guard.password = await bcrypt.hash(newPassword, salt);
    }

    // Update other details
    guard.name = name;
    guard.email = email;
    guard.shift = shift;
    guard.status = status || guard.status; // Keep the previous status if not updated

    await guard.save();
    res.json({ message: 'Guard updated successfully' });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: 'Error updating guard' });
  }
};

// Delete a guard
// Delete a guard
export const deleteGuard = async (req, res) => {
  try {
    const { id } = req.params; // Get the guard ID from the request parameters

    // Check if the guard exists before deleting
    const guard = await User.findById(id); // Use the User model here, not Guard
    if (!guard) {
      return res.status(404).json({ message: 'Guard not found' });
    }

    // Delete the guard
    await User.findByIdAndDelete(id); // Use the User model here as well
    res.json({ message: 'Guard deleted successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error deleting guard' });
  }
};
