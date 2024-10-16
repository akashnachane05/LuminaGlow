import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import { CardContent, CardHeader, CardTitle } from '../components/cards';
import Card from '../components/cards';
import { Sparkles, Sun, Moon, Menu, Camera, Upload, User, Clock, ChevronRight, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Progress from '../components/Progress';

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('analysis');
  const [isScanning, setIsScanning] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [stream, setStream] = useState(null);
  const [scanningDate, setScanningDate] = useState(null); // State to store scanning date

  
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const startScan = async () => {
    if (isScanning || stream) return;
    try {
      const currentDate = new Date().toISOString(); // Format as ISO string for consistency
      setScanningDate(currentDate); // Store scanning date

      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
      setIsScanning(true);
      simulateProgress();
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      setProgress(0);
      simulateProgress();

      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageBase64 = e.target.result.split(',')[1];
        await sendImageToServer(imageBase64);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateProgress = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsComplete(true);
        setIsScanning(false);
        setIsUploading(false);
      }
    }, 200);
  };

  const sendImageToServer = async (imageBase64) => {
    try {
      const response = await fetch('http://localhost:5000/api2/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64,scanningDate }),
      });

      if (!response.ok) throw new Error('Failed to analyze image');

      const result = await response.json();
      console.log('Analysis Result:', result);
      navigate('/Result', { state: { analysisResult: result ,scanningDate} });
    } catch (error) {
      console.error('Error analyzing image:', error);
      setIsComplete(false);
    }
  };

  const viewResults = async () => {
    if (stream) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageBase64 = canvas.toDataURL('image/jpeg', 0.5).split(',')[1];
      await sendImageToServer(imageBase64);
    }
  };

  
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    window.location.href = 'pages/LoginScreen'; // Redirect to login page
  };
  
  const handleTabClick = (tab) => {
    
    setActiveTab(tab);
    if (tab === 'profile') navigate('/Profile');
   
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 min-h-screen" >
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-10 backdrop-blur-md dark:bg-gray-800 dark:bg-opacity-30">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center"
              >
                <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
                  <Menu className="h-6 w-6" />
                </Button>
                <a href="/" className="flex items-center">
                  <Sparkles className="w-8 h-8 mr-2 text-purple-500 dark:text-purple-400" />
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-300 dark:to-pink-500">
                    LuminaGlow
                  </span>
                </a>
              </motion.div>
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="p-2 rounded-full bg-white bg-opacity-20 dark:bg-gray-700"
                >
                  <LogOut className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-white bg-opacity-20 dark:bg-gray-700"
                >
                  {isDarkMode ? (
                    <Sun className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                  ) : (
                    <Moon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                  )}
                </motion.button>
              </div>
            </div>
          </nav>
        </header>

        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-40 pt-20"
            >
              <nav className="p-4">
                <ul className="space-y-2">
                 
                
                  <SidebarItem icon={<User />} label="Profile" isActive={activeTab === 'profile'} onClick={() => handleTabClick('profile')} />
                  <SidebarItem icon={<LogOut />} label="Log Out" onClick={handleLogout} />
                </ul>
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="pt-24 px-4 md:pl-4 pb-16">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">AI Skin Analysis</h1>
            
            {/* Face Mapping Interface */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Face Mapping</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    playsInline
                    muted
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {!isScanning && !isUploading && !isComplete && (
                      <div className="flex flex-col items-center space-y-4">
                        <Button onClick={startScan} size="lg" className="flex items-center px-8 py-6 text-lg">
                          <Camera className="w-6 h-6 mr-2" />
                          Start Face Scan
                        </Button>
                        <p className="text-center text-gray-600 dark:text-gray-400">or</p>
                        <Button
                          onClick={() => document.getElementById('fileInput').click()}
                          size="lg"
                          className="flex items-center px-8 py-6 text-lg"
                        >
                          <Upload className="w-6 h-6 mr-2" />
                          Upload Image
                        </Button>
                        <input
                          id="fileInput"
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </div>
                    )}
                    {(isScanning || isUploading) && (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
                        <p className="mb-4 text-lg font-semibold">
                          {isScanning ? 'Analyzing your skin...' : 'Uploading and analyzing your image...'}
                        </p>
                        <Progress value={progress} className="w-64 h-4" />
                        <p className="mt-2">{progress}%</p>
                      </div>
                    )}
                    {isComplete && (
                      <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                        <Button onClick={viewResults} size="lg" className="px-8 py-6 text-lg">
                          View Results
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skin Health Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Skin Health Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center p-2 bg-gray-100 dark:bg-gray-700 rounded">
                    <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                    <span>Stay hydrated by drinking plenty of water throughout the day.</span>
                  </li>
                  <li className="flex items-center p-2 bg-gray-100 dark:bg-gray-700 rounded">
                    <Sun className="w-4 h-4 mr-2 text-yellow-500" />
                    <span>Always apply sunscreen, even on cloudy days, to protect your skin from UV damage.</span>
                  </li>
                  <li className="flex items-center p-2 bg-gray-100 dark:bg-gray-700 rounded">
                    <Moon className="w-4 h-4 mr-2 text-blue-500" />
                    <span>Get enough sleep to allow your skin time to repair and regenerate.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, isActive, onClick }) {
  return (
    <motion.li whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
      <button
        onClick={onClick}
        className={`flex items-center w-full p-2 rounded-lg ${
          isActive
            ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
        }`}
      >
        {icon}
        <span className="ml-3">{label}</span>
        <ChevronRight className="w-4 h-4 ml-auto" />
      </button>
    </motion.li>
  );
}