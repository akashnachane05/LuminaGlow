const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT;
const authRoutes = require('./routes/authRoutes');
const faceAnalysis = require('./routes/faceAnalysis');
const recommendationRoutes = require('./routes/recommendationRoutes');

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(bodyParser.json());
app.use(cors({
  origin: "https://my-app2-ubnu.onrender.com", // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true,
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// API routes
app.use('/api2/auth2', authRoutes);
app.use('/api2', faceAnalysis); 
app.use('/api2', recommendationRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send("Welcome to the backend!");
});

// Static file serving for the React app
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing, return all requests to React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
