import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, ArrowRight, Clock, User, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const MeetTheOwner = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-lg p-8 border-2 border-amber-200">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Meet The Owner</h3>
      
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Owner Photo */}
        <div className="relative">
          <img 
            src="https://mayatourandtravels.com/images/gallery/maya-tours-and-travels-mathura-4.jpg" 
            alt="Mr. Anuj Agrawal"
            className="w-32 h-32 rounded-full object-cover border-4 border-amber-300 shadow-xl"
          />
          <div className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full p-2">
            <Star className="w-4 h-4 fill-current" />
          </div>
        </div>
        
        {/* Owner Details */}
        <div className="space-y-3">
          <h4 className="text-xl font-bold text-gray-900">Mr. Anuj Agrawal</h4>
          <p className="text-amber-700 font-semibold">Founder & CEO</p>
          <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
            "At Mathura Maya Tour & Travels, we take great pleasure in introducing ourselves as one of the leading comprehensive Tour & Travel Company's from the land of Shri Krishna - Mathura. "
          </p>
        </div>
        
        {/* Contact Details */}
        <div className="w-full space-y-4 pt-4 border-t border-amber-200">
          <div className="flex items-center justify-center space-x-2 text-gray-700">
            <Phone className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium">Direct Contact:</span>
          </div>
          
          <div className="space-y-2">
            <a 
              href="tel:+919897011103" 
              className="block bg-amber-100 text-amber-800 py-2 px-4 rounded-lg hover:bg-amber-200 transition-colors font-semibold text-sm"
            >
              📞 +91-9897011103
            </a>
            <a 
              href="tel:+919897138727" 
              className="block bg-amber-100 text-amber-800 py-2 px-4 rounded-lg hover:bg-amber-200 transition-colors font-semibold text-sm"
            >
              📞 +91-9897138727
            </a>
            <a 
              href="mailto:anuj.agarwal7588@gmail.com" 
              className="block bg-yellow-100 text-yellow-800 py-2 px-4 rounded-lg hover:bg-yellow-200 transition-colors font-semibold text-sm"
            >
              ✉️ anuj.agarwal7588@gmail.com
            </a>
          </div>
        </div>
        
        {/* CTA Button */}
        <button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-3 rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all font-semibold flex items-center justify-center group shadow-lg">
          <MessageCircle className="w-4 h-4 mr-2" />
          Chat with Owner
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
