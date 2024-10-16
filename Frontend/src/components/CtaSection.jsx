import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import  Button  from './Button'
import { ChevronDown, Star, Upload, Zap, Droplet, Sparkles, Menu, X, Sun, Moon } from 'lucide-react'
import { BrowserRouter as Router, Routes, Route, Redirect ,useNavigate } from 'react-router-dom';

const CtaSection = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleGetStarted = () => {
    navigate('/pages/LoginScreen'); // Redirect to the login page
    };
  return (    
    <section className="py-24 bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <div className="container mx-auto px-6 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-8"
        >
          Ready to Transform Your Skincare Routine?
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-400 to-pink-600 text-white hover:from-purple-500 hover:to-pink-700 transition-all duration-300 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted} // Add onClick handler
          >
            Get Started Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
  export default CtaSection;