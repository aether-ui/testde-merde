import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cursor from '../components/ui/Cursor';

const Layout: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Cursor text={cursorText} variant={cursorVariant} />
      
      <Header isScrolled={isScrolled} 
        onEnterLink={() => {
          setCursorVariant('link');
          setCursorText('');
        }}
        onLeaveLink={() => {
          setCursorVariant('default');
          setCursorText('');
        }}
      />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet context={{ 
              enterLink: (text = '') => {
                setCursorVariant('link');
                setCursorText(text);
              },
              leaveLink: () => {
                setCursorVariant('default');
                setCursorText('');
              }
            }} />
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Footer 
        onEnterLink={() => {
          setCursorVariant('link');
          setCursorText('');
        }}
        onLeaveLink={() => {
          setCursorVariant('default');
          setCursorText('');
        }}
      />
    </div>
  );
};

export default Layout;