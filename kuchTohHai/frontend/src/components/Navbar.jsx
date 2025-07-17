

// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Phone, Menu, X } from 'lucide-react';
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
//     <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-18">
          
//           {/* Logo Section */}
//           <div className="flex items-center">
//             <div className="flex-shrink-0 flex items-center">
//               {/* Company Logo - SVG Recreation */}
//               <div className="flex items-center">
//                 {/* Logo Design */}
//                 <div className="relative mr-3">
                  
//                 </div>
                
//                 {/* Company Text */}
//                 <div>
//                   <h1 className="text-xl font-bold">
//                     <span className="text-red-600">Maya Tour</span>
//                     <span className="text-gray-800"> and </span>
//                     <span className="text-red-600">Travels</span>
//                   </h1>
//                   <p className="text-sm text-gray-600 font-semibold -mt-1">
//                     Believe in Service
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Desktop Menu */}
//           <div className="hidden lg:block">
//             <div className="ml-10 flex items-center space-x-8">
//               <Link 
//                 to="/" 
//                 className={`transition-all duration-200 px-3 py-2 text-sm font-semibold border-b-2 ${
//                   isActive('/') 
//                     ? 'text-gray-900 border-red-600' 
//                     : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-red-600'
//                 }`}
//               >
//                 {t('home')}
//               </Link>
//               <a 
//                 href="/#services" 
//                 className="text-gray-600 hover:text-gray-900 transition-all duration-200 px-3 py-2 text-sm font-semibold hover:border-b-2 hover:border-red-600 border-b-2 border-transparent"
//               >
//                 {t('services')}
//               </a>
//               <Link 
//                 to="/packages" 
//                 className={`transition-all duration-200 px-3 py-2 text-sm font-semibold border-b-2 ${
//                   isActive('/packages') 
//                     ? 'text-gray-900 border-red-600' 
//                     : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-red-600'
//                 }`}
//               >
//                 {t('packages')}
//               </Link>
//               <Link 
//                 to="/fleet" 
//                 className={`transition-all duration-200 px-3 py-2 text-sm font-semibold border-b-2 ${
//                   isActive('/fleet') 
//                     ? 'text-gray-900 border-red-600' 
//                     : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-red-600'
//                 }`}
//               >
//                 {t('fleet')}
//               </Link>
//               <a 
//                 href="/#about" 
//                 className="text-gray-600 hover:text-gray-900 transition-all duration-200 px-3 py-2 text-sm font-semibold hover:border-b-2 hover:border-red-600 border-b-2 border-transparent"
//               >
//                 {t('about')}
//               </a>
//               <a 
//                 href="/#contact" 
//                 className="text-gray-600 hover:text-gray-900 transition-all duration-200 px-3 py-2 text-sm font-semibold hover:border-b-2 hover:border-red-600 border-b-2 border-transparent"
//               >
//                 {t('contact')}
//               </a>
              
//               {/* Language Toggle */}
//               <div className="mx-3">
//                 <LanguageToggle />
//               </div>
              
//               {/* Call Now Button */}
//               <a 
//                 href="tel:+919897011103" 
//                 className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2.5 rounded-full hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
//               >
//                 <Phone className="w-4 h-4 mr-2" />
//                 {t('callNow')}
//               </a>
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="lg:hidden flex items-center space-x-3">
//             <LanguageToggle />
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
//             >
//               {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
//           <div className="px-4 pt-4 pb-6 space-y-2">
//             <Link 
//               to="/" 
//               className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
//                 isActive('/') 
//                   ? 'text-gray-900 bg-gray-100' 
//                   : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('home')}
//             </Link>
//             <a 
//               href="/#services" 
//               className="block px-4 py-3 text-base font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('services')}
//             </a>
//             <Link 
//               to="/packages" 
//               className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
//                 isActive('/packages') 
//                   ? 'text-gray-900 bg-gray-100' 
//                   : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('packages')}
//             </Link>
//             <Link 
//               to="/fleet" 
//               className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
//                 isActive('/fleet') 
//                   ? 'text-gray-900 bg-gray-100' 
//                   : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('fleet')}
//             </Link>
//             <a 
//               href="/#about" 
//               className="block px-4 py-3 text-base font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('about')}
//             </a>
//             <a 
//               href="/#contact" 
//               className="block px-4 py-3 text-base font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('contact')}
//             </a>
            
