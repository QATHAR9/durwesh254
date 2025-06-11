import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="" 
          alt="Luxury perfumes" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          DURWESH
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light tracking-wide">
          Luxury Perfumes Collection
        </p>
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover our exquisite collection of premium fragrances, crafted for those who appreciate the finest scents
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#products" 
            className="bg-white text-black px-8 py-4 font-semibold text-lg rounded-sm hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            SHOP COLLECTION
          </a>
          <a 
            href="https://wa.me/254706183308" 
            target="_blank" 
            rel="noopener noreferrer"
            className="border-2 border-white text-white px-8 py-4 font-semibold text-lg rounded-sm hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
          >
            CONTACT US
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;