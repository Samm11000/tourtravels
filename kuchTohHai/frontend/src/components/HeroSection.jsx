

// import React, { useState, useEffect } from "react";
// import {
//   ArrowRight,
//   Phone,
//   MessageCircle,
//   Users,
//   MapPin,
//   Headphones,
// } from "lucide-react";
// import { useLanguage } from "../contexts/LanguageContext";
// import BookingForm from "./BookingForm";

// const HeroSection = () => {
//   const { t } = useLanguage();
  
//   // Typing animation state
//   const [displayText, setDisplayText] = useState("");
//   const [isTyping, setIsTyping] = useState(true);
//   const fullText = "MAYA TOUR AND TRAVELS";
  
//   useEffect(() => {
//     let index = 0;
//     const timer = setInterval(() => {
//       if (index < fullText.length) {
//         setDisplayText(fullText.slice(0, index + 1));
//         index++;
//       } else {
//         setIsTyping(false);
//         clearInterval(timer);
//       }
//     }, 150);

//     return () => clearInterval(timer);
//   }, []);

//   // Famous places images for carousel
//   const places = [
//     {
//       name: "India Gate, Delhi",
//       image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
//     },
//     {
//       name: "Prem Mandir, Mathura",
//       image: "https://images.unsplash.com/photo-1707938233687-47e61e5ad7c4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     },
//     {
//       name: "Krishna Janmabhoomi, Mathura",
//       image: "https://i.pinimg.com/originals/49/0f/26/490f2691f277de3ef207e3e125b528f1.jpg",
//     },
//     {
//       name: "Red Fort, Delhi",
//       image: "https://images.unsplash.com/photo-1597149346851-8b7afcb2c999?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
//     },
//     {
//       name: "Taj Mahal, Agra",
//       image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
//     },
//     {
//       name: "Lotus Temple, Delhi",
//       image: "https://www.westend61.de/images/0001275052pw/aerial-view-of-lotus-temple-delhi-india-AAEF05615.jpg",
//     },
//     {
//       name: "Iskon Temple, Mathura",
//       image: "https://images.unsplash.com/photo-1695824397018-31fa9e2b7a2e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     },
//     {
//       name: "Agra Fort, Agra",
//       image: "https://i.pinimg.com/originals/cc/bf/a5/ccbfa5fbec6ccd628e210a4ca8eb722c.jpg",
//     }
//   ];

//   return (
//     <section className="relative min-h-screen bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-400 overflow-hidden">
//       {/* Moving Carousel Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="flex animate-carousel">
//           {/* First set of images */}
//           {places.map((place, index) => (
//             <div
//               key={`first-${index}`}
//               className="relative min-w-[500px] h-screen flex-shrink-0"
//             >
//               <div
//                 className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//                 style={{
//                   backgroundImage: `url(${place.image})`,
//                 }}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/60 via-orange-800/60 to-yellow-700/40" />
//             </div>
//           ))}
//           {/* Duplicate set for seamless loop */}
//           {places.map((place, index) => (
//             <div
//               key={`second-${index}`}
//               className="relative min-w-[500px] h-screen flex-shrink-0"
//             >
//               <div
//                 className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//                 style={{
//                   backgroundImage: `url(${place.image})`,
//                 }}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-amber-500/70 via-yellow-400/40 to-orange-400/50" />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Overlay for better text readability */}
//       <div className="absolute inset-0 bg-gradient-to-br from-amber-600/80 via-yellow-500/75 to-orange-500/80" />

