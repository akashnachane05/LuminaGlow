import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import  Button  from './Button'
import { ChevronDown, Star, Upload, Zap, Droplet, Sparkles, Menu, X, Sun, Moon } from 'lucide-react'
const FeaturesSection = ({ staggerChildren, fadeInUp }) => {
    const features = [
      { icon: <Zap className="w-10 h-10 text-purple-500" />, title: 'AI-Powered Analysis', description: 'Advanced image processing to detect various skin conditions.' },
      { icon: <Star className="w-10 h-10 text-pink-500" />, title: 'Personalized Recommendations', description: 'Get tailored product suggestions based on your unique skin profile.' },
      { icon: <Upload className="w-10 h-10 text-blue-500" />, title: 'Easy Image Upload', description: 'Quickly upload your skin photos for instant analysis and results.' },
    ]
  
    return (
      <section id="features" className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12"
          >
            Key Features
          </motion.h3>
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gradient-to-br from-white to-pink-100 dark:from-gray-700 dark:to-purple-900 rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <motion.div
                  className="flex items-center justify-center mb-6"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">{feature.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    )
  }
  export default FeaturesSection;