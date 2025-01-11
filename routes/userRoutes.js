const express = require('express');
const { createUser, getAllUsers, getUserById, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.post('/users', createUser); // Create a new user
router.get('/users', getAllUsers); // Get all users
router.get('/users/:id', getUserById); // Get a user by ID
router.delete('/users/:id', deleteUser); // Delete a user by ID

module.exports = router;
