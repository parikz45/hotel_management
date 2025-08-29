const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const reviewsRoute = require('./routes/Reviews');
const roomsRoute = require('./routes/Rooms');
const usersRoute = require('./routes/User');

app.use(cors());
app.use(express.json());

// Allowed Origins 
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    contentType: ["Content-Type", "authorization"]
}));

app.use("/api/users",usersRoute);  