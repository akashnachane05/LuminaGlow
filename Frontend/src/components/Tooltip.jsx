// components/ui/tooltip.jsx
import React from 'react';

const Tooltip = ({ children, text }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm p-2 rounded shadow-lg">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
