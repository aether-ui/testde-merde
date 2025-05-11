import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface NavLinksProps {
  isScrolled: boolean;
  onEnterLink: () => void;
  onLeaveLink: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ isScrolled, onEnterLink, onLeaveLink }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const navItems = [
    { 
      name: 'Boutique', 
      path: '/products',
      children: [
        { name: 'Nouveautés', path: '/products?category=new-arrivals' },
        { name: 'Meilleures Ventes', path: '/products?category=best-sellers' },
        { name: 'Éditions Limitées', path: '/products?category=limited-drops' },
        { name: 'Tous les Produits', path: '/products' }
      ]
    },
    { 
      name: 'Collections', 
      path: '/collections',
      children: [
        { name: 'Été 2025', path: '/collections/summer-2025' },
        { name: 'Classiques Urbains', path: '/collections/urban-classics' },
        { name: 'Série Street Art', path: '/collections/street-art-series' }
      ]
    },
    { name: 'Lookbook', path: '/lookbook' },
    { name: 'À Propos', path: '/about' }
  ];

  const handleMouseEnter = (name: string) => {
    setActiveMenu(name);
    onEnterLink();
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
    onLeaveLink();
  };

  const linkClasses = `relative font-medium tracking-wide mx-4 transition-colors duration-300 ${
    isScrolled ? 'text-black hover:text-yellow-500' : 'text-black hover:text-yellow-500'
  }`;

  return (
    <nav className="flex">
      {navItems.map((item) => (
        <div 
          key={item.name}
          className="relative"
          onMouseEnter={() => handleMouseEnter(item.name)}
          onMouseLeave={handleMouseLeave}
        >
          {item.children ? (
            <div className={linkClasses}>
              <div className="flex items-center cursor-pointer">
                <span>{item.name}</span>
                <ChevronDown size={16} className="ml-1" />
              </div>
              
              <AnimatePresence>
                {activeMenu === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full mt-2 bg-white shadow-xl min-w-[200px] z-50"
                  >
                    <div className="py-3">
                      {item.children.map((child) => (
                        <Link 
                          key={child.name}
                          to={child.path}
                          className="block px-5 py-2 text-sm hover:bg-gray-50 hover:text-yellow-500 transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to={item.path} className={linkClasses}>
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default NavLinks;