//             {/* Mobile Call Button */}
//             <div className="pt-4">
//               <a 
//                 href="tel:+919897011103" 
//                 className="block w-full text-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-full font-semibold shadow-lg hover:from-yellow-600 hover:to-orange-600 transition-all"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <Phone className="w-5 h-5 inline mr-2" />
//                 {t('callNow')}
//               </a>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Phone, Menu, X } from 'lucide-react';
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
//     <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-18">
          
//           {/* Logo Section */}
//           <div className="flex items-center">
//             <div className="flex-shrink-0 flex items-center">
//               {/* Company Logo - SVG Recreation */}
//               <div className="flex items-center">
//                 {/* Logo Design */}
//                 <div className="relative mr-3">
                  
//                 </div>
                
//                 {/* Company Text */}
//                 <div>
//                   <h1 className="text-xl font-bold">
//                     <span className="text-red-600">Maya Tour</span>
//                     <span className="text-gray-800"> and </span>
//                     <span className="text-red-600">Travels</span>
//                   </h1>
//                   <p className="text-sm text-gray-600 font-semibold -mt-1">
//                     Believe in Service
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Desktop Menu */}
//           <div className="hidden lg:block">
//             <div className="ml-10 flex items-center space-x-8">
//               <Link 
//                 to="/" 
//                 className={`transition-all duration-200 px-3 py-2 text-sm font-semibold border-b-2 ${
//                   isActive('/') 
//                     ? 'text-gray-900 border-red-600' 
//                     : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-red-600'
//                 }`}
//               >
//                 {t('home')}
//               </Link>
//               <a 
//                 href="/#services" 
//                 className="text-gray-600 hover:text-gray-900 transition-all duration-200 px-3 py-2 text-sm font-semibold hover:border-b-2 hover:border-red-600 border-b-2 border-transparent"
//               >
//                 {t('services')}
//               </a>
//               <Link 
//                 to="/packages" 
//                 className={`transition-all duration-200 px-3 py-2 text-sm font-semibold border-b-2 ${
//                   isActive('/packages') 
//                     ? 'text-gray-900 border-red-600' 
//                     : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-red-600'
//                 }`}
//               >
//                 {t('packages')}
//               </Link>
//               <Link 
//                 to="/fleet" 
//                 className={`transition-all duration-200 px-3 py-2 text-sm font-semibold border-b-2 ${
//                   isActive('/fleet') 
//                     ? 'text-gray-900 border-red-600' 
//                     : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-red-600'
//                 }`}
//               >
//                 {t('fleet')}
//               </Link>
//               <Link 
//                 to="/gallery" 
//                 className={`transition-all duration-200 px-3 py-2 text-sm font-semibold border-b-2 ${
//                   isActive('/gallery') 
//                     ? 'text-gray-900 border-red-600' 
//                     : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-red-600'
//                 }`}
//               >
//                 {t('photoGallery') || 'Photo Gallery'}
//               </Link>
//               <Link 
//                 to="/certifications" 
//                 className={`transition-all duration-200 px-3 py-2 text-sm font-semibold border-b-2 ${
//                   isActive('/certifications') 
//                     ? 'text-gray-900 border-red-600' 
//                     : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-red-600'
//                 }`}
//               >
//                 {t('certifications') || 'Certifications'}
//               </Link>
//               <a 
//                 href="/#about" 
//                 className="text-gray-600 hover:text-gray-900 transition-all duration-200 px-3 py-2 text-sm font-semibold hover:border-b-2 hover:border-red-600 border-b-2 border-transparent"
//               >
//                 {t('about')}
//               </a>
//               <a 
//                 href="/#contact" 
//                 className="text-gray-600 hover:text-gray-900 transition-all duration-200 px-3 py-2 text-sm font-semibold hover:border-b-2 hover:border-red-600 border-b-2 border-transparent"
//               >
//                 {t('contact')}
//               </a>
              
