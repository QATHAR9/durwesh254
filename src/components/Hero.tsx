import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/WhatsApp Image 2025-05-12 at 9.40.36 PM.jpeg" 
          alt="DURWESH Luxury Perfumes" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-wide">
            DURWESH
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6"></div>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light tracking-wide">
          Luxury Perfumes Collection
        </p>
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover our exquisite collection of premium fragrances, crafted for those who appreciate the finest scents
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#products" 
            className="bg-gold-500 text-black px-8 py-4 font-semibold text-lg rounded-sm hover:bg-gold-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            SHOP COLLECTION
          </a>
          <a 
            href="https://wa.me/254706183308" 
            target="_blank" 
            rel="noopener noreferrer"
            className="border-2 border-gold-500 text-gold-500 px-8 py-4 font-semibold text-lg rounded-sm hover:bg-gold-500 hover:text-black transition-all duration-300 transform hover:scale-105"
          >
            CONTACT US
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gold-400 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;