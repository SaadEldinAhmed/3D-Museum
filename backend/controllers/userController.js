// backend/controllers/userController.js

import User from '../models/User.js'; // ✅ Make sure User.js exists

// Get all users
export async function getAll(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (e) {
    console.error("❌ Error: can't find users", e);
    res.status(500).json({ message: "Server error" });
  }
}

// Create a new user
export async function createNew(req, res) {
  try {
    const { fullName, email, password } = req.body;

    const newUser = new User({ fullName, email, password }); // ✅ match field names
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error("❌ Error creating user", err);
    res.status(500).json({ message: 'Server error while creating user' });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error("❌ Login error", err);
    res.status(500).json({ message: "Server error during login" });
  }
}
export async function resetPassword(req, res) {
  try {
    console.log("👉 Reset request body:", req.body); // ✅ log incoming data

    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: 'Email and new password are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = newPassword; // 🔒 NOTE: You should hash the password before saving
    await user.save();

    console.log("✅ Password updated successfully for", email);
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error("❌ Error in resetPassword:", err); // Full error log
    res.status(500).json({ message: 'Server error while resetting password' });
  }
}


// Update a user by ID
export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("❌ Error updating user", err);
    res.status(500).json({ message: 'Error updating user' });
  }
}
