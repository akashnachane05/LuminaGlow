import React from 'react';
import { motion } from 'framer-motion';

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};

const Switch = ({ isOn, handleToggle }) => {
  return (
    <motion.div
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
        isOn ? 'bg-gray-400' : 'bg-gray-200'
      }`}
      onClick={handleToggle}
    >
      <motion.div
        className="bg-white w-4 h-4 rounded-full shadow-md"
        layout
        transition={spring}
        animate={{
          x: isOn ? 20 : 0, // Using 20px for a better toggle switch animation
        }}
      />
    </motion.div>
  );
};



export default Switch;
