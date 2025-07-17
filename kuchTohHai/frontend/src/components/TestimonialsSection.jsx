import React from 'react';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TestimonialsSection = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      comment: "Excellent service! The driver was professional and the car was clean and comfortable. Highly recommend Maya Tours for airport transfers.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      id: 2,
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      comment: "Amazing Golden Triangle tour! Everything was well organized and our guide was very knowledgeable. Great value for money.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      id: 3,
      name: "Amit Patel",
      location: "Bangalore",
      rating: 5,
      comment: "Used their services for a family trip to Goa. The vehicle was spacious and the driver was very helpful. Will definitely book again!",
      image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      id: 4,
      name: "Sneha Gupta",
      location: "Pune",
      rating: 5,
      comment: "Professional service with competitive rates. The booking process was smooth and customer support was very responsive.",
      image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('whatCustomersSay')}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('testimonialsSubtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
              
              <div className="relative">
                <Quote className="w-6 h-6 text-blue-200 absolute -top-2 -left-1" />
                <p className="text-gray-700 text-sm leading-relaxed pl-4">
                  {testimonial.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">{t('joinHappyCustomers')}</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('experienceDifference')}
          </p>
          <a 
            href="tel:+919368084778" 
            className="bg-white text-blue-800 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 font-semibold inline-flex items-center shadow-lg group"
          >
            {t('bookNow')}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;