//               {/* Language Toggle */}
//               <div className="mx-3">
//                 <LanguageToggle />
//               </div>
              
//               {/* Call Now Button */}
//               <a 
//                 href="tel:+919897011103" 
//                 className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2.5 rounded-full hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
//               >
//                 <Phone className="w-4 h-4 mr-2" />
//                 {t('callNow')}
//               </a>
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="lg:hidden flex items-center space-x-3">
//             <LanguageToggle />
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
//             >
//               {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
//           <div className="px-4 pt-4 pb-6 space-y-2">
//             <Link 
//               to="/" 
//               className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
//                 isActive('/') 
//                   ? 'text-gray-900 bg-gray-100' 
//                   : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('home')}
//             </Link>
//             <a 
//               href="/#services" 
//               className="block px-4 py-3 text-base font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('services')}
//             </a>
//             <Link 
//               to="/packages" 
//               className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
//                 isActive('/packages') 
//                   ? 'text-gray-900 bg-gray-100' 
//                   : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('packages')}
//             </Link>
//             <Link 
//               to="/fleet" 
//               className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
//                 isActive('/fleet') 
//                   ? 'text-gray-900 bg-gray-100' 
//                   : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('fleet')}
//             </Link>
//             <Link 
//               to="/gallery" 
//               className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
//                 isActive('/gallery') 
//                   ? 'text-gray-900 bg-gray-100' 
//                   : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('photoGallery') || 'Photo Gallery'}
//             </Link>
//             <Link 
//               to="/certifications" 
//               className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
//                 isActive('/certifications') 
//                   ? 'text-gray-900 bg-gray-100' 
//                   : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('certifications') || 'Certifications'}
//             </Link>
//             <a 
//               href="/#about" 
//               className="block px-4 py-3 text-base font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('about')}
//             </a>
//             <a 
//               href="/#contact" 
//               className="block px-4 py-3 text-base font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('contact')}
//             </a>
            
//             {/* Mobile Call Button */}
//             <div className="pt-4">
//               <a 
//                 href="tel:+919897011103" 
//                 className="block w-full text-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-full font-semibold shadow-lg hover:from-yellow-600 hover:to-orange-600 transition-all"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <Phone className="w-5 h-5 inline mr-2" />
//                 {t('callNow')}
//               </a>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;








// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Phone, Menu, X } from 'lucide-react';
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
//     <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-18">
          
//           {/* Logo Section */}
//           <div className="flex items-center">
//             <div className="flex-shrink-0 flex items-center">
//               {/* Company Logo - SVG Recreation */}
//               <div className="flex items-center">
//                 {/* Logo Design */}
//                 <div className="relative mr-3">
                  
//                 </div>
                
