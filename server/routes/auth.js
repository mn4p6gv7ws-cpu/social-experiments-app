// server/routes/auth.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model defined

// Register endpoint for user signup
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'User registration failed.' });
    }
});

// Login endpoint for authentication with JWT token generation
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) { // Simplified for demonstration purposes
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret'); // Use a secure secret in production
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed.' });
    }
});

// Logout endpoint
router.post('/logout', (req, res) => {
    // Invalidate the token on client-side or use a blacklist strategy
    res.status(200).json({ message: 'Logged out successfully.' });
});

// Get current user endpoint
router.get('/current', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided.' });
    jwt.verify(token, 'your_jwt_secret', async (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Unauthorized.' });
        const user = await User.findById(decoded.id);
        res.status(200).json(user);
    });
});

module.exports = router;