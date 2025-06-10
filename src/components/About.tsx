import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <div className="relative">
              <div className="w-full aspect-[3/4] bg-gray-200 rounded overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3059609/pexels-photo-3059609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Luxury perfume crafting" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gold-500 rounded-sm -z-10"></div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 md:pl-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6">Our Story</h2>
            
            <p className="text-gray-700 mb-4">
             DURWESH was born from a quiet determination and a deep love for the power of scent. Our journey began in the vibrant streets of Mombasa, Kenya, where our founder first discovered the timeless art of perfumery. Surrounded by the rich aromas of spices, coastal winds, and traditional oils, a dream took shape — to create fragrances that speak to memory, identity, and culture. With patience as our guide and passion in every bottle, DURWESH began as a humble store with a bold vision: to bring the spirit of East Africa to life through scent.
            </p>
            
            <p className="text-gray-700 mb-6">
              Today, we curate only the finest fragrances, each telling its own unique story. Our perfumes are crafted using time-honored traditions, combining rare and precious ingredients from around the world.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 border border-gold-200 bg-white">
                <p className="font-serif text-3xl font-semibold text-gold-500">4+</p>
                <p className="text-sm text-gray-500">Years of Excellence</p>
              </div>
              <div className="text-center p-4 border border-gold-200 bg-white">
                <p className="font-serif text-3xl font-semibold text-gold-500">75%</p>
                <p className="text-sm text-gray-500">Natural Ingredients</p>
              </div>
              <div className="text-center p-4 border border-gold-200 bg-white">
                <p className="font-serif text-3xl font-semibold text-gold-500">50+</p>
                <p className="text-sm text-gray-500">Luxury Fragrances</p>
              </div>
              <div className="text-center p-4 border border-gold-200 bg-white">
                <p className="font-serif text-3xl font-semibold text-gold-500">2K+</p>
                <p className="text-sm text-gray-500">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;