import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CursorProps {
  text?: string;
  variant?: 'default' | 'link' | 'hover';
}

const Cursor: React.FC<CursorProps> = ({ text = '', variant = 'default' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile device by screen width
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Track mouse position
  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  // Don't render cursor on mobile devices
  if (isMobile) return null;

  // Variants for the cursor
  const variants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      height: 24,
      width: 24,
      backgroundColor: "rgba(0, 0, 0, 0)",
      border: "2px solid #000",
      mixBlendMode: "difference" as const
    },
    link: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      height: 40,
      width: 40,
      backgroundColor: "rgba(255, 214, 0, 0.8)",
      mixBlendMode: "normal" as const
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      backgroundColor: "rgba(255, 214, 0, 0.4)",
      mixBlendMode: "normal" as const
    }
  };

  return (
    <motion.div
      className="cursor-dot fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center text-xs font-bold"
      variants={variants}
      animate={variant}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 300,
        mass: 0.5
      }}
    >
      {text && <span className="text-black">{String(text)}</span>}
    </motion.div>
  );
};

export default Cursor;