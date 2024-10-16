import React from 'react';

const AlertDescription = ({ children, className }) => {
  return (
    <div className={`p-4 rounded-md ${className}`}>
      {children}
    </div>
  );
};

export default AlertDescription;
