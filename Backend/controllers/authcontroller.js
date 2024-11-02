const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');

// // Set your SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Sign up new user
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const trimmedEmail = email.trim();
        const existingUser = await User.findOne({ email: trimmedEmail });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });
        const newUser = new User({ name, email: trimmedEmail, password: password }); 
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, user: newUser });

    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Error signing up', error });
    }
};

// Sign in existing user
exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        console.log('Email:', trimmedEmail);
        console.log('Password:', trimmedPassword);

        // Check if user exists
        const user = await User.findOne({ email: trimmedEmail });
        if (!user) {
            console.log('User not found for email:', trimmedEmail);
            return res.status(400).json({ message: 'User not found' });
        }

        console.log('Stored hashed password:', user.password);
        console.log('Trimmed password input:', trimmedPassword);

        // Compare the password with the hashed password in the DB
        
        const isMatch = await bcrypt.compare(trimmedPassword, user.password);
        console.log('Password comparison result:', isMatch);

        if (!isMatch) {
            console.log('Password mismatch',trimmedEmail);
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Generate JWT token after successful authentication
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user });
        

    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ message: 'Error signing in', error });
    }
};

// Forgot password functionality
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const trimmedEmail = email.trim();
        const user = await User.findOne({ email: trimmedEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiry = Date.now() + 3600000; // Token expires in 1 hour

        await user.save();

        // Send reset email using SendGrid
        const resetLink = `https://my-app2-ubnu.onrender.com/reset-password/${resetToken}`;
        const msg = {
            to: user.email,
            from: process.env.EMAIL_SENDGRID, // Your verified sender email
            subject: 'Password Reset',
            text: `You requested a password reset. Click the link to reset: ${resetLink}`,
        };

        await sgMail.send(msg); // Send email
        res.json({ message: `Password reset link sent to: ${user.email}` });

    } catch (error) {
        console.error('Error in forgotPassword:', error.response ? error.response.body : error.message);
        res.status(500).json({ message: 'Error sending email', error: error.message });
    }
};

// Reset password functionality
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    console.log(`Received reset token: ${token}`); // Log the received token

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiry: { $gt: Date.now() } // Ensure token hasn't expired
        });

        if (!user) {
            console.log('Invalid or expired token');
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
        user.password = password.trim();
        await user.save();

        // Clear the reset token and expiry fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;

        

        // Send success response
        res.json({ message: 'Password reset successful. You can now log in with the new password.' });

    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

  