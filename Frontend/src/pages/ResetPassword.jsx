import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { CardContent, CardFooter, CardHeader, CardTitle } from '../components/cards';
import Card from '../components/cards';
import Button from '../components/Button';
import input from '../components/input';
import Label from '../components/label';
import { useNavigate, useParams } from 'react-router-dom';

export default function ResetPassword() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api2/auth2/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setError(null);
        setTimeout(() => navigate('/pages/LoginScreen'), 3000); // Redirect after success
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Left side */}
      <div className={`w-1/3 flex items-start justify-start transition-all duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} mt-10 ml-6`}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex items-start justify-start mt-8 ml-10">
          <Sparkles className="w-8 h-8 mr-2 text-purple-500 dark:text-purple-400" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }} />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-300 dark:to-pink-500">
            LuminaGlow
          </span>
        </motion.div>
      </div>

      {/* Right side */}
      <div className={`w-2/3 flex flex-col items-center justify-center p-6 transition-all duration-300 ${isDarkMode ? 'bg-gradient-to-r from-gray-900 to-black' : 'bg-gradient-to-l from-pink-400 via-pink-300 to-white'}`}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
          <Card className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-lg rounded-lg`}>
            <CardHeader className="space-y-4 pb-6">
              <div className="flex justify-between items-center">
                <CardTitle className={`text-4xl font-extrabold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Reset Password
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                  {isDarkMode ? <Moon className="h-6 w-6 text-gray-300" /> : <Sun className="h-6 w-6 text-gray-800" />}
                </Button>
              </div>
            </CardHeader>

            <form onSubmit={handleResetPassword}>
              <CardContent className="space-y-8 pt-4">
                {/* Optionally show success or error messages */}
                {success && <div className="text-green-500">{success}</div>}
                {error && <div className="text-red-500">{error}</div>}

                <div className="space-y-2 mb-4">
                  <Label htmlFor="password" className={`w-full ${isDarkMode ? 'text-white' : 'text-black'}`}>New Password</Label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full p-2 border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'} rounded`}
                    required
                  />
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 pt-6">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                  <Button type="submit" className={`w-full py-3 rounded-lg ${isDarkMode ? 'bg-gradient-to-r from-gray-400 to-black' : 'bg-gradient-to-l from-white-900 to-pink-700'}`}>
                    Reset Password
                  </Button>
                </motion.div>
                <div className={`text-center text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Remember your password?{' '}
                  <Link to="/pages/LoginScreen" className={`text-1xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} hover:underline`}>
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
        <div className={`mt-8 text-center text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>© 2024 LuminaGlow Inc. All rights reserved.</div>
      </div>
    </div>
  );
}
