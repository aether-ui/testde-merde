import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Logo from './ui/Logo';
import NavLinks from './NavLinks';

interface HeaderProps {
  isScrolled: boolean;
  onEnterLink: () => void;
  onLeaveLink: () => void;
}

const Header: React.FC<HeaderProps> = ({ isScrolled, onEnterLink, onLeaveLink }) => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  const headerClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${
    isScrolled 
      ? 'bg-white py-3 shadow-md' 
      : 'bg-transparent py-6'
  }`;

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="relative z-10"
            onMouseEnter={onEnterLink}
            onMouseLeave={onLeaveLink}
          >
            <Logo isScrolled={isScrolled} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <NavLinks isScrolled={isScrolled} onEnterLink={onEnterLink} onLeaveLink={onLeaveLink} />
          </div>

          {/* Actions Group */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button 
              onClick={toggleSearch}
              className={`relative z-10 transition-colors duration-300 ${
                isScrolled ? 'text-black hover:text-yellow-500' : 'text-black hover:text-yellow-500'
              }`}
              onMouseEnter={onEnterLink}
              onMouseLeave={onLeaveLink}
            >
              <Search size={20} />
            </button>

            {/* Account Button */}
            <Link 
              to="/account" 
              className={`relative z-10 transition-colors duration-300 ${
                isScrolled ? 'text-black hover:text-yellow-500' : 'text-black hover:text-yellow-500'
              }`}
              onMouseEnter={onEnterLink}
              onMouseLeave={onLeaveLink}
            >
              <User size={20} />
            </Link>

            {/* Cart Button */}
            <button 
              onClick={() => navigate('/cart')}
              className={`relative z-10 transition-colors duration-300 ${
                isScrolled ? 'text-black hover:text-yellow-500' : 'text-black hover:text-yellow-500'
              }`}
              onMouseEnter={onEnterLink}
              onMouseLeave={onLeaveLink}
            >
              <ShoppingBag size={20} />
              {cart.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium">
                  {cart.totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden relative z-10"
              onMouseEnter={onEnterLink}
              onMouseLeave={onLeaveLink}
            >
              {mobileMenuOpen ? (
                <X size={24} className={isScrolled ? 'text-black' : 'text-black'} />
              ) : (
                <Menu size={24} className={isScrolled ? 'text-black' : 'text-black'} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[72px] bg-white z-40 lg:hidden"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col space-y-6">
                <Link to="/" className="text-xl font-medium" onClick={toggleMobileMenu}>Home</Link>
                <Link to="/products" className="text-xl font-medium" onClick={toggleMobileMenu}>Products</Link>
                <Link to="/lookbook" className="text-xl font-medium" onClick={toggleMobileMenu}>Lookbook</Link>
                <Link to="/about" className="text-xl font-medium" onClick={toggleMobileMenu}>About</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-40"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="flex justify-end">
                <button onClick={toggleSearch} className="text-black hover:text-yellow-500">
                  <X size={24} />
                </button>
              </div>
              <div className="flex items-center justify-center h-[80vh]">
                <div className="w-full max-w-2xl">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search for products..." 
                      className="w-full py-4 text-3xl font-light border-b-2 border-black focus:outline-none focus:border-yellow-500 bg-transparent"
                      autoFocus
                    />
                    <button className="absolute right-0 top-0 h-full flex items-center text-black">
                      <Search size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;