import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CollectionBannerProps {
  onEnterLink: (text?: string) => void;
  onLeaveLink: () => void;
}

const CollectionBanner: React.FC<CollectionBannerProps> = ({ onEnterLink, onLeaveLink }) => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-2">New Collection</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Street Art Series</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our latest collection celebrates urban art culture with designs inspired by renowned street artists.
              Each piece is a canvas that tells a story of city life and creative expression.
            </p>
            <Link 
              to="/collections/street-art-series"
              className="inline-flex items-center bg-black text-white px-8 py-4 font-medium hover:bg-yellow-400 hover:text-black transition-colors group"
              onMouseEnter={() => onEnterLink('EXPLORE')}
              onMouseLeave={onLeaveLink}
            >
              <span>DISCOVER COLLECTION</span>
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] relative overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/6976943/pexels-photo-6976943.jpeg"
                alt="Street Art Collection" 
                className="w-full h-full object-cover"
              />
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-yellow-400 z-[-1]"></div>
            </div>
            
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-black z-[-1]"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CollectionBanner;