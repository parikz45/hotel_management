const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const bcrypt = require('bcrypt');
const validator = require('validator');

const createToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
};

// LOGIN
const loginPost = async (req, res) => {
    try {
        const { username, password } = req.body;

        const result = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );

        const user = result.rows[0];
        if (!user) throw Error("Invalid username");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw Error("Invalid username or password");

        const token = createToken(user);

        res.status(200).json({
            id: user.id,
            username: user.username,
            role: user.role,
            token
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// SIGNUP
const signupPost = async (req, res) => {
    try {
        const { username, email, password, name, phone } = req.body;

        if (!validator.isEmail(email)) throw Error("Invalid email");

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (username, email, password, name, phone)
             VALUES ($1,$2,$3,$4,$5)
             RETURNING *`,
            [username, email, hashedPassword, name, phone]
        );

        const user = result.rows[0];
        const token = createToken(user);

        res.status(201).json({
            id: user.id,
            username: user.username,
            role: user.role,
            token
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { loginPost, signupPost };