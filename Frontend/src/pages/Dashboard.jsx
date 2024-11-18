import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import { CardContent, CardHeader, CardTitle } from '../components/cards';
import Card from '../components/cards';
import { Sparkles, Sun, Moon, Menu, Camera, Upload, User, Clock, ChevronRight, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Progress from '../components/Progress';
import Alert from '../components/Alert';
import { AlertCircle } from 'lucide-react';
import AlertDescription from  '../components/AlertDescription';
export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [stream, setStream] = useState(null)
  const [scanningDate, setScanningDate] = useState(null)
  const [faceDetected, setFaceDetected] = useState(false)
  const [lighting, setLighting] = useState('poor')
  const [facePosition, setFacePosition] = useState('outside')
  const [lookStraight, setLookStraight] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [scanPhase, setScanPhase] = useState(0)
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null) // Added state for uploaded image URL
  const [activeTab, setActiveTab] = useState('analysis');
  
  const [retryUpload, setRetryUpload] = useState(false);
  const [faceScanError, setFaceScanError] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const startScan = async () => {
    if (isScanning || stream) return
    setIsScanning(false)
    setProgress(0)
    setScanPhase(0)
    setFaceDetected(false)
    setLighting('poor')
    setFacePosition('outside')
    setLookStraight(false)
    setShowError(false)
    setErrorMessage('')
    setIsComplete(false)
    setUploadedImageUrl(null) // Reset uploadedImageUrl
    try {
      const currentDate = new Date().toISOString()
      setScanningDate(currentDate)
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        await videoRef.current.play()
        startFaceDetection()
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      setErrorMessage('Unable to access the camera. Please check permissions and try again.')
      setShowError(true)
    }
  }
  const startFaceDetection = () => {
    let detectionCount = 0
    let noFaceCount = 0
    const maxNoFaceAttempts = 10
    const checkFace = setInterval(() => {
      const isDetected = Math.random() > 0.3 // Simulate face detection (replace with actual face detection logic)
      setFaceDetected(isDetected)
      if (isDetected) {
        detectionCount++
        noFaceCount = 0
        setLighting(Math.random() > 0.7 ? 'poor' : 'good')
        setFacePosition(Math.random() > 0.7 ? 'almost' : 'good')
        setLookStraight(Math.random() > 0.2)
        setShowError(false)
        
        if (detectionCount >= 3) {
          clearInterval(checkFace)
          setIsScanning(true)
          simulateProgress()
        }
      } else {
        noFaceCount++
        detectionCount = 0
        setErrorMessage('No face detected. Please adjust your position.')
        setShowError(true)
      }
      if (noFaceCount >= maxNoFaceAttempts) {
        clearInterval(checkFace)
        setErrorMessage('Face detection failed. Please try again or ensure proper lighting.')
        setShowError(true)
        stopCamera()
      }
    }, 1000)
  }
  const simulateProgress = () => {
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 1
      setProgress(currentProgress)
      
      if (currentProgress < 25) setScanPhase(1)
      else if (currentProgress < 50) setScanPhase(2)
      else if (currentProgress < 75) setScanPhase(3)
      else setScanPhase(4)

      if (currentProgress >= 100) {
        clearInterval(interval)
        setIsComplete(true)
        setIsScanning(false)
        setShowError(false)
      }
    }, 50)
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 80 * 1024) {
      setErrorMessage('File size exceeds 80 KB. Please choose a smaller file.');
      setShowError(true); // Show error for file size issue
      setImageUploadError(true); // Set error flag for image upload
      setIsUploading(false); // Stop the upload process
        return
      }
      setIsUploading(true)
      setProgress(0)
      
      // Create and set the URL for the uploaded image
      const imageUrl = URL.createObjectURL(file)
      setUploadedImageUrl(imageUrl)

      simulateProgress()

      const reader = new FileReader()
      reader.onload = async (e) => {
        const imageBase64 = e.target.result.split(',')[1]
        await sendImageToServer(imageBase64)
      }
      reader.readAsDataURL(file)
    }
  }

  const sendImageToServer = async (imageBase64) => {
    // Implement your server communication logic here
    try {
      const response = await fetch('https://my-app2-ubnu.onrender.com/api2/analyze', {
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

    console.log('Sending image to server:', imageBase64.substring(0, 50) + '...')
  }

  const viewResults =  async ()  => {
    // Implement your results viewing logic here
    if (stream) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageBase64 = canvas.toDataURL('image/jpeg', 0.5).split(',')[1];
      await sendImageToServer(imageBase64);
    }

    console.log('Viewing results')
    // For demonstration purposes, we'll just reset the state
    stopCamera()
    setIsScanning(false)
    setIsUploading(false)
    setProgress(0)
    setScanPhase(0)
    setIsComplete(false)
    setErrorMessage('')
    setFaceDetected(false)
    setLighting('poor')
    setFacePosition('outside')
    setLookStraight(false)
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
  }

  const retryFaceScan = () => {
    setShowError(false); // Hide error message
    setErrorMessage(''); // Clear error message
    setFaceScanError(false); // Reset face scan error state
    stopCamera(); // Stop the camera to reset face detection
    startScan(); // Restart the scan
  };
  
  const handleFaceScanError = () => {
    setErrorMessage('No face detected. Please try again.');
    setShowError(true); // Show error message for face scan
    setFaceScanError(true); // Set error flag for face scan
  };
  const retryImageUpload = () => {
    setShowError(false); // Hide error message
    setUploadedImageUrl(null); // Reset the uploaded image URL
    setProgress(0); // Reset progress
    setIsUploading(false); // Reset upload state
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
      stopCamera()
      if (uploadedImageUrl) {
        URL.revokeObjectURL(uploadedImageUrl)
      }
    }
  }, [uploadedImageUrl])
  return (
    <div className={`min-h-screen  ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md">
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
                  className="p-2 rounded-full bg-white/20 dark:bg-gray-700"
                >
                  <LogOut className="w-6 w-6 text-gray-800 dark:text-gray-200" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-white/20 dark:bg-gray-700"
                >
                  {isDarkMode ? (
                    <Sun className="h-6 w-6 text-gray-800 dark:text-gray-200" />
                  ) : (
                    <Moon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
                  )}
                </motion.button>
              </div>
            </div>
          </nav>
        </header>
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
        <main className="pt-24 px-4 md:pl-4 pb-16 container mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">AI Skin Analysis</h1>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Face Mapping</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-4 mb-4">
                <div className={`px-4 py-1 rounded-full text-sm font-medium ${lighting === 'good' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  LIGHTING
                </div>
                <div className={`px-4 py-1 rounded-full text-sm font-medium ${facePosition === 'good' ? 'bg-green-500 text-white' : facePosition === 'almost' ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'}`}>
                  FACE POSITION
                </div>
                <div className={`px-4 py-1 rounded-full text-sm font-medium ${lookStraight ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  LOOK STRAIGHT
                </div>
              </div>
              <div className="relative aspect-square w-80 mx-auto bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-full overflow-hidden">
                {uploadedImageUrl ? (
                  <img
                    src={uploadedImageUrl}
                    alt="Uploaded skin"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      playsInline
                      muted
                    />
                    <canvas
                      ref={canvasRef}
                      className="absolute inset-0 w-full h-full"
                      width={320}
                      height={320}
                    />
                  </>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  {!isScanning && !isUploading && !isComplete && !showError && (
                    <div className="flex flex-col items-center space-y-4">
                      <Button onClick={startScan} size="lg" className="flex items-center px-6 py-4 text-lg">
                        <Camera className="w-6 h-6 mr-2" />
                        Start Face Scan
                      </Button>
                      <p className="text-center text-gray-600 dark:text-gray-400">or</p>
                      <Button
                        onClick={() => document.getElementById('fileInput').click()}
                        size="lg"
                        className="flex items-center px-6 py-4 text-lg"
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
                  {isScanning && !isComplete && !showError && (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-black/50">
                      <p className="text-lg font-semibold text-white mb-4">
                        Analyzing your skin...
                      </p>
                      <div className="w-3/4 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 transition-all duration-200 ease-in-out" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  {isUploading && !isComplete && !showError && (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-black/50">
                      <p className="text-lg font-semibold text-white mb-4">
                        Uploading and analyzing your image...
                      </p>
                      <div className="w-3/4 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 transition-all duration-200 ease-in-out" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  {isComplete && !showError && (
                    <div className="w-full h-full flex items-center justify-center bg-black/50">
                      <Button onClick={viewResults} size="lg" className="px-6 py-4 text-lg">
                        View Results
                      </Button>
                    </div>
                  )}
                  {showError && (
                  <div className="error-message">
                    <p>{errorMessage}</p>
                    {/* Conditional retry buttons */}
                    {imageUploadError && (
                      <button onClick={retryImageUpload}>Retry Image Upload</button>
                    )}
                    {faceScanError && (
                      <button onClick={retryFaceScan}>Retry Face Scan</button>
                    )}
                  </div>
                )}

                </div>
              </div>

              {(isScanning || isUploading) && !isComplete && !showError && (
                <div className="mt-4 flex  justify-center items-center space-x-4">
                  {[1, 2, 3, 4].map((phase) => (
                    <div
                      key={phase}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        phase <= scanPhase ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {phase}
                    </div>
                  ))}
                </div>
              )}

              <AnimatePresence>
                {showError && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-4"
                  >
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
                Instructions: Position your face within the circle. Ensure good lighting for best results. 
                For uploads, please use images under 80 KB in size.
              </p>
              
            </CardContent>
          </Card>

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
        </main>
      </div>
    </div>
  )
}

function SidebarItem({ icon, label, onClick }) {
  return (
    <motion.li whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
      <button
        onClick={onClick}
        className="flex items-center w-full p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        {icon}
        <span className="ml-3">{label}</span>
        <ChevronRight className="w-4 h-4 ml-auto" />
      </button>
    </motion.li>
  )
}