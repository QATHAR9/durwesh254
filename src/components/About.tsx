import React from 'react';
import { Award, Users, Clock, Sparkles } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Clock, value: '4+', label: 'Years of Excellence' },
    { icon: Sparkles, value: '75%', label: 'Natural Ingredients' },
    { icon: Award, value: '50+', label: 'Luxury Fragrances' },
    { icon: Users, value: '2K+', label: 'Happy Customers' },
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Section */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              <div className="aspect-[4/5] bg-gray-200 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/3059609/pexels-photo-3059609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Luxury perfume crafting" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl -z-10 opacity-20"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl -z-10 opacity-10"></div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  DURWESH was born from a quiet determination and a deep love for the power of scent. Our journey began in the vibrant streets of Mombasa, Kenya, where our founder first discovered the timeless art of perfumery.
                </p>
                
                <p>
                  Surrounded by the rich aromas of spices, coastal winds, and traditional oils, a dream took shape — to create fragrances that speak to memory, identity, and culture. With patience as our guide and passion in every bottle, DURWESH began as a humble store with a bold vision.
                </p>
                
                <p>
                  Today, we curate only the finest fragrances, each telling its own unique story. Our perfumes are crafted using time-honored traditions, combining rare and precious ingredients from around the world.
                </p>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <IconComponent size={24} className="text-green-600" />
                      </div>
                    </div>
                    <p className="font-serif text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;