const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();

// Routes
const bookingsRoute = require('./routes/bookings');
const usersRoute = require('./routes/auth');
const reviewsRoute = require('./routes/reviews');
const roomsRoute = require('./routes/rooms');
const paymentsRoute = require('./routes/payments');
const bookingFlowRoute = require('./routes/bookingFlow');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://deepseahotel.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "authorization"]
}));

// Logging requests (optional but useful for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}' - body:`, req.body);
  next();
});

// MongoDB connection
mongoose.connect(process.env.Mongo_Url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error("MongoDB connection error:", err));

// Routes (after middleware)
app.use('/api/auth', usersRoute);
app.use('/api/bookings', bookingsRoute);
app.use('/api/reviews', reviewsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/payments', paymentsRoute);
app.use('/api/bookingFlow', bookingFlowRoute);

// Start server
const PORT = process.env.PORT || 8000;  // dynamic port for Sevalla
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
