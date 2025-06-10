import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-[#004D40] text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2" 
          alt="Luxury perfume background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#004D40]/80 via-[#004D40]/60 to-[#004D40]/80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight">
          DURWESH
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light tracking-wide">
          Luxury Perfumes & Fragrances
        </p>
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed opacity-90">
          Discover our exquisite collection of premium fragrances, crafted for those who appreciate the finer things in life.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#products"
            className="bg-white text-[#004D40] px-8 py-4 font-semibold rounded-lg hover:bg-gold-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
          >
            Shop Collection
          </a>
          <a 
            href="https://wa.me/254706183308"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white text-white px-8 py-4 font-semibold rounded-lg hover:bg-white hover:text-[#004D40] transition-all duration-300 transform hover:-translate-y-1"
          >
            Contact Us
          </a>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;