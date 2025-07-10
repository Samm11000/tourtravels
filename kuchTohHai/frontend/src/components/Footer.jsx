import React from 'react';
import { Car, Phone, Mail, MapPin, Heart, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <Car className="h-8 w-8 text-blue-400 mr-3" />
              <span className="text-xl font-bold">Maya Tour & Travels</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {t('trustedPartner')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Popular Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('popularDestinations')}</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">{t('goldenTriangle')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">{t('keralaBackwaters')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">{t('rajasthanHeritage')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">{t('goaBeaches')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">{t('himachalPradesh')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">{t('kashmirValley')}</a></li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">{t('about')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">{t('services')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">{t('packages')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">{t('fleet')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">{t('privacyPolicy')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">{t('termsOfService')}</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('contactInfo')}</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-blue-400 mr-3 mt-1" />
                <div>
                  <p className="text-gray-300">+91-9897011103</p>
                  <p className="text-gray-300">+91-9897138727</p>
                  <p className="text-sm text-gray-400">{t('available24x7')}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-blue-400 mr-3 mt-1" />
                <div>
                  <p className="text-gray-300">anuj.agarwal7588@gmail.com</p>
                  <p className="text-sm text-gray-400">{t('quickEmailResponse')}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-400 mr-3 mt-1" />
                <div>
                  <p className="text-gray-300">
                    Office: Brij Nagar, 166/144,<br />
                    Parikrama Marg, Sonkh, Adda,<br />
                    Mathura, Uttar Pradesh 281001
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-gray-400 mb-4 md:mb-0">
              <span>{t('designedWithLove')}</span>
              <Heart className="w-4 h-4 text-red-500 mx-2" />
              <span>{t('forTravelers')}</span>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-blue-400 transition-colors">{t('privacyPolicy')}</a>
              <a href="#" className="hover:text-blue-400 transition-colors">{t('termsOfService')}</a>
              <a href="#" className="hover:text-blue-400 transition-colors">{t('cancellationPolicy')}</a>
              <a href="#" className="hover:text-blue-400 transition-colors">{t('faq')}</a>
            </div>
          </div>
          <div className="text-center text-gray-400 text-sm mt-4">
            <p>&copy; 2024 Maya Tour & Travels. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;