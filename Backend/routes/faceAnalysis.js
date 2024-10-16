// faceAnalysis.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();
const qs = require('qs'); // Import the querystring library
const API_KEY = process.env.FACE_API_KEY; // Store your API key in .env
const API_SECRET = process.env.FACE_API_SECRET; // Store your API secret in .env
const FACEPLUS_API_URL = 'https://api-us.faceplusplus.com/facepp/v1/skinanalyze'
router.post('/analyze', async (req, res) => {
    const { imageBase64 } = req.body; // Expecting base64 image data

    // Prepare the data to send in the request body
    const data = qs.stringify({
        api_key: API_KEY,
        api_secret: API_SECRET,
        image_base64: imageBase64,
    });

    try {
        const response = await axios.post(FACEPLUS_API_URL, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        console.log('Face++ API Response:', response.data);

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Face++ API Error:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            config: error.config,
        });
        res.status(500).json({ error: 'Failed to analyze image' });
    }
});

module.exports = router;