//                 {/* Company Text */}
//                 <div>
//                   <h1 className="text-xl font-bold">
//                     <span className="text-red-600">Maya Tour</span>
//                     <span className="text-gray-800"> and </span>
//                     <span className="text-red-600">Travels</span>
//                   </h1>
//                   <p className="text-sm text-gray-600 font-semibold -mt-1">
//                     Believe in Service
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Desktop Menu */}
//           <div className="hidden lg:block">
//             <div className="ml-10 flex items-center space-x-8">
//               <Link 
//                 to="/" 
//                 className={`transition-all duration-200 px-3 py-2 text-sm font-semibold border-b-2 ${
//                   isActive('/') 
//                     ? 'text-gray-900 border-red-600' 
//                     : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-red-600'
//                 }`}
//               >
//                 {t('home')}
//               </Link>
//               <a 
//                 href="/#services" 
//                 className="text-gray-600 hover:text-gray-900 transition-all duration-200 px-3 py-2 text-sm font-semibold hover:border-b-2 hover:border-red-600 border-b-2 border-transparent"
//               >
//                 {t('services')}
//               </a>
//               <Link 
//                 to="/packages" 
//                 className={`transition-all duration-200 px-3 py-2 text-sm font-semibold border-b-2 ${
//                   isActive('/packages') 
//                     ? 'text-gray-900 border-red-600' 
//                     : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-red-600'
//                 }`}
//               >
//                 {t('packages')}
//               </Link>
//               <Link 
//                 to="/fleet" 
//                 className={`transition-all duration-200 px-3 py-2 text-sm font-semibold border-b-2 ${
//                   isActive('/fleet') 
//                     ? 'text-gray-900 border-red-600' 
//                     : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-red-600'
//                 }`}
//               >
//                 {t('fleet')}
//               </Link>
//               <Link 
//                 to="/gallery" 
//                 className={`transition-all duration-200 px-3 py-2 text-sm font-semibold border-b-2 ${
//                   isActive('/gallery') 
//                     ? 'text-gray-900 border-red-600' 
//                     : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-red-600'
//                 }`}
//               >
//                 {t('photoGallery') || 'Photo Gallery'}
//               </Link>
//               <Link 
//                 to="/certifications" 
//                 className={`transition-all duration-200 px-3 py-2 text-sm font-semibold border-b-2 ${
//                   isActive('/certifications') 
//                     ? 'text-gray-900 border-red-600' 
//                     : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-red-600'
//                 }`}
//               >
//                 {t('certifications') || 'Certifications'}
//               </Link>
//               <a 
//                 href="/#about" 
//                 className="text-gray-600 hover:text-gray-900 transition-all duration-200 px-3 py-2 text-sm font-semibold hover:border-b-2 hover:border-red-600 border-b-2 border-transparent"
//               >
//                 {t('about')}
//               </a>
//               <a 
//                 href="/#contact" 
//                 className="text-gray-600 hover:text-gray-900 transition-all duration-200 px-3 py-2 text-sm font-semibold hover:border-b-2 hover:border-red-600 border-b-2 border-transparent"
//               >
//                 {t('contact')}
//               </a>
              
//               {/* Language Toggle */}
//               <div className="mx-3">
//                 <LanguageToggle />
//               </div>
              
//               {/* Call Now Button */}
//               <a 
//                 href="tel:+919897011103" 
//                 className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2.5 rounded-full hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
//               >
//                 <Phone className="w-4 h-4 mr-2" />
//                 {t('callNow')}
//               </a>
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="lg:hidden flex items-center space-x-3">
//             <LanguageToggle />
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
//             >
//               {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
//           <div className="px-4 pt-4 pb-6 space-y-2">
//             <Link 
//               to="/" 
//               className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
//                 isActive('/') 
//                   ? 'text-gray-900 bg-gray-100' 
//                   : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('home')}
//             </Link>
//             <a 
//               href="/#services" 
//               className="block px-4 py-3 text-base font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('services')}
//             </a>
//             <Link 
//               to="/packages" 
//               className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
//                 isActive('/packages') 
//                   ? 'text-gray-900 bg-gray-100' 
//                   : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('packages')}
//             </Link>
//             <Link 
//               to="/fleet" 
//               className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
//                 isActive('/fleet') 
//                   ? 'text-gray-900 bg-gray-100' 
//                   : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('fleet')}
//             </Link>
//             <Link 
//               to="/gallery" 
//               className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
//                 isActive('/gallery') 
//                   ? 'text-gray-900 bg-gray-100' 
//                   : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('photoGallery') || 'Photo Gallery'}
//             </Link>
//             <Link 
//               to="/certifications" 
//               className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
//                 isActive('/certifications') 
//                   ? 'text-gray-900 bg-gray-100' 
//                   : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('certifications') || 'Certifications'}
//             </Link>
//             <a 
//               href="/#about" 
//               className="block px-4 py-3 text-base font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('about')}
//             </a>
//             <a 
//               href="/#contact" 
//               className="block px-4 py-3 text-base font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t('contact')}
//             </a>
            
