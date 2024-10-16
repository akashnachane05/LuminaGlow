import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import  Button  from './Button'
import { ChevronDown, Star, Upload, Zap, Droplet, Sparkles, Menu, X, Sun, Moon } from 'lucide-react'
const HowItWorksSection = ({ staggerChildren, fadeInUp }) => {
    const steps = [
      { icon: <Upload className="w-12 h-12 text-purple-500" />, title: 'Upload Your Photo', description: 'Take a clear selfie or upload an existing photo.' },
      { icon: <Zap className="w-12 h-12 text-pink-500" />, title: 'AI Analysis', description: 'Our advanced AI analyzes your skin conditions.' },
      { icon: <Sparkles className="w-12 h-12 text-blue-500" />, title: 'Get Recommendations', description: 'Receive personalized skincare product suggestions.' },
    ]
  
    return (
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
        <div className="container mx-auto px-6">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12"
          >
            How It Works
          </motion.h3>
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex flex-col items-center text-center"
              >
                <motion.div
                  className="w-24 h-24 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mb-6 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {step.icon}
                </motion.div>
                <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{step.title}</h4>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    )
  }
  export default HowItWorksSection;