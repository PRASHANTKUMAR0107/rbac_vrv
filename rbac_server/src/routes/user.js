const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const User = require("../model/User");

module.exports = (app) => {
  // Helper function for error responses
  const handleError = (res, message, error) => {
    console.error(message, error);
    res.status(500).json({ message, error: error.message });
  };

  // Get Users
  app.get("/api/users", async (req, res) => {
    try {
      const users = await User.find(); // Retrieve all users
      res.status(200).json({ count: users.length, users }); // Include a count of users
    } catch (error) {
      handleError(res, "Failed to fetch users", error);
    }
  });

  // Add User
  app.post("/api/users", async (req, res) => {
    const { name, email, password, role, status } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      // Check if the email already exists in the database
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Hash password
      // const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new User({ name, email, password, role, status });
      const savedUser = await newUser.save();

      res.status(201).json(savedUser); // Return the full user object
    } catch (error) {
      handleError(res, "Failed to save user", error);
    }
  });

  // Delete User
  app.delete("/api/users/:id", async (req, res) => {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      handleError(res, "Failed to delete user", error);
    }
  });

  // Update User
  app.put("/api/users/:id", async (req, res) => {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const allowedUpdates = ["name", "email", "password", "role", "status"];
    const updates = Object.keys(req.body).reduce((acc, key) => {
      if (allowedUpdates.includes(key)) acc[key] = req.body[key];
      return acc;
    }, {});

    if (!Object.keys(updates).length) {
      return res.status(400).json({ error: "No valid fields provided for update" });
    }

    if (updates.status && !["Active", "Inactive"].includes(updates.status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    try {
      // Hash password if it is being updated
      // if (updates.password) {
      //   updates.password = await bcrypt.hash(updates.password, 10);
      // }

      const updatedUser = await User.findByIdAndUpdate(userId, updates, {
        new: true, // Return the updated user
        runValidators: true, // Ensure validation on update
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      handleError(res, "Failed to update user", error);
    }
  });
};
