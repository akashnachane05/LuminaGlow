import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Button from './Button';
import { ChevronDown, Star, Upload, Zap, Droplet, Sparkles, Menu, X, Sun, Moon } from 'lucide-react'
const TestimonialsSection = ({ staggerChildren, fadeInUp }) => {
    const testimonials = [
      { name: 'Sarah J.', comment: 'LuminaGlow completely transformed my skincare routine. The personalized recommendations were spot-on!', rating: 5 },
      { name: 'Mike T.', comment: 'I was skeptical at first, but the AI analysis was incredibly accurate. Highly recommend!', rating: 4 },
      { name: 'Emily R.', comment: 'The before and after comparisons are amazing. I can really see the difference in my skin.', rating: 5 },
    ]
  
    return (
      <section id="testimonials" className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12"
          >
            What Our Users Say
          </motion.h3>
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gradient-to-br from-white to-purple-100 dark:from-gray-700 dark:to-purple-900 rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{testimonial.comment}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{testimonial.name}</span>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    )
  }
  export default TestimonialsSection;
  