import React, { useState, useEffect, useRef} from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BrowserRouter as Router, Routes, Route, Redirect ,useNavigate } from 'react-router-dom';
import  Button  from './components/Button'
import { ChevronDown, Star, Upload, Zap, Droplet, Sparkles, Menu, X, Sun, Moon } from 'lucide-react'
import FeaturesSection from './components/FeatureSection'
import CtaSection from './components/CtaSection';
import HowItWorksSection from './components/HowItWorksSection'
import Footer from './components/Footer'
import TestimonialsSection from './components/TestimonialsSection'
import LoginScreen from './pages/LoginScreen';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Result from './pages/Result';
import PastScans from './pages/PastScans';
import { AuthProvider } from './components/authContext';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
const EnhancedHomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    // document.body.classList.toggle('dark', isDarkMode)
    if (inView) {
      controls.start('visible')
    }
    // localStorage.setItem('darkMode', isDarkMode)
  }, [controls, inView])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const toggleDarkMode = () => {
    
    setIsDarkMode(!isDarkMode)
    // In a real application, you would apply the dark mode class to the root element here
    
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 text-gray-800 dark:text-gray-200 overflow-hidden`}>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-10 backdrop-blur-md dark:bg-gray-800 dark:bg-opacity-10">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">LuminaGlow</h1>
            </motion.div>
            <div className="hidden md:flex space-x-6 items-center">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#how-it-works">How It Works</NavLink>
              <NavLink href="#testimonials">Testimonials</NavLink>
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
            <div className="md:hidden flex items-center">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="mr-2">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-4 space-y-4"
              >
                <NavLink href="#features" mobile>Features</NavLink>
                <NavLink href="#how-it-works" mobile>How It Works</NavLink>
                <NavLink href="#testimonials" mobile>Testimonials</NavLink>
                <Button variant="outline" className="w-full text-purple-600 border-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300 dark:text-purple-300 dark:border-purple-300 dark:hover:bg-purple-500 dark:hover:text-white">Sign In</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <main>
        <HeroSection isDarkMode={isDarkMode} />
        <FeaturesSection staggerChildren={staggerChildren} fadeInUp={fadeInUp} />
        <HowItWorksSection staggerChildren={staggerChildren} fadeInUp={fadeInUp} />
        <TestimonialsSection staggerChildren={staggerChildren} fadeInUp={fadeInUp} />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}

const NavLink = ({ href, children, mobile = false }) => (
  <motion.a
    href={href}
    className={`text-gray-800 hover:text-purple-600 transition-colors duration-300 dark:text-gray-200 dark:hover:text-purple-400 ${
      mobile ? 'block py-2' : ''
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.a>
)

const HeroSection = () => {
  const navigate = useNavigate();
  const handleGetStartedClick = () => {
    navigate('/pages/LoginScreen'); // Navigate to the 'Get Started' page
  };
  const controls = useAnimation()
  const bubbleRefs = useRef([])

  useEffect(() => {
    controls.start((i) => ({
      y: ["0%", "100%"],
      transition: {
        duration: 10 + i * 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    }))
  }, [controls])

  const createBubbles = (count) => {
    return Array.from({ length: count }, (_, i) => (
      <motion.circle
        key={i}
        ref={(el) => (bubbleRefs.current[i] = el)}
        cx={`${Math.random() * 100}%`}
        cy={`${Math.random() * 100}%`}
        r={`${Math.random() * 2 + 0.5}%`}
        fill="url(#bubble-gradient)"
        custom={i}
        animate={controls}
      />
    ))
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient id="bg-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#f3e7ff" />
              <stop offset="50%" stopColor="#e5ccff" />
              <stop offset="100%" stopColor="#d6b3ff" />
            </radialGradient>
            <radialGradient id="bubble-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="100" height="100" fill="url(#bg-gradient)" />
          {createBubbles(20)}
        </svg>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-10 bg-[url('https://v0.dev-public.vercel-storage.com/skin-texture-HkE7X2/skin-texture.jpg')] bg-cover bg-center opacity-5"
      />
      <div className="container mx-auto px-6 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h2
            className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Unveil Your <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Radiant Skin
            </span>
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-gray-1000 dark:text-gray-1000 mb-8 max-w-2xl mx-auto "
          
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Experience the future of skincare with LuminaGlow's AI-powered analysis and personalized recommendations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button size="lg" onClick={handleGetStartedClick} className="bg-gradient-to-r from-purple-400 to-pink-600 text-white hover:from-purple-500 hover:to-pink-700 transition-all duration-300 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105">
              Discover Your Glow
            </Button>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-10 h-10 text-gray-600 dark:text-gray-400 animate-bounce" />
      </motion.div>
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 md:w-48 md:h-48"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
          <path fill="#FF0066" d="M47.1,-57.7C59.9,-47.3,68.5,-31.5,72.5,-14.1C76.5,3.3,75.8,22.3,67.8,37.4C59.8,52.5,44.4,63.7,27.8,68.3C11.2,73,-6.6,71.1,-22.9,65.1C-39.2,59.1,-54,49,-63.4,34.8C-72.8,20.6,-76.8,2.3,-73.2,-14.3C-69.6,-30.9,-58.4,-45.8,-44.6,-55.9C-30.8,-66,-15.4,-71.3,0.9,-72.4C17.2,-73.5,34.3,-68.2,47.1,-57.7Z" transform="translate(100 100)" filter="url(#glow)" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-24 h-24 md:w-40 md:h-40"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -60, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
          <path fill="#00FFFF" d="M44.1,-52.4C57.5,-44.7,68.9,-31.5,73.4,-15.9C77.9,-0.3,75.5,17.7,67.1,32.1C58.7,46.5,44.3,57.3,28.5,63.3C12.7,69.3,-4.5,70.5,-20.6,66.2C-36.7,61.9,-51.8,52.1,-62.6,37.8C-73.4,23.5,-80,4.6,-77.4,-12.7C-74.8,-30,-63,-45.7,-48.4,-53.5C-33.8,-61.3,-16.9,-61.1,-0.6,-60.4C15.7,-59.7,31.3,-58.5,44.1,-52.4Z" transform="translate(100 100)" filter="url(#glow)" />
        </svg>
      </motion.div>
    </section>
  )
}
export default function App() {
  return (
    <AuthProvider>
    <Router>
      
      <Routes>
        <Route 
          path="/" 
          element={
                <EnhancedHomePage/>    
          } 
        />
        
      <Route path="pages/SignUp" element={<SignUp />} />
      <Route path="pages/LoginScreen" element={<LoginScreen />}/>
      <Route
          path="Profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      <Route path="/pages/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      <Route
          path="/Result"
          element={
            <ProtectedRoute>
              <Result/>
            </ProtectedRoute>
          }
        />
      <Route path="pages/PastScans"element={<PastScans/>}/>
      
    </Routes>
  </Router>
  </AuthProvider>
          
        
    
  );
}
