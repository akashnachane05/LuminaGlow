const express = require('express');
const { addRecommendation } = require('../controllers/recommendationController');
const verifyToken = require('../middlewares/authMiddleware'); // Import the authentication middleware

const router = express.Router();

// Route for adding product recommendations with authentication
router.post('/recommendations', verifyToken, addRecommendation); // Add verifyToken middleware

module.exports = router;
