import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';

interface LimitedDropsProps {
  onEnterLink: (text?: string) => void;
  onLeaveLink: () => void;
}

const LimitedDrops: React.FC<LimitedDropsProps> = ({ onEnterLink, onLeaveLink }) => {
  // Mock limited drop data
  const limitedDrops = [
    {
      id: '1',
      name: 'Artist Collaboration Hoodie',
      price: 189.99,
      imageUrl: 'https://images.pexels.com/photos/6311593/pexels-photo-6311593.jpeg',
      endDate: new Date('2025-08-30T00:00:00'),
      available: 24
    },
    {
      id: '2',
      name: 'Limited Edition Sneakers',
      price: 219.99,
      imageUrl: 'https://images.pexels.com/photos/2421374/pexels-photo-2421374.jpeg',
      endDate: new Date('2025-08-15T00:00:00'),
      available: 12
    }
  ];

  // Format the remaining time
  const formatTimeRemaining = (endDate: Date): string => {
    const now = new Date();
    const diffTime = Math.abs(endDate.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-2">Don't Miss Out</h2>
            <h3 className="text-3xl md:text-4xl font-bold">Limited Edition Drops</h3>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4"></div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {limitedDrops.map((drop, index) => (
            <motion.div
              key={drop.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden bg-gray-900"
            >
              <Link
                to={`/products/${drop.id}`}
                className="block aspect-[16/9] md:aspect-[16/10] relative overflow-hidden"
                onMouseEnter={() => onEnterLink('VIEW')}
                onMouseLeave={onLeaveLink}
              >
                <img
                  src={drop.imageUrl}
                  alt={drop.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xl md:text-2xl font-bold">{drop.name}</h4>
                      <span className="text-lg md:text-xl font-semibold">${drop.price.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center text-yellow-400">
                        <Clock size={16} className="mr-1" />
                        <span>Ends in {formatTimeRemaining(drop.endDate)}</span>
                      </div>
                      <span className="text-gray-300">{drop.available} items left</span>
                    </div>
                  </div>
                  
                  <div className="inline-flex items-center bg-yellow-400 text-black px-6 py-3 font-medium group-hover:bg-white transition-colors">
                    <span>SHOP NOW</span>
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/products?category=limited-drops"
            className="inline-flex items-center border-b-2 border-white pb-1 font-medium hover:border-yellow-400 hover:text-yellow-400 transition-colors"
            onMouseEnter={() => onEnterLink('VIEW ALL')}
            onMouseLeave={onLeaveLink}
          >
            <span>VIEW ALL LIMITED DROPS</span>
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LimitedDrops;