const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}
const loginPost = async (req, res) => {

    try {
        const { username, password } = req.body;
        const user = await User.login(username, password);
        const token = createToken(user._id);
        res.status(200).json({ username, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const signupPost = async (req, res) => {

    try {
        const { username, email, password, name, phone } = req.body;
        const user = await User.signup(username, email, password, name, phone);
        const token = createToken(user._id);
        res.status(201).json({ username, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const assignAdminRole = async (req, res) => {
    try {
        const { userId } = req.body;
        await User.findByIdAndUpdate(userId, { role: 'admin' });
        res.status(200).json({ message: 'User role updated to admin' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUserIdByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        if (user) {
            res.status(200).json({ userId: user._id });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    loginPost,
    signupPost,
    getUserIdByUsername,
    assignAdminRole
};
