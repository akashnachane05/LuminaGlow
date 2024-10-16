import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { CardContent, CardHeader, CardTitle } from '../components/cards';
import Card from '../components/cards';
import Textarea from '../components/TextArea';
import Label from '../components/label';
import { ArrowLeft, Sun, Moon,User ,Mail,Droplet } from 'lucide-react';
import axios from 'axios';
import input from '../components/input';
import Dashboard from './Dashboard';
const Profile = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    skinType: 'Combination',
    
  });



  useEffect(() => {
    const fetchProfileData = async () => {
      try {
       
        const response = await fetch('https://my-app2-ubnu.onrender.com/api2/auth2/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Use token stored in localStorage
          },
          
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); 
        // Set the profile data in state
        setProfileData(data);
        setRecommendations(data.recommendations); 
      } catch (error) {
        console.error('Error fetching profile:', error.response ? error.data : error.message);
      }
    };

    // Call the function to fetch profile data
    fetchProfileData();
  }, []);
  const storedPhoto = localStorage.getItem('userPhoto');
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
    const [userPhoto, setUserPhoto] = useState(null); // State to store the uploaded photo
  
    const handlePhotoUpload = (event) => {
      const file = event.target.files[0]; // Get the selected file
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUserPhoto(e.target.result); 
          localStorage.setItem('userPhoto', e.target.result);// Set the uploaded image to state for preview
        };
        reader.readAsDataURL(file); // Convert the file to base64
      }
    };
  

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-purple-900 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <Link to="/Dashboard" className="inline-flex items-center text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? (
                <Sun className="h-6 w-6 text-yellow-500" />
              ) : (
                <Moon className="h-6 w-6 text-gray-800" />
              )}
            </Button>
          </div>
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 animate-fade-in">Your Profile</h1>

            <Card className="mb-8 shadow-lg rounded-lg bg-white dark:bg-gray-800 transition-transform transform hover:scale-105 duration-300">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-purple-600 dark:text-purple-400">Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex items-center justify-center  dark:border-purple-500 transition-transform transform hover:scale-110 duration-300">
                            <img
                                src={userPhoto || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyb-20ihVRPmRieKEtuyFXoeqp6puC2yuHY7xUFjtCY9ukoNRj7MyQQHKf3Iu5UaGhERM&usqp=CAU"} // Use uploaded photo or placeholder
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <label className="mt-3 cursor-pointer">
                            <span className="text-blue-600 hover:underline transition duration-200">Change Photo</span>
                            <input
                                type="file"
                                accept="image/*"
                                className='hidden'
                                onChange={handlePhotoUpload} // Handle file upload
                            />
                        </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center space-x-2">
                            <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            <div className="flex-1">
                                <Label htmlFor="name">Name</Label>
                                <input
                                    id="name"
                                    name="name"
                                    value={profileData.name}
                                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 w-full"
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Mail className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            <div className="flex-1">
                                <Label htmlFor="email">Email</Label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={profileData.email}
                                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 w-full"
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Droplet className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            <div className="flex-1">
                                <Label htmlFor="skinType">Skin Type</Label>
                                <input
                                    id="skinType"
                                    name="skinType"
                                    value={profileData.skinType}
                                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 w-full"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            </div>


            <Card>
                <CardHeader>
                    <CardTitle>Your Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
    {recommendations.length > 0 ? (
        recommendations.map((recommendation, index) => (
            <div key={index} className="mb-6 border rounded-lg shadow-md bg-white dark:bg-gray-800 p-4 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-black-600 dark:text-black-400 mb-2">
                    {recommendation.condition.map(cond => `${cond.name} `).join(', ')}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                   
                  </p>
                </h3>
                <ul className="space-y-3">
                    {recommendation.products.map((product, prodIndex) => (
                        <li key={prodIndex} className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-md transition-transform transform hover:scale-105">
                            <div className="flex-1">
                                <a href={product.link} className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                    {product.title}
                                </a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating ? `⭐ ${product.rating}` : 'No rating'}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">{product.reviews ? `📝 ${product.reviews}` : 'No reviews'}</span>
                               
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        ))
    ) : (
        <p className="text-gray-600 dark:text-gray-400">No recommendations available.</p>
    )}
</CardContent>

            </Card>

        </div>
      </div>
    </div>
  );
};


export default Profile;
