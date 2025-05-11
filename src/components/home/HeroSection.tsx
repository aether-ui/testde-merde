import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onEnterLink: (text?: string) => void;
  onLeaveLink: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onEnterLink, onLeaveLink }) => {
  const slides = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/5868722/pexels-photo-5868722.jpeg',
      title: 'NOUVELLE COLLECTION ÉTÉ',
      subtitle: 'Exprimez votre style urbain',
      link: '/collections/summer-2025'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/7005018/pexels-photo-7005018.jpeg',
      title: 'ÉDITIONS LIMITÉES',
      subtitle: 'Designs exclusifs disponibles maintenant',
      link: '/products?category=limited-drops'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/7691035/pexels-photo-7691035.jpeg',
      title: 'ESSENTIELS URBAINS',
      subtitle: 'Streetwear de qualité premium',
      link: '/products'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 h-full w-full"
        >
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-white text-lg md:text-xl tracking-widest mb-4">
                {slides[currentSlide].subtitle}
              </h2>
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
                {slides[currentSlide].title}
              </h1>
              <Link
                to={slides[currentSlide].link}
                className="inline-flex items-center bg-yellow-400 text-black px-8 py-4 font-medium hover:bg-yellow-300 transition-colors group"
                onMouseEnter={() => onEnterLink('EXPLORER')}
                onMouseLeave={onLeaveLink}
              >
                <span>EXPLORER LA COLLECTION</span>
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-16 h-1 ${
              currentSlide === index ? 'bg-yellow-400' : 'bg-white/50'
            } transition-colors duration-300`}
            onMouseEnter={onEnterLink}
            onMouseLeave={onLeaveLink}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;