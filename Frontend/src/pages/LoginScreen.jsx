import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { CardContent, CardFooter, CardHeader, CardTitle } from '../components/cards';
import { Sun, Moon } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import input from '../components/input';
import Label from '../components/label';
import Card from '../components/cards';
import { Link } from 'react-router-dom';
import Switch from '../components/Switch';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api2/auth2/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        // window.location.href = 'pages/Dashboard';
        navigate('/Dashboard');
      } else {
        console.error('Login failed:', data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div
      className={`min-h-screen flex transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-600' : 'bg-white'
      }`}
    >
      {/* Left side */}
      <div
        className={`w-1/3 flex items-start justify-start transition-all duration-300 ${
          isDarkMode ? 'bg-gray-600' : 'bg-white'
        }mt-10 ml-6`}
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex items-start justify-start mt-8 ml-10">
          <Sparkles className="w-8 h-8 mr-2 text-purple-500 dark:text-purple-400" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }} />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-300 dark:to-pink-500">
            LuminaGlow
          </span>
        </motion.div>
      </div>

      {/* Right side */}
      <div
        className={`w-2/3 flex flex-col items-center justify-center p-6 transition-all duration-300 ${
          isDarkMode
            ? 'bg-gradient-to-r from-gray-600 to-black'
            : 'bg-gradient-to-l from-pink-400 via-pink-300 to-white'
        }`}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
          <Card className={`${isDarkMode ? 'bg-gray-600' : 'bg-white'} shadow-lg rounded-lg`}>
            <CardHeader className="space-y-4 pb-6">
              <div className="flex justify-between items-center">
                <CardTitle className={`text-5xl font-extrabold ${isDarkMode ? 'text-black' : 'text-black'}`}>
                  Welcome back..!!
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

            {/* Wrap input fields inside a <form> element */}
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-8 pt-4">
                <div className="space-y-2 mb-4">
                  <Label className={`w-full ${isDarkMode ? 'text-white' : 'text-black'} py-2`}>Email</Label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full py-2 px-4 ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
                  />
                </div>

                <div className="space-y-2 mb-6">
                  <Label className={`w-full ${isDarkMode ? 'text-white' : 'text-black'} py-2`}>Password</Label>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`w-full py-2 px-4 ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
                  />
                </div>

                <div className="text-sm">
                  <Link to="/pages/ForgotPassword" className={`${isDarkMode ? 'text-black' : 'text-black'} hover:underline`}>
                    Forgot your password?
                  </Link>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 pt-6">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                  <Button type="submit" className={`w-full py-3 rounded-lg ${isDarkMode ? 'bg-gradient-to-r from-gray-400 to-black' : 'bg-gradient-to-l from-white-900 to-pink-700'}`}>
                    Sign In
                  </Button>
                </motion.div>
                <div className={`text-center text-sm ${isDarkMode ? 'text-black' : 'text-black'}`}>
                  Don't have an account?{' '}
                  <Link to="/pages/SignUp" className={`text-1xl font-bold ${isDarkMode ? 'text-black' : 'text-gray-900'} hover:underline`}>
                    Sign up
                  </Link>
                </div>
                {error && <p className="text-red-500">{error}</p>}
              </CardFooter>
            </form>
          </Card>
        </motion.div>
        <div className={`mt-8 text-center text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>© 2024 LuminaGlow Inc. All rights reserved.</div>
      </div>
    </div>
  );
}