//             {/* Mobile Call Button */}
//             <div className="pt-4">
//               <a 
//                 href="tel:+919897011103" 
//                 className="block w-full text-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-full font-semibold shadow-lg hover:from-yellow-600 hover:to-orange-600 transition-all"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <Phone className="w-5 h-5 inline mr-2" />
//                 {t('callNow')}
//               </a>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;




// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Phone, Menu, X, ChevronDown } from 'lucide-react';
// import { useLanguage } from '../contexts/LanguageContext';
// import LanguageToggle from './LanguageToggle';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
//   const { t } = useLanguage();
//   const location = useLocation();

//   const isActive = (path) => {
//     if (path === '/' && location.pathname === '/') return true;
//     if (path !== '/' && location.pathname.startsWith(path)) return true;
//     return false;
//   };

//   const closeMenus = () => {
//     setIsMenuOpen(false);
//     setIsMoreDropdownOpen(false);
//   };

//   return (
//     <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
          
//           {/* Logo Section */}
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center">
//               <div className="flex items-center">
//                 {/* Logo Image */}
//                 <div className="relative mr-4 flex-shrink-0">
//                   <img 
//                     src="/components/logo.png" 
//                     alt="Maya Tour and Travels Logo"
//                     className="h-12 w-auto"
//                     onError={(e) => {
//                       e.target.style.display = 'none';
//                     }}
//                   />
//                 </div>
                
//                 {/* Company Text */}
//                 <div>
//                   <h1 className="text-xl font-bold leading-tight">
//                     <span className="text-red-600">Maya Tour</span>
//                     <span className="text-gray-800"> and </span>
//                     <span className="text-red-600">Travels</span>
//                   </h1>
//                   <p className="text-sm text-gray-600 font-medium -mt-1">
//                     Believe in Service
//                   </p>
//                 </div>
//               </div>
//             </Link>
//           </div>
          
//           {/* Desktop Menu */}
//           <div className="hidden lg:block">
//             <div className="flex items-center space-x-6">
//               <Link 
//                 to="/" 
//                 className={`transition-all duration-200 px-3 py-2 text-sm font-semibold border-b-2 ${
//                   isActive('/') 
//                     ? 'text-gray-900 border-red-600' 
//                     : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-red-600'
//                 }`}
//               >
//                 {t('home') || 'Home'}
//               </Link>
              
//               <Link 
//                 to="/packages" 
//                 className={`transition-all duration-200 px-3 py-2 text-sm font-semibold border-b-2 ${
//                   isActive('/packages') 
//                     ? 'text-gray-900 border-red-600' 
//                     : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-red-600'
//                 }`}
//               >
//                 {t('packages') || 'Packages'}
//               </Link>
              
//               <Link 
//                 to="/fleet" 
//                 className={`transition-all duration-200 px-3 py-2 text-sm font-semibold border-b-2 ${
//                   isActive('/fleet') 
//                     ? 'text-gray-900 border-red-600' 
//                     : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-red-600'
//                 }`}
//               >
//                 {t('fleet') || 'Fleet'}
//               </Link>

//               {/* More Dropdown */}
//               <div className="relative">
//                 <button
//                   onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
//                   className="flex items-center text-gray-600 hover:text-gray-900 transition-all duration-200 px-3 py-2 text-sm font-semibold hover:border-b-2 hover:border-red-600 border-b-2 border-transparent"
//                 >
//                   {t('more') || 'More'}
//                   <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isMoreDropdownOpen ? 'rotate-180' : ''}`} />
//                 </button>
                
