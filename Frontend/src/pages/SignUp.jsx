import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { CardContent, CardFooter, CardHeader, CardTitle } from '../components/cards';
import input from '../components/input';
import Label from '../components/label';
import { Sparkles } from 'lucide-react';
import { Sun, Moon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/cards';
import Switch from '../components/Switch'; // Assuming you have a Switch component for dark mode toggle
import { Loader } from 'lucide-react';
import { useAuth } from '../components/authContext';
const SignUp = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State for handling errors
  const [loading, setLoading] = useState(false); // Optional: Loading state
  const { setUserId } = useAuth()

  // Toggle the dark mode state and apply the class to HTML element
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log({ name, email, password }); // Log the input values
    setLoading(true); // Start loading
    setError(null); // Reset error state before making the request

    // Validate inputs
    if (!name || !email || !password) {
      setError('All fields are required.');
      setLoading(false);
      return; // Exit if validation fails
    }

    try {
      const response = await fetch('https://my-app2-ubnu.onrender.com/api2/auth2/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      console.log('Response from signup:', data); // Log the response data

      if (response.ok) {
        // After successful signup, navigate to the login screen  
         // Use data.token instead
        
        navigate('/pages/LoginScreen');
      } else {
        // Log the data to see what the error message is
        console.error('Error response from signup:', data);
        setError(data.message || 'Signup failed'); // Set error message
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setError('Something went wrong. Please try again.'); // Handle fetch error
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}>
      {/* Left side with distinct backgrounds for light and dark modes */}
      {/* Left side */}
      <div
        className={`w-1/3 flex flex-col items-center justify-start transition-all duration-300 gap-8 ${
          isDarkMode ? 'bg-gray-600' : 'bg-white'
        } mt-10 ml-4`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-start mb-6"
        >
          <Sparkles
            className="w-8 h-8 mr-2 text-purple-500 dark:text-purple-400"
            style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }}
          />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-300 dark:to-pink-500">
            LuminaGlow
          </span>
        </motion.div>
        
        {/* Circular Image 1 */}
      {/* Circular Image Layout */}
      <div className="relative w-full flex items-center justify-center">
        {/* Top Circle Image */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute w-56 h-56 rounded-full overflow-hidden shadow-lg -top-12 left-10"
        >
          <img
            src={require("../Images/Skinimage.jpg")}
            alt="Skincare products illustration"
            className="object-cover w-full h-full"
          />
        </motion.div>

        {/* Bottom Circle Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute w-56 h-56 rounded-full overflow-hidden shadow-lg top-20 right-10"
        >
          <img
            src={require("../Images/SkinImages2.jpg")}
            alt="Skincare routine illustration"
            className="object-cover w-full h-full"
          />
        </motion.div>
      </div>
    </div>

      {/* Right side with a more distinct gradient for both light and dark modes */}
      <div className={`w-2/3 flex flex-col items-center justify-center p-6 transition-all duration-300 ${isDarkMode ? 'bg-gradient-to-r from-gray-600 to-black' : 'bg-gradient-to-l from-pink-400 via-pink-300 to-white'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className={`${isDarkMode ? 'bg-gray-600' : 'bg-white'} shadow-lg rounded-lg`}>
            <CardHeader className="space-y-4 pb-6">
              <div className="flex justify-between items-center">
                <CardTitle className={`text-5xl font-extrabold ${isDarkMode ? 'text-gray-800' : 'text-gray-800'}`}>
                  Join LuminaGlow
                </CardTitle>
                <Switch
                  isOn={isDarkMode}
                  handleToggle={toggleDarkMode}
                  className="ml-4 cursor-pointer"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Switch>
              </div>
            </CardHeader>
            <form onSubmit={handleSignUp} className="space-y-6">
              <CardContent className="space-y-8 pt-4">
                {/* Full Name Input */}
                <div className="space-y-2 mb-4">
                  <Label htmlFor="name" className={`w-full ${isDarkMode ? 'text-white' : 'text-black'} py-2`}>
                    Name
                  </Label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name} // Set value to name state
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    className={`w-full py-2 px-4 ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2 mb-4">
                  <Label htmlFor="email" className={`w-full ${isDarkMode ? 'text-white' : 'text-black'} py-2`}>
                    Email
                  </Label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email} // Set value to email state
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className={`w-full py-2 px-4 ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-2 mb-6">
                  <Label htmlFor="password" className={`w-full ${isDarkMode ? 'text-white' : 'text-black'} py-2`}>
                    Password
                  </Label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={password} // Set value to password state
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className={`w-full py-2 px-4 ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
                  />
                </div>
              </CardContent>

              {/* Card Footer with Sign Up Button */}
              <CardFooter className="flex flex-col space-y-4 pt-6">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                  <Button
                    type="submit"
                    className={`w-full py-3 rounded-lg transition-all duration-300 ${isDarkMode ? 'bg-gradient-to-r from-gray-400 to-black' : 'bg-gradient-to-l from-white-400 to-pink-600 hover:from-white-500 hover:to-pink-700 text-black'}`}
                  >
                    {loading ? 'Signing Up...' : 'Sign Up'}
                  </Button>
                </motion.div>
                <div className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Already have an account?{' '}
                  <Link to="/pages/LoginScreen" className={`text-1xl font-bold ${isDarkMode ? 'text-black' : 'text-black'} hover:underline`}>
                    Sign in
                  </Link>
                </div>
                {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
              </CardFooter>
            </form>
          </Card>
        </motion.div>

        {/* Footer */}
        <div className={`mt-8 text-center text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>
          © 2024 LuminaGlow Inc. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default SignUp;
