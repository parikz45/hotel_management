const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// ======================
// CORS CONFIGURATION
// ======================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://deepseahotel.vercel.app",
  "https://hotel-management-zeta-livid.vercel.app"
];

// More flexible CORS for production
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);

    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow any Vercel app URL
    if (origin.includes('.vercel.app')) {
      return callback(null, true);
    }

    // Block other origins
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "authorization"]
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight OPTIONS requests
app.options('*', cors(corsOptions));

// ======================
// BODY PARSERS
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// HEALTH CHECK ROUTE (for Render)
// ======================
app.get('/', (req, res) => {
  res.json({ message: 'Hotel Management API is running!', status: 'OK' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ======================
// REQUEST LOGGER (optional)
// ======================
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}' - body:`, req.body);
  next();
});

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
// MONGODB CONNECTION
// ======================
mongoose.connect(process.env.Mongo_Url, {
  useNewParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error("MongoDB connection error:", err));

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 8000;

// Use app.listen instead of http.createServer for Render
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
});
