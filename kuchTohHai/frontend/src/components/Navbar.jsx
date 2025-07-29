


import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import logo from "./photos/logo.png";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                 src={logo}
                alt="Maya Tour and Travels Logo"
                // className="h-14 w-auto"
                className="h-16 w-100 object-contain"
              />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-6">
              <Link 
                to="/" 
                className={`transition-all duration-200 px-3 py-2 text-sm font-semibold border-b-2 ${
                  isActive('/') 
                    ? 'text-gray-900 border-red-600' 
                    : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-red-600'
                }`}
              >
                {t('home') || 'Home'}
              </Link>
              <a 
                href="/#services" 
                className="text-gray-600 hover:text-gray-900 transition-all duration-200 px-3 py-2 text-sm font-semibold hover:border-b-2 hover:border-red-600 border-b-2 border-transparent"
              >
                {t('services') || 'Services'}
              </a>
              <Link 
                to="/packages" 
                className={`transition-all duration-200 px-3 py-2 text-sm font-semibold border-b-2 ${
                  isActive('/packages') 
                    ? 'text-gray-900 border-red-600' 
                    : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-red-600'
                }`}
              >
                {t('packages') || 'Packages'}
              </Link>
              <Link 
                to="/fleet" 
                className={`transition-all duration-200 px-3 py-2 text-sm font-semibold border-b-2 ${
                  isActive('/fleet') 
                    ? 'text-gray-900 border-red-600' 
                    : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-red-600'
                }`}
              >
                {t('fleet') || 'Fleet'}
              </Link>
              <Link 
                to="/gallery" 
                className={`transition-all duration-200 px-3 py-2 text-sm font-semibold border-b-2 ${
                  isActive('/gallery') 
                    ? 'text-gray-900 border-red-600' 
                    : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-red-600'
                }`}
              >
                {t('photoGallery') || 'Gallery'}
              </Link>
              <Link 
                to="/certifications" 
                className={`transition-all duration-200 px-3 py-2 text-sm font-semibold border-b-2 ${
                  isActive('/certifications') 
                    ? 'text-gray-900 border-red-600' 
                    : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-red-600'
                }`}
              >
                {t('certifications') || 'Certifications'}
              </Link>
              {/* <a 
                href="/#about" 
                className="text-gray-600 hover:text-gray-900 transition-all duration-200 px-3 py-2 text-sm font-semibold hover:border-b-2 hover:border-red-600 border-b-2 border-transparent"
              >
                {t('about') || 'About'}
              </a> */}
              <a 
                href="/#contact" 
                className="text-gray-600 hover:text-gray-900 transition-all duration-200 px-3 py-2 text-sm font-semibold hover:border-b-2 hover:border-red-600 border-b-2 border-transparent"
              >
                {t('contact') || 'Contact'}
              </a>
              
              {/* Language Toggle */}
              <div className="mx-3">
                <LanguageToggle />
              </div>
              
              {/* Call Now Button */}
              <a 
                href="tel:+919897011103" 
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2.5 rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-sm"
              >
                <Phone className="w-4 h-4 mr-2" />
                {t('callNow') || 'Call Now'}
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-3">
            <LanguageToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link 
              to="/" 
              className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
                isActive('/') 
                  ? 'text-gray-900 bg-red-50 border-l-4 border-red-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('home') || 'Home'}
            </Link>
            <a 
              href="/#services" 
              className="block px-4 py-3 text-base font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('services') || 'Services'}
            </a>
            <Link 
              to="/packages" 
              className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
                isActive('/packages') 
                  ? 'text-gray-900 bg-red-50 border-l-4 border-red-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('packages') || 'Packages'}
            </Link>
            <Link 
              to="/fleet" 
              className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
                isActive('/fleet') 
                  ? 'text-gray-900 bg-red-50 border-l-4 border-red-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('fleet') || 'Fleet'}
            </Link>
            <Link 
              to="/gallery" 
              className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
                isActive('/gallery') 
                  ? 'text-gray-900 bg-red-50 border-l-4 border-red-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('photoGallery') || 'Gallery'}
            </Link>
            <Link 
              to="/certifications" 
              className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
                isActive('/certifications') 
                  ? 'text-gray-900 bg-red-50 border-l-4 border-red-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('certifications') || 'Certifications'}
            </Link>
           
            <a 
              href="/#contact" 
              className="block px-4 py-3 text-base font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('contact') || 'Contact'}
            </a>
            
            {/* Mobile Call Button */}
            <div className="pt-4">
              <a 
                href="tel:+919897011103" 
                className="block w-full text-center bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-full font-semibold shadow-lg hover:from-red-600 hover:to-red-700 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="w-5 h-5 inline mr-2" />
                {t('callNow') || 'Call Now'}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;