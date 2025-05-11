import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            Founded with a passion for exceptional fashion and design, we've been crafting unique pieces 
            that blend contemporary style with timeless elegance. Our commitment to quality and 
            sustainability drives everything we do.
          </p>
          
          <h2 className="text-2xl font-semibold pt-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            We strive to create fashion that not only looks good but feels good too. Our mission is to 
            provide sustainable, ethically-made clothing that empowers individuals to express their 
            unique style while making conscious choices for our planet.
          </p>
        </div>

        <div className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Our Values</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">Quality First</h3>
              <p className="text-gray-600">We never compromise on quality, ensuring each piece meets our high standards.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Sustainability</h3>
              <p className="text-gray-600">Environmental responsibility is at the core of our production process.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Innovation</h3>
              <p className="text-gray-600">We continuously explore new ways to improve our designs and processes.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Community</h3>
              <p className="text-gray-600">We believe in building strong relationships with our customers and partners.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;