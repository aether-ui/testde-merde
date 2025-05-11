import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  isScrolled: boolean;
}

const Logo: React.FC<LogoProps> = ({ isScrolled }) => {
  const textColorClass = isScrolled ? 'text-black' : 'text-black';
  
  return (
    <motion.div 
      className={`font-bold text-2xl flex items-center ${textColorClass}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <span className="font-black tracking-tighter">URBAN</span>
      <span className="text-yellow-500 font-black">X</span>
    </motion.div>
  );
};

export default Logo;