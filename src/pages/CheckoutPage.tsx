import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, CreditCard, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';

type ContextType = {
  enterLink: (text?: string) => void;
  leaveLink: () => void;
};

type PaymentMethod = 'credit-card' | 'paypal';
type ShippingMethod = 'standard' | 'express';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { enterLink, leaveLink } = useOutletContext<ContextType>();
  const { cart, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card');
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('standard');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Calculate shipping cost
  const shippingCost = shippingMethod === 'standard' ? 10 : 25;
  
  // Calculate total
  const subtotal = cart.totalPrice;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax + shippingCost;
  
  useEffect(() => {
    // If cart is empty, redirect to cart page
    if (cart.items.length === 0) {
      navigate('/cart');
    }
    
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, [cart.items.length, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Clear cart and redirect to confirmation page
      clearCart();
      navigate('/checkout/confirmation');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
              >
                {/* Contact Information */}
                <div className="mb-8">
                  <h2 className="text-xl font-medium mb-4">Contact Information</h2>
                  <div className="bg-white p-6 border border-gray-200">
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Shipping Information */}
                <div className="mb-8">
                  <h2 className="text-xl font-medium mb-4">Shipping Address</h2>
                  <div className="bg-white p-6 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="address" className="block text-sm font-medium mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium mb-2">
                          State/Province
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium mb-2">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium mb-2">
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                        >
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Shipping Method */}
                <div className="mb-8">
                  <h2 className="text-xl font-medium mb-4">Shipping Method</h2>
                  <div className="bg-white p-6 border border-gray-200">
                    <div className="space-y-4">
                      <label className="flex items-start cursor-pointer p-3 border border-gray-300 hover:border-black transition-colors">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="standard"
                          checked={shippingMethod === 'standard'}
                          onChange={() => setShippingMethod('standard')}
                          className="mt-1 mr-3"
                        />
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <span className="font-medium">Standard Shipping</span>
                            <span className="font-medium">$10.00</span>
                          </div>
                          <p className="text-sm text-gray-500">Estimated delivery in 5-7 business days</p>
                        </div>
                      </label>
                      
                      <label className="flex items-start cursor-pointer p-3 border border-gray-300 hover:border-black transition-colors">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="express"
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                          className="mt-1 mr-3"
                        />
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <span className="font-medium">Express Shipping</span>
                            <span className="font-medium">$25.00</span>
                          </div>
                          <p className="text-sm text-gray-500">Estimated delivery in 1-3 business days</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div className="mb-8">
                  <h2 className="text-xl font-medium mb-4">Payment Method</h2>
                  <div className="bg-white p-6 border border-gray-200">
                    <div className="space-y-4">
                      <label className="flex items-center cursor-pointer p-3 border border-gray-300 hover:border-black transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="credit-card"
                          checked={paymentMethod === 'credit-card'}
                          onChange={() => setPaymentMethod('credit-card')}
                          className="mr-3"
                        />
                        <div className="flex items-center">
                          <CreditCard size={20} className="mr-2" />
                          <span className="font-medium">Credit / Debit Card</span>
                        </div>
                      </label>
                      
                      <label className="flex items-center cursor-pointer p-3 border border-gray-300 hover:border-black transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={paymentMethod === 'paypal'}
                          onChange={() => setPaymentMethod('paypal')}
                          className="mr-3"
                        />
                        <div className="flex items-center">
                          <span className="font-medium">PayPal</span>
                        </div>
                      </label>
                    </div>
                    
                    {paymentMethod === 'credit-card' && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="mb-4">
                          <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">
                            Card Number
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <label htmlFor="expiryDate" className="block text-sm font-medium mb-2">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              id="expiryDate"
                              placeholder="MM/YY"
                              className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                            />
                          </div>
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium mb-2">
                              CVV
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              placeholder="123"
                              className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="nameOnCard" className="block text-sm font-medium mb-2">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            id="nameOnCard"
                            placeholder="John Doe"
                            className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                  <Link
                    to="/cart"
                    className="inline-flex items-center justify-center px-6 py-3 border border-black hover:bg-gray-100 transition-colors"
                    onMouseEnter={() => enterLink('BACK')}
                    onMouseLeave={leaveLink}
                  >
                    <ChevronLeft size={16} className="mr-2" />
                    <span>Back to Cart</span>
                  </Link>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-6 py-3 bg-black text-white hover:bg-yellow-400 hover:text-black transition-colors flex-grow"
                    disabled={isSubmitting}
                    onMouseEnter={() => enterLink('PLACE ORDER')}
                    onMouseLeave={leaveLink}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Lock size={16} className="mr-2" />
                        Place Order
                      </span>
                    )}
                  </button>
                </div>
              </motion.form>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 border border-gray-200 sticky top-32">
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="flex">
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 mr-4">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium">{item.product.name}</h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span className="font-medium">${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span>Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;