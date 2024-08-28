

const express = require('express');
const cors = require('cors');
const personRoutes = require('./routes/personRoutes');
const authRoutes = require('./routes/authRoutes');
const otpRoutes = require('./routes/otpRoutes');

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend's URL if different
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'], // Add other headers if needed
  credentials: true
};

app.use(cors(corsOptions)); // Apply CORS middleware

app.options('*', cors(corsOptions)); // Handle preflight requests

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.use('/api/persons', personRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);

module.exports = app; 
