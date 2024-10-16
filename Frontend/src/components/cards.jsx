import React from 'react';

const Card = ({ className, children }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => (
  <div className="mb-4">{children}</div>
);

export const CardTitle = ({ className, children }) => (
  <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>
);

export const CardDescription = ({ children }) => (
  <p className="text-gray-600">{children}</p>
);

export const CardContent = ({ children }) => (
  <div className="mb-4">{children}</div>
);

export const CardFooter = ({ className, children }) => (
  <div className={`flex flex-col ${className}`}>{children}</div>
);

export default Card;
