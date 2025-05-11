import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface NewsletterProps {
  onEnterLink: (text?: string) => void;
  onLeaveLink: () => void;
}

const Newsletter: React.FC<NewsletterProps> = ({ onEnterLink, onLeaveLink }) => {
  return (
    <section className="py-20 bg-gray-100 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Exclusive Updates</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sign up for our newsletter to receive early access to new drops, exclusive promotions, and street culture insights.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white p-8 md:p-12 shadow-sm relative z-10"
        >
          <form className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-grow w-full">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full p-4 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              />
            </div>
            <button 
              type="submit"
              className="bg-black text-white px-8 py-4 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-colors group w-full md:w-auto"
              onMouseEnter={onEnterLink}
              onMouseLeave={onLeaveLink}
            >
              <span>SUBSCRIBE</span>
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          <p className="text-gray-500 text-sm mt-4">
            By subscribing you agree to our Terms and Privacy Policy. You can unsubscribe at any time.
          </p>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-yellow-400 rounded-full opacity-20"></div>
      <div className="absolute top-20 -left-12 w-32 h-32 border-4 border-yellow-400 rounded-full opacity-20"></div>
    </section>
  );
};

export default Newsletter;