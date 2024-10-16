import React from 'react';

const Input = React.forwardRef(({ id, type, placeholder, className }, ref) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      ref={ref}
      className={`border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-purple-500 ${className}`}
    />
  );
});

Input.displayName = 'Input';

export default Input;
