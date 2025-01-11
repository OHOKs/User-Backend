const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { todos: true },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { todos: true },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Create a new user
const createUser = async (req, res) => {
  console.log("Request body:", req.body); // Log the body
  const { name, email } = req.body;
  try {
      const newUser = await prisma.user.create({
          data: {
              name,
              email,
          },
      });
      res.status(201).json(newUser);
  } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user", details: error.message });
  }
};





// Delete a user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params; // Get user ID from request parameters
  try {
      const deletedUser = await prisma.user.delete({
          where: { id: Number(id) }, // Ensure the ID is a number
      });
      res.status(200).json({ message: `User with ID ${id} deleted successfully`, deletedUser });
  } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Failed to delete user", details: error.message });
  }
};

// Other functions (createUser, getAllUsers, getUserById) remain unchange
module.exports = { createUser, getAllUsers, getUserById, deleteUser };