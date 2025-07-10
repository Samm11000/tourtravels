// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Phone, Car, Menu, X } from 'lucide-react';
// import { useLanguage } from '../contexts/LanguageContext';
// import LanguageToggle from './LanguageToggle';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { t } = useLanguage();
//   const location = useLocation();

//   const isActive = (path) => {
//     if (path === '/' && location.pathname === '/') return true;
//     if (path !== '/' && location.pathname.startsWith(path)) return true;
//     return false;
//   };

//   return (
//     <nav className="bg-white shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center">
//             <div className="flex-shrink-0 flex items-center">
//               <Car className="h-8 w-8 text-blue-700 mr-2" />
//               <span className="text-xl font-bold text-gray-900">Maya Tour & Travels</span>
//             </div>
//           </div>
          
//           {/* Desktop Menu */}
//           <div className="hidden lg:block">
//             <div className="ml-10 flex items-center space-x-8">
//               <Link 
//                 to="/" 
//                 className={`transition-colors px-3 py-2 text-sm font-medium border-b-2 ${
//                   isActive('/') 
//                     ? 'text-gray-900 border-blue-700' 
//                     : 'text-gray-600 hover:text-blue-700 border-transparent hover:border-blue-700'
//                 }`}
//               >
//                 {t('home')}
//               </Link>
//               <a 
//                 href="/#services" 
//                 className="text-gray-600 hover:text-blue-700 transition-colors px-3 py-2 text-sm font-medium hover:border-b-2 hover:border-blue-700"
//               >
//                 {t('services')}
//               </a>
//               <Link 
//                 to="/packages" 
//                 className={`transition-colors px-3 py-2 text-sm font-medium border-b-2 ${
//                   isActive('/packages') 
//                     ? 'text-gray-900 border-blue-700' 
//                     : 'text-gray-600 hover:text-blue-700 border-transparent hover:border-blue-700'
//                 }`}
//               >
//                 {t('packages')}
//               </Link>
//               <Link 
//                 to="/fleet" 
//                 className={`transition-colors px-3 py-2 text-sm font-medium border-b-2 ${
//                   isActive('/fleet') 
//                     ? 'text-gray-900 border-blue-700' 
//                     : 'text-gray-600 hover:text-blue-700 border-transparent hover:border-blue-700'
//                 }`}
//               >
//                 {t('fleet')}
//               </Link>
//               <a 
//                 href="/#about" 
//                 className="text-gray-600 hover:text-blue-700 transition-colors px-3 py-2 text-sm font-medium hover:border-b-2 hover:border-blue-700"
//               >
//                 {t('about')}
//               </a>
//               <a 
//                 href="/#contact" 
//                 className="text-gray-600 hover:text-blue-700 transition-colors px-3 py-2 text-sm font-medium hover:border-b-2 hover:border-blue-700"
//               >
//                 {t('contact')}
//               </a>
//               <LanguageToggle />
//               <a href="tel:+919368084778" className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-colors flex items-center shadow-lg">
//                 <Phone className="w-4 h-4 mr-2" />
//                 {t('callNow')}
//               </a>
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="lg:hidden">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-gray-600 hover:text-blue-700 focus:outline-none focus:text-blue-700"
//             >
//               {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="lg:hidden bg-white border-t shadow-lg">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             <Link 
//               to="/" 
//               className={`block px-3 py-2 text-base font-medium hover:text-blue-700 hover:bg-blue-50 rounded-md ${
//                 isActive('/') ? 'text-gray-900' : 'text-gray-600'
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('home')}
//             </Link>
//             <a 
//               href="/#services" 
//               className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-md"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('services')}
//             </a>
//             <Link 
//               to="/packages" 
//               className={`block px-3 py-2 text-base font-medium hover:text-blue-700 hover:bg-blue-50 rounded-md ${
//                 isActive('/packages') ? 'text-gray-900' : 'text-gray-600'
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('packages')}
//             </Link>
//             <Link 
//               to="/fleet" 
//               className={`block px-3 py-2 text-base font-medium hover:text-blue-700 hover:bg-blue-50 rounded-md ${
//                 isActive('/fleet') ? 'text-gray-900' : 'text-gray-600'
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('fleet')}
//             </Link>
//             <a 
//               href="/#about" 
//               className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-md"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('about')}
//             </a>
//             <a 
//               href="/#contact" 
//               className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-md"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('contact')}
//             </a>
//             <div className="px-3 py-2">
//               <LanguageToggle />
//             </div>
//             <a href="tel:+919368084778" className="block px-3 py-2 text-base font-medium bg-blue-700 text-white rounded-lg mx-3 text-center mt-4">
//               {t('callNow')}
//             </a>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

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
            <div className="flex-shrink-0 flex items-center">
              {/* Company Logo - SVG Recreation */}
              <div className="flex items-center">
                {/* Logo Design */}
                <div className="relative mr-3">
                  
                </div>
                
                {/* Company Text */}
                <div>
                  <h1 className="text-xl font-bold">
                    <span className="text-red-600">Maya Tour</span>
                    <span className="text-gray-800"> and </span>
                    <span className="text-red-600">Travels</span>
                  </h1>
                  <p className="text-sm text-gray-600 font-semibold -mt-1">
                    Believe in Service
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link 
                to="/" 
                className={`transition-all duration-200 px-3 py-2 text-sm font-semibold border-b-2 ${
                  isActive('/') 
                    ? 'text-gray-900 border-red-600' 
                    : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-red-600'
                }`}
              >
                {t('home')}
              </Link>
              <a 
                href="/#services" 
                className="text-gray-600 hover:text-gray-900 transition-all duration-200 px-3 py-2 text-sm font-semibold hover:border-b-2 hover:border-red-600 border-b-2 border-transparent"
              >
                {t('services')}
              </a>
              <Link 
                to="/packages" 
                className={`transition-all duration-200 px-3 py-2 text-sm font-semibold border-b-2 ${
                  isActive('/packages') 
                    ? 'text-gray-900 border-red-600' 
                    : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-red-600'
                }`}
              >
                {t('packages')}
              </Link>
              <Link 
                to="/fleet" 
                className={`transition-all duration-200 px-3 py-2 text-sm font-semibold border-b-2 ${
                  isActive('/fleet') 
                    ? 'text-gray-900 border-red-600' 
                    : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-red-600'
                }`}
              >
                {t('fleet')}
              </Link>
              <a 
                href="/#about" 
                className="text-gray-600 hover:text-gray-900 transition-all duration-200 px-3 py-2 text-sm font-semibold hover:border-b-2 hover:border-red-600 border-b-2 border-transparent"
              >
                {t('about')}
              </a>
              <a 
                href="/#contact" 
                className="text-gray-600 hover:text-gray-900 transition-all duration-200 px-3 py-2 text-sm font-semibold hover:border-b-2 hover:border-red-600 border-b-2 border-transparent"
              >
                {t('contact')}
              </a>
              
              {/* Language Toggle */}
              <div className="mx-3">
                <LanguageToggle />
              </div>
              
              {/* Call Now Button */}
              <a 
                href="tel:+919897011103" 
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2.5 rounded-full hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
              >
                <Phone className="w-4 h-4 mr-2" />
                {t('callNow')}
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
                  ? 'text-gray-900 bg-gray-100' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('home')}
            </Link>
            <a 
              href="/#services" 
              className="block px-4 py-3 text-base font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('services')}
            </a>
            <Link 
              to="/packages" 
              className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
                isActive('/packages') 
                  ? 'text-gray-900 bg-gray-100' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('packages')}
            </Link>
            <Link 
              to="/fleet" 
              className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
                isActive('/fleet') 
                  ? 'text-gray-900 bg-gray-100' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('fleet')}
            </Link>
            <a 
              href="/#about" 
              className="block px-4 py-3 text-base font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('about')}
            </a>
            <a 
              href="/#contact" 
              className="block px-4 py-3 text-base font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('contact')}
            </a>
            
            {/* Mobile Call Button */}
            <div className="pt-4">
              <a 
                href="tel:+919897011103" 
                className="block w-full text-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-full font-semibold shadow-lg hover:from-yellow-600 hover:to-orange-600 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="w-5 h-5 inline mr-2" />
                {t('callNow')}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;