const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Create a token including role
const createToken = (user) => {
    return jwt.sign(
        { _id: user._id, role: user.role },  
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
};

// Login
const loginPost = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.login(username, password);

        const token = createToken(user);

        res.status(200).json({ 
            _id: user._id,
            username: user.username,
            role: user.role,
            token
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Signup
const signupPost = async (req, res) => {
    try {
        const { username, email, password, name, phone } = req.body;
        const user = await User.signup(username, email, password, name, phone);

        const token = createToken(user);

        res.status(201).json({ 
            _id: user._id,
            username: user.username,
            role: user.role,
            token
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Assign admin role
const assignAdminRole = async (req, res) => {
    try {
        const { userId } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { role: 'admin' },
            { new: true }
        );
        res.status(200).json({ message: 'User role updated to admin', updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get userId by username
const getUserIdByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ userId: user._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all users (for admin use)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    loginPost,
    signupPost,
    getUserIdByUsername,
    assignAdminRole,
    getAllUsers
};
