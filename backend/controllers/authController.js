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

const getUserIdByUsername = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id FROM users WHERE username = $1",
            [req.params.username]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ userId: result.rows[0].id });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const assignAdminRole = async (req, res) => {
    try {
        const { userId } = req.body;

        const result = await pool.query(
            "UPDATE users SET role = 'admin' WHERE id = $1 RETURNING *",
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            message: "User role updated to admin",
            user: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, username, email, role FROM users"
        );

        res.status(200).json(result.rows);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { loginPost, signupPost, getUserIdByUsername, assignAdminRole, getAllUsers };