//       {/* Pattern Overlay */}
//       <div className="absolute inset-0 opacity-15">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//           }}
//         />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
//         <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
//           {/* Left Content */}
//           <div className="text-white space-y-8 animate-fadeInUp">
//             <div className="space-y-4">
//               <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
//                 <span className="gradient-text bg-gradient-to-r from-yellow-200 via-amber-200 to-orange-200 bg-clip-text text-transparent block drop-shadow-lg">
//                   {displayText}
//                   {isTyping && <span className="animate-pulse text-yellow-200">|</span>}
//                 </span>
//               </h1>
//               <p className="text-xl text-yellow-50 max-w-lg leading-relaxed drop-shadow-md">
//                 {t("heroSubtitle")}
//               </p>
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <a
//                 href="tel:+919368084778"
//                 className="bg-gradient-to-r from-yellow-300 to-amber-400 text-amber-800 px-8 py-4 rounded-xl hover:from-yellow-400 hover:to-amber-500 transition-all transform hover:scale-105 font-semibold flex items-center justify-center shadow-lg group"
//               >
//                 <Phone className="w-5 h-5 mr-2" />
//                 {t("callNow")}
//                 <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
//               </a>
//               <a
//                 href="https://wa.me/919368084778?text=Hello%2C%20Maya%20Tours%20and%20Travels"
//                 className="bg-emerald-500 text-white px-8 py-4 rounded-xl hover:bg-emerald-600 transition-all transform hover:scale-105 font-semibold flex items-center justify-center shadow-lg group"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <MessageCircle className="w-5 h-5 mr-2" />
//                 {t("whatsapp")}
//                 <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
//               </a>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-3 gap-6 pt-8">
//               <div className="text-center">
//                 <div className="bg-yellow-200 bg-opacity-25 rounded-xl p-4 backdrop-blur-sm border border-yellow-300/40 hover:bg-opacity-35 transition-all transform hover:scale-105 shadow-lg">
//                   <Users className="w-8 h-8 text-yellow-200 mx-auto mb-2 drop-shadow" />
//                   <div className="text-2xl font-bold text-white drop-shadow">500+</div>
//                   <div className="text-sm text-yellow-100 drop-shadow">
//                     {t("happyCustomers")}
//                   </div>
//                 </div>
//               </div>
//               <div className="text-center">
//                 <div className="bg-amber-200 bg-opacity-25 rounded-xl p-4 backdrop-blur-sm border border-amber-300/40 hover:bg-opacity-35 transition-all transform hover:scale-105 shadow-lg">
//                   <MapPin className="w-8 h-8 text-amber-200 mx-auto mb-2 drop-shadow" />
//                   <div className="text-2xl font-bold text-white drop-shadow">50+</div>
//                   <div className="text-sm text-amber-100 drop-shadow">
//                     {t("citiesCovered")}
//                   </div>
//                 </div>
//               </div>
//               <div className="text-center">
//                 <div className="bg-orange-200 bg-opacity-25 rounded-xl p-4 backdrop-blur-sm border border-orange-300/40 hover:bg-opacity-35 transition-all transform hover:scale-105 shadow-lg">
//                   <Headphones className="w-8 h-8 text-orange-200 mx-auto mb-2 drop-shadow" />
//                   <div className="text-2xl font-bold text-white drop-shadow">24/7</div>
//                   <div className="text-sm text-orange-100 drop-shadow">{t("support")}</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Content - Booking Form */}
//           <div className="flex justify-center lg:justify-end">
//             <BookingForm />
//           </div>
//         </div>
//       </div>

//       {/* Custom CSS for carousel animation */}
//       <style jsx>{`
//         @keyframes carousel {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-4000px);
//           }
//         }
        
//         .animate-carousel {
//           animation: carousel 40s linear infinite;
//         }
        
//         .animate-carousel:hover {
//           animation-play-state: paused;
//         }

//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-fadeInUp {
//           animation: fadeInUp 1s ease-out forwards;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default HeroSection;






import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Phone,
  MessageCircle,
  Users,
  MapPin,
  Headphones,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import BookingForm from "./BookingForm";
import logo from "./photos/logo.png";

