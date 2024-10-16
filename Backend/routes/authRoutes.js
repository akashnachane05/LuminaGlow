const express = require('express');
const { signup, signin,forgotPassword ,resetPassword } = require('../controllers/authcontroller');
const User = require('../models/User');
const verifyToken= require('../middlewares/authMiddleware');

const router = express.Router();
// Sign-up route
router.post('/signup', signup);
// Sign-in route
router.post('/signin', signin);
router.get('/profile',verifyToken,async(req,res)=>{
    try {
        const userId = req.user.id; // Get the user ID from the request
    
        // Find the user by ID and exclude the password
        const user = await User.findById(userId).select('-password');
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
       
    
        res.json(user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Server error' });
      }
    }
);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);


router.put('/profile', verifyToken, async (req, res) => {
    try {
      const { name, email } = req.body;
  
      // Ensure req.user.id is set correctly from verifyToken
      if (!req.user || !req.user.id) {
        return res.status(400).json({ message: 'User ID is missing from token.' });
      }
  
      // Update the user's profile using the user ID from the token
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { name, email,recommendations },
        { new: true, runValidators: true }, // Return the updated user and run validators
       
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
      const cleanedRecommendations = updatedUser.recommendations.map(rec => ({
        condition: rec.condition.filter((cond, index, self) =>
            index === self.findIndex((c) => c.name === cond.name)
        ),
        products: rec.products.filter((product, index, self) =>
            index === self.findIndex((p) => p.title === product.title)
        )
    }));
    updatedUser.recommendations = cleanedRecommendations;
  
      res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // router.get('/Dashboard', verifyToken, (req, res) => {
  //   res.json({ message: 'This is the dashboard', user: req.user });
  // });
  
  // // Protected route for result page
  // router.get('/result', verifyToken, (req, res) => {
  //   res.json({ message: 'This is the result page', user: req.user });
  // });
  
  // Protected route for profile page
  // router.get('/api/profile', verifyToken, (req, res) => {
  //   res.json({ message: 'This is the profile page', user: req.user });
  // });
  
  
module.exports = router;
