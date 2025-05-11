import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onEnterLink: (text?: string) => void;
  onLeaveLink: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEnterLink, onLeaveLink }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="group">
      <div className="relative overflow-hidden mb-4">
        <Link 
          to={`/products/${product.id}`}
          onMouseEnter={() => onEnterLink('VIEW')}
          onMouseLeave={onLeaveLink}
        >
          <div className="aspect-[3/4] overflow-hidden bg-gray-100">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          
          {/* New Tag */}
          {product.isNew && (
            <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-medium px-2 py-1">
              NEW
            </div>
          )}
          
          {/* Limited Tag */}
          {product.isLimited && (
            <div className="absolute top-4 left-4 bg-black text-white text-xs font-medium px-2 py-1">
              LIMITED
            </div>
          )}
        </Link>
        
        {/* Quick Actions */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-4 flex justify-between opacity-0 transform translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <button 
            onClick={handleAddToCart}
            className="bg-black text-white p-3 hover:bg-yellow-400 hover:text-black transition-colors flex-grow mr-2 flex justify-center items-center"
            onMouseEnter={onEnterLink}
            onMouseLeave={onLeaveLink}
          >
            <ShoppingBag size={18} className="mr-2" />
            <span>Add to Cart</span>
          </button>
          <button 
            className="bg-white text-black p-3 hover:bg-gray-100 transition-colors"
            onMouseEnter={onEnterLink}
            onMouseLeave={onLeaveLink}
          >
            <Heart size={18} />
          </button>
        </motion.div>
      </div>
      
      <div className="text-center">
        <Link 
          to={`/products/${product.id}`}
          className="block"
          onMouseEnter={() => onEnterLink()}
          onMouseLeave={onLeaveLink}
        >
          <h4 className="font-medium text-lg mb-1 group-hover:text-yellow-500 transition-colors">{product.name}</h4>
          <p className="text-black font-semibold">${product.price.toFixed(2)}</p>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;