const HeroSection = () => {
  const { t } = useLanguage();
  
  // Logo animation state
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    // Simulate logo loading and trigger animations
    const logoTimer = setTimeout(() => {
      setLogoLoaded(true);
    }, 500);

    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  // Famous places images for carousel
  const places = [
    {
      name: "India Gate, Delhi",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Prem Mandir, Mathura",
      image: "https://images.unsplash.com/photo-1707938233687-47e61e5ad7c4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Krishna Janmabhoomi, Mathura",
      image: "https://i.pinimg.com/originals/49/0f/26/490f2691f277de3ef207e3e125b528f1.jpg",
    },
    {
      name: "Red Fort, Delhi",
      image: "https://images.unsplash.com/photo-1597149346851-8b7afcb2c999?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Taj Mahal, Agra",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Lotus Temple, Delhi",
      image: "https://www.westend61.de/images/0001275052pw/aerial-view-of-lotus-temple-delhi-india-AAEF05615.jpg",
    },
    {
      name: "Iskon Temple, Mathura",
      image: "https://images.unsplash.com/photo-1695824397018-31fa9e2b7a2e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Agra Fort, Agra",
      image: "https://i.pinimg.com/originals/cc/bf/a5/ccbfa5fbec6ccd628e210a4ca8eb722c.jpg",
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-400 overflow-hidden">
      {/* Moving Carousel Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="flex animate-carousel">
          {/* First set of images */}
          {places.map((place, index) => (
            <div
              key={`first-${index}`}
              className="relative min-w-[500px] h-screen flex-shrink-0"
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${place.image})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/60 via-orange-800/60 to-yellow-700/40" />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {places.map((place, index) => (
            <div
              key={`second-${index}`}
              className="relative min-w-[500px] h-screen flex-shrink-0"
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${place.image})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/70 via-yellow-400/40 to-orange-400/50" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-600/80 via-yellow-500/75 to-orange-500/80" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-15">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="text-white space-y-8">
            {/* Logo Section */}
            <div className="space-y-6">
              <div className={`transform transition-all duration-1000 ${logoLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
                {/* Logo Container with Beautiful Styling */}
                <div className="relative">
                  {/* Glow Effect Behind Logo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/30 via-amber-200/40 to-orange-200/30 blur-3xl rounded-full transform scale-110"></div>
                  
                  {/* Main Logo Container */}
                  <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300">
                    {/* Inner Glow */}
                    <div className="absolute inset-2 bg-gradient-to-r from-yellow-100/20 via-amber-100/20 to-orange-100/20 rounded-2xl"></div>
                    
                    {/* Logo Image */}
                    <div className="relative flex items-center justify-center">
                      <img 
                        src={logo}
                        alt="Maya Tour and Travels Logo"
                        className="h-24 lg:h-32 xl:h-40 w-auto object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
                        onLoad={() => setLogoLoaded(true)}
                      />
                    </div>
                  </div>
                  
                  {/* Floating Particles Effect */}
                  <div className="absolute -top-4 -right-4 w-3 h-3 bg-yellow-300 rounded-full animate-bounce delay-0"></div>
                  <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-amber-300 rounded-full animate-bounce delay-300"></div>
                  <div className="absolute top-1/2 -right-6 w-2 h-2 bg-orange-300 rounded-full animate-bounce delay-700"></div>
                </div>
              </div>

              {/* Subtitle with Animation */}
              <div className={`transform transition-all duration-1000 delay-500 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                <p className="text-xl lg:text-2xl text-yellow-50 max-w-lg leading-relaxed drop-shadow-md font-medium text-center lg:text-left">
                  {t("heroSubtitle")}
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 delay-700 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
              <a
                href="tel:+919368084778"
                className="bg-gradient-to-r from-yellow-300 to-amber-400 text-amber-800 px-8 py-4 rounded-xl hover:from-yellow-400 hover:to-amber-500 transition-all transform hover:scale-105 font-semibold flex items-center justify-center shadow-lg group"
              >
                <Phone className="w-5 h-5 mr-2" />
                {t("callNow")}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://wa.me/919368084778?text=Hello%2C%20Maya%20Tours%20and%20Travels"
                className="bg-emerald-500 text-white px-8 py-4 rounded-xl hover:bg-emerald-600 transition-all transform hover:scale-105 font-semibold flex items-center justify-center shadow-lg group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {t("whatsapp")}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-3 gap-6 pt-8 transform transition-all duration-1000 delay-1000 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
              <div className="text-center">
                <div className="bg-yellow-200 bg-opacity-25 rounded-xl p-4 backdrop-blur-sm border border-yellow-300/40 hover:bg-opacity-35 transition-all transform hover:scale-105 shadow-lg">
                  <Users className="w-8 h-8 text-yellow-200 mx-auto mb-2 drop-shadow" />
                  <div className="text-2xl font-bold text-white drop-shadow">500+</div>
                  <div className="text-sm text-yellow-100 drop-shadow">
                    {t("happyCustomers")}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-amber-200 bg-opacity-25 rounded-xl p-4 backdrop-blur-sm border border-amber-300/40 hover:bg-opacity-35 transition-all transform hover:scale-105 shadow-lg">
                  <MapPin className="w-8 h-8 text-amber-200 mx-auto mb-2 drop-shadow" />
                  <div className="text-2xl font-bold text-white drop-shadow">50+</div>
                  <div className="text-sm text-amber-100 drop-shadow">
                    {t("citiesCovered")}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-orange-200 bg-opacity-25 rounded-xl p-4 backdrop-blur-sm border border-orange-300/40 hover:bg-opacity-35 transition-all transform hover:scale-105 shadow-lg">
                  <Headphones className="w-8 h-8 text-orange-200 mx-auto mb-2 drop-shadow" />
                  <div className="text-2xl font-bold text-white drop-shadow">24/7</div>
                  <div className="text-sm text-orange-100 drop-shadow">{t("support")}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Booking Form */}
          <div className={`flex justify-center lg:justify-end transform transition-all duration-1000 delay-1200 ${showContent ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <BookingForm />
          </div>
        </div>
      </div>

      {/* Custom CSS for carousel animation */}
      <style jsx>{`
        @keyframes carousel {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-4000px);
          }
        }
        
        .animate-carousel {
          animation: carousel 40s linear infinite;
        }
        
        .animate-carousel:hover {
          animation-play-state: paused;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.2), 0 0 60px rgba(255, 193, 7, 0.1);
          }
        }
        
        .animate-glow {
          animation: glow 4s ease-in-out infinite;
        }

        /* Responsive logo sizing */
        @media (max-width: 640px) {
          .logo-container img {
            height: 80px;
          }
        }
        
        @media (min-width: 641px) and (max-width: 1024px) {
          .logo-container img {
            height: 100px;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;