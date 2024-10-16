// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/authRoutes');
const faceAnalysis = require('./routes/faceAnalysis');
const recommendationRoutes = require('./routes/recommendationRoutes');
// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's URL
  credentials: true,
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true })); 

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));



app.use('/api2/auth2', authRoutes);
app.use('/api2', faceAnalysis); 
app.use('/api2', recommendationRoutes);
// Test Route
app.get('/', (req, res) => {
  res.send("Welcome to the backend!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// app.get('/api2/auth2/profile', async (req, res) => {
//   try {
//       // Logic to get the user's profile data
//       const profileData = await getUserProfile(req.user.id); // Example function
//       res.json(profileData);
//   } catch (error) {
//       console.error('Error fetching profile data:', error);
//       res.status(500).json({ message: 'Internal Server Error' }); // Return JSON on error
//   }
// });

