const User = require('../models/User');
const addRecommendation = async (req, res) => {
    const userId = req.user.id; // Access the user ID directly from req.user
    console.log('User ID from req.user:', userId); 

    const { recommendations } = req.body;
    if (!req.user || !req.user.id) {
        return res.status(400).json({ message: 'User ID is missing from token.' });
    }
    try {
        // Find user by ID
        const user = await User.findById(userId); // Use findById for ID lookups

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if recommendation already exists for the condition
        // const existingRecommendation = user.recommendations.find(
        //     (rec) => rec.condition === condition
        // );

        // if (existingRecommendation) {
        //     return res.status(400).json({ message: 'Recommendation already exists for this condition' });
        // }
        recommendations.forEach(rec => {
            user.recommendations.push(rec);
        });
       

        await user.save();

        res.status(201).json({ message: 'Recommendation added successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports = { addRecommendation };