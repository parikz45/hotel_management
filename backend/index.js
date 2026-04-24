const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// ======================
// DB CONNECTION
// ======================
const pool = require("./config/db");

pool.query("SELECT NOW()")
  .then(() => console.log("PostgreSQL connected"))
  .catch(err => console.error("PostgreSQL connection error:", err));

// ======================
// CORS CONFIGURATION
// ======================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://deepseahotel.vercel.app",
  "https://hotel-management-zeta-livid.vercel.app"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    if (origin.includes('.vercel.app')) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "authorization"]
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// ======================
// BODY PARSERS
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// ROUTES
// ======================
const bookingsRoute = require('./routes/bookings');
const usersRoute = require('./routes/auth');
const reviewsRoute = require('./routes/reviews');
const roomsRoute = require('./routes/rooms');
const paymentsRoute = require('./routes/payments');
const bookingFlowRoute = require('./routes/bookingFlow');

app.use('/api/auth', usersRoute);
app.use('/api/bookings', bookingsRoute);
app.use('/api/reviews', reviewsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/payments', paymentsRoute);
app.use('/api/bookingFlow', bookingFlowRoute);

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 8000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
});