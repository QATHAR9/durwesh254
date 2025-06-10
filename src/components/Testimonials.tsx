import React, { useState, useEffect } from 'react';
import { TestimonialType } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialsProps {
  testimonials: TestimonialType[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [current, setCurrent] = useState(0);
  
  const next = () => {
    setCurrent((current + 1) % testimonials.length);
  };
  
  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [current]);
  
  return (
    <section id="testimonials" className="py-20 bg-black-500 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">What Our Clients Say</h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            Read what our discerning customers have to say about their experience with DURWESH.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id} 
                    className="min-w-full p-6 text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full overflow-hidden">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-lg mb-6 italic">"{testimonial.comment}"</p>
                    <h4 className="font-serif text-xl font-semibold">{testimonial.name}</h4>
                    <p className="text-gold-400">{testimonial.position}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={prev}
              className="absolute top-1/2 -left-4 -translate-y-1/2 w-10 h-10 rounded-full bg-gold-500 text-black-500 flex items-center justify-center hover:bg-gold-600 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={next}
              className="absolute top-1/2 -right-4 -translate-y-1/2 w-10 h-10 rounded-full bg-gold-500 text-black-500 flex items-center justify-center hover:bg-gold-600 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === current ? 'bg-gold-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;