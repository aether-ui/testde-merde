import React, { useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, ChevronLeft, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

type ContextType = {
  enterLink: (text?: string) => void;
  leaveLink: () => void;
};

const CartPage: React.FC = () => {
  const { enterLink, leaveLink } = useOutletContext<ContextType>();
  const { cart, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

          {cart.items.length > 0 ? (
            <>
              <div className="mb-8">
                {cart.items.map((item, index) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b border-gray-200"
                  >
                    <div className="flex-shrink-0 w-24 h-24 bg-gray-100 mb-4 sm:mb-0 sm:mr-6">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow mb-4 sm:mb-0">
                      <h3 className="font-medium text-lg mb-1">{item.product.name}</h3>
                      <p className="text-gray-500 text-sm mb-2">
                        {item.product.colors.length > 0 && item.product.colors[0].name} | {item.product.sizes[0]}
                      </p>
                      <div className="flex items-center">
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-500 hover:text-red-500 transition-colors flex items-center text-sm"
                          onMouseEnter={enterLink}
                          onMouseLeave={leaveLink}
                        >
                          <Trash2 size={14} className="mr-1" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center mr-6">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(item.product.id, item.quantity - 1);
                          }
                        }}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition-colors"
                        disabled={item.quantity <= 1}
                        onMouseEnter={enterLink}
                        onMouseLeave={leaveLink}
                      >
                        <Minus size={14} />
                      </button>
                      <div className="w-10 text-center">{item.quantity}</div>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition-colors"
                        onMouseEnter={enterLink}
                        onMouseLeave={leaveLink}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    <div className="font-semibold text-right">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="bg-gray-50 p-6 mb-8">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span className="font-medium">${cart.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 mt-2">
                  <span>Total</span>
                  <span>${cart.totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-6 py-3 border border-black hover:bg-gray-100 transition-colors"
                  onMouseEnter={() => enterLink('SHOP MORE')}
                  onMouseLeave={leaveLink}
                >
                  <ChevronLeft size={16} className="mr-2" />
                  <span>Continue Shopping</span>
                </Link>
                <Link
                  to="/checkout"
                  className="inline-flex items-center justify-center px-6 py-3 bg-black text-white hover:bg-yellow-400 hover:text-black transition-colors flex-grow"
                  onMouseEnter={() => enterLink('CHECKOUT')}
                  onMouseLeave={leaveLink}
                >
                  <span>Proceed to Checkout</span>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                <ShoppingBag size={32} className="text-gray-400" />
              </div>
              <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-6 py-3 bg-black text-white hover:bg-yellow-400 hover:text-black transition-colors"
                onMouseEnter={() => enterLink('SHOP NOW')}
                onMouseLeave={leaveLink}
              >
                <span>Start Shopping</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;