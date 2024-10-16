import React from 'react';
import { Navigate } from 'react-router-dom';

// Define the ProtectedRoute to handle authentication
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if the token exists in localStorage

  return isAuthenticated ? children : <Navigate to="/pages/LoginScreen" replace />;
};

export default ProtectedRoute;
