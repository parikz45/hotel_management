const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();

// ======================
// CORS CONFIGURATION
// ======================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://deepseahotel.vercel.app"
];

// Apply CORS middleware
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "authorization"]
}));

// Handle preflight OPTIONS requests
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true,
  allowedHeaders: ["Content-Type", "authorization"]
}));

// ======================
// BODY PARSERS
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error("MongoDB connection error:", err));

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
