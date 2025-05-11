import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useOutletContext } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CollectionBanner from '../components/home/CollectionBanner';
import LimitedDrops from '../components/home/LimitedDrops';
import Newsletter from '../components/home/Newsletter';

type ContextType = {
  enterLink: (text?: string) => void;
  leaveLink: () => void;
};

const HomePage: React.FC = () => {
  const { enterLink, leaveLink } = useOutletContext<ContextType>();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <HeroSection onEnterLink={enterLink} onLeaveLink={leaveLink} />
      
      {/* Featured Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { title: 'T-Shirts', image: 'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg', link: '/products?category=t-shirts' },
              { title: 'Hoodies', image: 'https://images.pexels.com/photos/7764555/pexels-photo-7764555.jpeg', link: '/products?category=hoodies' },
              { title: 'Accessories', image: 'https://images.pexels.com/photos/1317712/pexels-photo-1317712.jpeg', link: '/products?category=accessories' }
            ].map((category, index) => (
              <Link 
                key={index}
                to={category.link}
                className="group relative overflow-hidden aspect-[1/1.2]"
                onMouseEnter={() => enterLink('VIEW')}
                onMouseLeave={leaveLink}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors z-10"></div>
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center z-20">
                  <h3 className="text-white text-2xl font-bold mb-2 tracking-wider">{category.title}</h3>
                  <div className="bg-yellow-400 text-black px-4 py-2 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-medium">Shop Now</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Featured Products */}
      <FeaturedProducts onEnterLink={enterLink} onLeaveLink={leaveLink} />
      
      {/* Collection Banner */}
      <CollectionBanner onEnterLink={enterLink} onLeaveLink={leaveLink} />
      
      {/* Limited Drops */}
      <div ref={targetRef}>
        <motion.div style={{ opacity, y }}>
          <LimitedDrops onEnterLink={enterLink} onLeaveLink={leaveLink} />
        </motion.div>
      </div>
      
      {/* Newsletter */}
      <Newsletter onEnterLink={enterLink} onLeaveLink={leaveLink} />
    </div>
  );
};

export default HomePage;