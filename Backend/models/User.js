const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const recommendationSchema = new mongoose.Schema({
    condition: [{name :"String",value:Number,confidence:Number}],
    products: [{
        title: { type:String, required: true },
        link: { type: String, required: true },
        rating: { type: String }, // Optional field
        reviews: { type: String }  // Optional field
    }], // Array of product objects
     // Add scanningDate here
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String, // Stores the reset token
    },
    resetPasswordExpiry: {
        type: Date, // Expiry time for the reset token
    },
    recommendations: [recommendationSchema],
    
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