//                 {isMoreDropdownOpen && (
//                   <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
//                     <Link 
//                       to="/gallery" 
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
//                       onClick={closeMenus}
//                     >
//                       {t('photoGallery') || 'Photo Gallery'}
//                     </Link>
//                     <Link 
//                       to="/certifications" 
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
//                       onClick={closeMenus}
//                     >
//                       {t('certifications') || 'Certifications'}
//                     </Link>
//                     <a 
//                       href="/#about" 
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
//                       onClick={closeMenus}
//                     >
//                       {t('about') || 'About'}
//                     </a>
//                     <a 
//                       href="/#contact" 
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
//                       onClick={closeMenus}
//                     >
//                       {t('contact') || 'Contact'}
//                     </a>
//                   </div>
//                 )}
//               </div>
              
//               {/* Language Toggle */}
//               <div className="mx-2">
//                 <LanguageToggle />
//               </div>
              
//               {/* Call Now Button */}
//               <a 
//                 href="tel:+919897011103" 
//                 className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2.5 rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-sm"
//               >
//                 <Phone className="w-4 h-4 mr-2" />
//                 {t('callNow') || 'Call Now'}
//               </a>
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="lg:hidden flex items-center space-x-3">
//             <LanguageToggle />
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
//             >
//               {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
//           <div className="px-4 pt-4 pb-6 space-y-2">
//             <Link 
//               to="/" 
//               className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
//                 isActive('/') 
//                   ? 'text-gray-900 bg-red-50 border-l-4 border-red-600' 
//                   : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//               }`}
//               onClick={closeMenus}
//             >
//               {t('home') || 'Home'}
//             </Link>
            
//             <Link 
//               to="/packages" 
//               className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
//                 isActive('/packages') 
//                   ? 'text-gray-900 bg-red-50 border-l-4 border-red-600' 
//                   : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//               }`}
//               onClick={closeMenus}
//             >
//               {t('packages') || 'Packages'}
//             </Link>
            
//             <Link 
//               to="/fleet" 
//               className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
//                 isActive('/fleet') 
//                   ? 'text-gray-900 bg-red-50 border-l-4 border-red-600' 
//                   : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//               }`}
//               onClick={closeMenus}
//             >
//               {t('fleet') || 'Fleet'}
//             </Link>
            
//             <Link 
//               to="/gallery" 
//               className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
//                 isActive('/gallery') 
//                   ? 'text-gray-900 bg-red-50 border-l-4 border-red-600' 
//                   : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//               }`}
//               onClick={closeMenus}
//             >
//               {t('photoGallery') || 'Photo Gallery'}
//             </Link>
            
//             <Link 
//               to="/certifications" 
//               className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all ${
//                 isActive('/certifications') 
//                   ? 'text-gray-900 bg-red-50 border-l-4 border-red-600' 
//                   : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//               }`}
//               onClick={closeMenus}
//             >
//               {t('certifications') || 'Certifications'}
//             </Link>
            
//             <a 
//               href="/#about" 
//               className="block px-4 py-3 text-base font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
//               onClick={closeMenus}
//             >
//               {t('about') || 'About'}
//             </a>
            
//             <a 
//               href="/#contact" 
//               className="block px-4 py-3 text-base font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
//               onClick={closeMenus}
//             >
//               {t('contact') || 'Contact'}
//             </a>
            
//             {/* Mobile Call Button */}
//             <div className="pt-4">
//               <a 
//                 href="tel:+919897011103" 
//                 className="block w-full text-center bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-full font-semibold shadow-lg hover:from-red-600 hover:to-red-700 transition-all"
//                 onClick={closeMenus}
//               >
//                 <Phone className="w-5 h-5 inline mr-2" />
//                 {t('callNow') || 'Call Now'}
//               </a>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Overlay for dropdown */}
//       {isMoreDropdownOpen && (
//         <div 
//           className="fixed inset-0 z-40" 
//           onClick={() => setIsMoreDropdownOpen(false)}
//         ></div>
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