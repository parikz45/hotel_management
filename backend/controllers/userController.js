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

module.exports = {
    loginPost,
    signupPost
};
