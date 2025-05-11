import React, { useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

type ContextType = {
  enterLink: (text?: string) => void;
  leaveLink: () => void;
};

const LookbookPage: React.FC = () => {
  const { enterLink, leaveLink } = useOutletContext<ContextType>();

  // Lookbook items
  const lookbookItems = [
    {
      id: '1',
      title: 'Urban Explorer',
      description: 'Contemporary street essentials for the modern city dweller.',
      imageUrl: 'https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg'
    },
    {
      id: '2',
      title: 'Street Artistry',
      description: 'Bold expression through form, texture, and artistic design.',
      imageUrl: 'https://images.pexels.com/photos/2531734/pexels-photo-2531734.jpeg'
    },
    {
      id: '3',
      title: 'Concrete Rhythm',
      description: 'Fluid movement meets structured silhouettes and dynamic layers.',
      imageUrl: 'https://images.pexels.com/photos/2896853/pexels-photo-2896853.jpeg'
    },
    {
      id: '4',
      title: 'Metropolitan Edge',
      description: 'Pushing boundaries with innovative textures and unexpected details.',
      imageUrl: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg'
    }
  ];

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Lookbook</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our curated collections and stylistic expressions through visual narratives that embody our brand's aesthetic and philosophy.
            </p>
          </motion.div>
        </div>

        {/* Lookbook Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {lookbookItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link 
                to={`/lookbook/${item.id}`}
                className="block relative overflow-hidden"
                onMouseEnter={() => enterLink('EXPLORE')}
                onMouseLeave={leaveLink}
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <div className="bg-white/90 p-4 md:p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex items-center text-black font-medium">
                      <span>Explore Collection</span>
                      <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Behind the Scenes */}
        <div className="bg-gray-100 p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Behind the Scenes</h2>
              <p className="text-gray-600 mb-6">
                Our design process begins with urban inspiration and transforms into wearable art. Each collection tells a story of city culture, artistic expression, and contemporary lifestyle.
              </p>
              <Link 
                to="/about"
                className="inline-flex items-center border-b-2 border-black pb-1 font-medium hover:border-yellow-400 hover:text-yellow-500 transition-colors"
                onMouseEnter={() => enterLink('LEARN MORE')}
                onMouseLeave={leaveLink}
              >
                <span>LEARN MORE ABOUT OUR PROCESS</span>
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src="https://images.pexels.com/photos/3045825/pexels-photo-3045825.jpeg" 
                alt="Behind the scenes" 
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>

        {/* Instagram Feed */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Shop Our Instagram</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Follow us and tag your photos with #URBANX to be featured in our gallery.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              'https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg',
              'https://images.pexels.com/photos/1460036/pexels-photo-1460036.jpeg',
              'https://images.pexels.com/photos/2002717/pexels-photo-2002717.jpeg',
              'https://images.pexels.com/photos/2442893/pexels-photo-2442893.jpeg'
            ].map((img, index) => (
              <motion.a
                key={index}
                href="#"
                className="block aspect-square overflow-hidden group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onMouseEnter={() => enterLink('@urbanx')}
                onMouseLeave={leaveLink}
              >
                <img 
                  src={img} 
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">@urbanx</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookbookPage;