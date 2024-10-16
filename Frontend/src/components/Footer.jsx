import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import  Button  from './Button'
import { ChevronDown, Star, Upload, Zap, Droplet, Sparkles, Menu, X, Sun, Moon } from 'lucide-react'
const Footer = () => (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">LuminaGlow</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Powered by advanced AI technology</p>
          </div>
          <div className="flex space-x-6">
            <motion.a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Contact Us
            </motion.a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} LuminaGlow. All rights reserved.
        </div>
      </div>
    </footer>
  )
  export default Footer;