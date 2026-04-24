const pool = require('../config/db');

const requireAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const result = await pool.query(
        "SELECT id, username, role FROM users WHERE id=$1",
        [decoded.id]
    );

    req.user = result.rows[0];
    next();
};

module.exports = requireAuth;