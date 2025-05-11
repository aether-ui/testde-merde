import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types';

interface FeaturedProductsProps {
  onEnterLink: (text?: string) => void;
  onLeaveLink: () => void;
}

// Mock product data
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Urban Element Tee',
    price: 89.99,
    description: 'Premium cotton t-shirt with urban-inspired graphic design.',
    imageUrl: 'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg',
    imageUrls: [
      'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg',
      'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg',
      'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg'
    ],
    category: 't-shirts',
    tags: ['new', 'tee', 'cotton'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'White', value: '#FFFFFF' }
    ],
    inStock: true,
    isNew: true,
    isLimited: false
  },
  {
    id: '2',
    name: 'Street Culture Hoodie',
    price: 129.99,
    description: 'Heavyweight cotton hoodie with embroidered details.',
    imageUrl: 'https://images.pexels.com/photos/5698853/pexels-photo-5698853.jpeg',
    imageUrls: [
      'https://images.pexels.com/photos/5698853/pexels-photo-5698853.jpeg',
      'https://images.pexels.com/photos/5698853/pexels-photo-5698853.jpeg',
      'https://images.pexels.com/photos/5698853/pexels-photo-5698853.jpeg'
    ],
    category: 'hoodies',
    tags: ['featured', 'hoodie', 'winter'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Gray', value: '#808080' }
    ],
    inStock: true,
    isNew: false,
    isLimited: false
  },
  {
    id: '3',
    name: 'Concrete Jungle Cap',
    price: 59.99,
    description: 'Adjustable cap with embroidered logo.',
    imageUrl: 'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg',
    imageUrls: [
      'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg',
      'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg',
      'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg'
    ],
    category: 'accessories',
    tags: ['cap', 'accessories', 'unisex'],
    sizes: ['One Size'],
    colors: [
      { name: 'Black', value: '#000000' }
    ],
    inStock: true,
    isNew: true,
    isLimited: false
  },
  {
    id: '4',
    name: 'Urban Cargo Pants',
    price: 149.99,
    description: 'Functional cargo pants with multiple pockets.',
    imageUrl: 'https://images.pexels.com/photos/9558577/pexels-photo-9558577.jpeg',
    imageUrls: [
      'https://images.pexels.com/photos/9558577/pexels-photo-9558577.jpeg',
      'https://images.pexels.com/photos/9558577/pexels-photo-9558577.jpeg',
      'https://images.pexels.com/photos/9558577/pexels-photo-9558577.jpeg'
    ],
    category: 'pants',
    tags: ['cargo', 'pants', 'streetwear'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Khaki', value: '#c3b091' }
    ],
    inStock: true,
    isNew: false,
    isLimited: true
  }
];

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onEnterLink, onLeaveLink }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-2">What's Hot</h2>
            <h3 className="text-3xl md:text-4xl font-bold">Featured Products</h3>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4"></div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
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
                <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button 
                    onClick={() => handleAddToCart(product)}
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
                </div>
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
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/products"
            className="inline-flex items-center border-b-2 border-black pb-1 font-medium hover:border-yellow-400 hover:text-yellow-500 transition-colors"
            onMouseEnter={() => onEnterLink('VIEW ALL')}
            onMouseLeave={onLeaveLink}
          >
            <span>VIEW ALL PRODUCTS</span>
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;