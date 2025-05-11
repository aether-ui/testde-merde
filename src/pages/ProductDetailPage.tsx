import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Heart,
  Truck, 
  RotateCcw, 
  Shield, 
  ChevronLeft, 
  ChevronRight,
  Check,
  Minus,
  Plus
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { mockProducts } from '../data/mockProducts';

type ContextType = {
  enterLink: (text?: string) => void;
  leaveLink: () => void;
};

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { enterLink, leaveLink } = useOutletContext<ContextType>();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchedProduct = mockProducts.find(p => p.id === id);
    
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      if (fetchedProduct.colors.length > 0) {
        setSelectedColor(fetchedProduct.colors[0].value);
      }
      if (fetchedProduct.sizes.length > 0) {
        setSelectedSize(fetchedProduct.sizes[0]);
      }
    }
    
    setLoading(false);
    
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, [id]);
  
  const handlePrevImage = () => {
    if (!product) return;
    setSelectedImage(prev => (prev === 0 ? product.imageUrls.length - 1 : prev - 1));
  };
  
  const handleNextImage = () => {
    if (!product) return;
    setSelectedImage(prev => (prev === product.imageUrls.length - 1 ? 0 : prev + 1));
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-8">Sorry, we couldn't find the product you're looking for.</p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-black text-white px-6 py-3 hover:bg-yellow-400 hover:text-black transition-colors"
            onMouseEnter={enterLink}
            onMouseLeave={leaveLink}
          >
            Return to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="relative">
            <div className="relative overflow-hidden aspect-[3/4] bg-gray-100">
              <motion.img
                key={selectedImage}
                src={product.imageUrls[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black w-10 h-10 rounded-full flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                onMouseEnter={enterLink}
                onMouseLeave={leaveLink}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black w-10 h-10 rounded-full flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                onMouseEnter={enterLink}
                onMouseLeave={leaveLink}
              >
                <ChevronRight size={20} />
              </button>
              
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
            </div>
            
            {/* Thumbnail Navigation */}
            <div className="flex mt-4 space-x-2">
              {product.imageUrls.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`overflow-hidden aspect-square w-20 ${
                    selectedImage === idx 
                      ? 'ring-2 ring-black' 
                      : 'ring-1 ring-gray-200'
                  }`}
                  onMouseEnter={enterLink}
                  onMouseLeave={leaveLink}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold mb-6">${product.price.toFixed(2)}</p>
            
            <p className="text-gray-600 mb-8">{product.description}</p>
            
            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-3">Color: {product.colors.find(c => c.value === selectedColor)?.name}</h3>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-10 h-10 rounded-full ${
                        selectedColor === color.value 
                          ? 'ring-2 ring-offset-2 ring-black' 
                          : ''
                      }`}
                      style={{ backgroundColor: color.value }}
                      onMouseEnter={enterLink}
                      onMouseLeave={leaveLink}
                    >
                      {selectedColor === color.value && (
                        <Check size={16} className="mx-auto text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Size Selection */}
            {product.sizes.length > 0 && product.sizes[0] !== 'One Size' && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Size</h3>
                  <button 
                    className="text-sm text-gray-600 underline hover:text-black transition-colors"
                    onMouseEnter={enterLink}
                    onMouseLeave={leaveLink}
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[4rem] h-10 px-3 border ${
                        selectedSize === size 
                          ? 'bg-black text-white border-black' 
                          : 'bg-white text-black border-gray-300 hover:border-black'
                      } transition-colors`}
                      onMouseEnter={enterLink}
                      onMouseLeave={leaveLink}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <div className="flex border border-gray-300">
                <button 
                  onClick={decreaseQuantity}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  onMouseEnter={enterLink}
                  onMouseLeave={leaveLink}
                >
                  <Minus size={16} />
                </button>
                <div className="w-12 h-12 flex items-center justify-center border-l border-r border-gray-300">
                  {quantity}
                </div>
                <button 
                  onClick={increaseQuantity}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  onMouseEnter={enterLink}
                  onMouseLeave={leaveLink}
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="flex-grow py-3 bg-black text-white hover:bg-yellow-400 hover:text-black transition-colors flex items-center justify-center space-x-2"
                onMouseEnter={enterLink}
                onMouseLeave={leaveLink}
              >
                <ShoppingBag size={20} />
                <span>Add to Cart</span>
              </button>
              
              <button 
                className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                onMouseEnter={enterLink}
                onMouseLeave={leaveLink}
              >
                <Heart size={20} />
              </button>
            </div>
            
            {/* Product Features */}
            <div className="space-y-4 mb-8 border-t border-b border-gray-200 py-6">
              <div className="flex items-start space-x-4">
                <Truck size={20} className="mt-1" />
                <div>
                  <h4 className="font-medium">Free Shipping</h4>
                  <p className="text-sm text-gray-500">Free standard shipping on all orders over $100</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <RotateCcw size={20} className="mt-1" />
                <div>
                  <h4 className="font-medium">Free Returns</h4>
                  <p className="text-sm text-gray-500">Return items within 30 days for a full refund</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Shield size={20} className="mt-1" />
                <div>
                  <h4 className="font-medium">Quality Guarantee</h4>
                  <p className="text-sm text-gray-500">Premium materials and craftsmanship in every product</p>
                </div>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 px-2 py-1">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;