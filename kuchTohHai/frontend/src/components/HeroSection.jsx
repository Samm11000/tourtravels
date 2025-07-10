// import React from "react";
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

//   return (
//     <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-10">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//           }}
//         />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
//         <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
//           {/* Left Content */}
//           <div className="text-white space-y-8 animate-fadeInUp">
//             <div className="space-y-4">
//               <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
//                 {t("heroTitle")}{" "}
//                 <span className="gradient-text bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
//                   {t("heroTitleHighlight")}
//                 </span>
//               </h1>
//               <p className="text-xl text-blue-100 max-w-lg leading-relaxed">
//                 {t("heroSubtitle")}
//               </p>
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <a
//                 href="tel:+919368084778"
//                 className="bg-white text-blue-800 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 font-semibold flex items-center justify-center shadow-lg group"
//               >
//                 <Phone className="w-5 h-5 mr-2" />
//                 {t("callNow")}
//                 <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
//               </a>
//               <a
//                 href="https://wa.me/919368084778?text=Hello%2C%20Maya%20Tours%20and%20Travels"
//                 className="bg-emerald-600 text-white px-8 py-4 rounded-xl hover:bg-emerald-700 transition-all transform hover:scale-105 font-semibold flex items-center justify-center shadow-lg group"
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
//                 <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
//                   <Users className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
//                   <div className="text-2xl font-bold">500+</div>
//                   <div className="text-sm text-blue-200">
//                     {t("happyCustomers")}
//                   </div>
//                 </div>
//               </div>
//               <div className="text-center">
//                 <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
//                   <MapPin className="w-8 h-8 text-green-400 mx-auto mb-2" />
//                   <div className="text-2xl font-bold">50+</div>
//                   <div className="text-sm text-blue-200">
//                     {t("citiesCovered")}
//                   </div>
//                 </div>
//               </div>
//               <div className="text-center">
//                 <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
//                   <Headphones className="w-8 h-8 text-purple-400 mx-auto mb-2" />
//                   <div className="text-2xl font-bold">24/7</div>
//                   <div className="text-sm text-blue-200">{t("support")}</div>
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

//       {/* Decorative Elements */}
//       {/* <div className="absolute bottom-0 left-0 w-full h-32 "></div> */}
//     </section>
//   );
// };

// export default HeroSection;




// import React from "react";
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

//   return (
//     <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
//       {/* Background Image */}
//       <div className="absolute inset-0">
//         <div
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//           style={{
//             backgroundImage: `url('https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
//           }}
//         />
//         {/* Overlay for better text readability */}
//         <div className="absolute inset-0 bg-blue-900 bg-opacity-75"></div>
//       </div>

//       {/* Pattern Overlay */}
//       <div className="absolute inset-0 opacity-10">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//           }}
//         />
//       </div>

//       {/* Floating landmark silhouettes */}
//       <div className="absolute inset-0 opacity-20">
//         {/* India Gate silhouette */}
//         <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-30">
//           <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
//             <path d="M10 90 L90 90 L90 85 L85 85 L85 20 L15 20 L15 85 L10 85 Z M20 25 L80 25 L80 80 L20 80 Z M45 30 L55 30 L55 75 L45 75 Z" />
//           </svg>
//         </div>
        
//         {/* Red Fort silhouette */}
//         <div className="absolute top-1/3 right-1/4 w-24 h-24 opacity-25">
//           <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
//             <path d="M10 90 L90 90 L90 70 L85 70 L85 40 L80 40 L80 30 L75 30 L75 25 L70 25 L70 20 L30 20 L30 25 L25 25 L25 30 L20 30 L20 40 L15 40 L15 70 L10 70 Z" />
//           </svg>
//         </div>

//         {/* Lotus Temple silhouette */}
//         <div className="absolute bottom-1/4 left-1/5 w-28 h-28 opacity-20">
//           <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
//             <path d="M50 10 L60 30 L70 20 L80 40 L90 35 L85 55 L95 65 L75 70 L80 85 L60 80 L50 95 L40 80 L20 85 L25 70 L5 65 L15 55 L10 35 L20 40 L30 20 L40 30 Z" />
//           </svg>
//         </div>

//         {/* Qutub Minar silhouette */}
//         <div className="absolute top-1/2 right-1/5 w-16 h-40 opacity-30">
//           <svg viewBox="0 0 50 100" className="w-full h-full fill-white">
//             <path d="M20 5 L30 5 L32 95 L18 95 Z M15 10 L35 10 L35 15 L15 15 Z M17 25 L33 25 L33 30 L17 30 Z M19 45 L31 45 L31 50 L19 50 Z M21 65 L29 65 L29 70 L21 70 Z M22 85 L28 85 L28 90 L22 90 Z" />
//           </svg>
//         </div>

//         {/* Car/Taxi silhouettes */}
//         <div className="absolute bottom-1/3 right-1/3 w-20 h-12 opacity-15">
//           <svg viewBox="0 0 100 60" className="w-full h-full fill-white">
//             <path d="M10 45 L20 45 L20 35 L25 20 L75 20 L80 35 L80 45 L90 45 L90 50 L85 50 C85 55 80 60 75 60 C70 60 65 55 65 50 L35 50 C35 55 30 60 25 60 C20 60 15 55 15 50 L10 50 Z M30 25 L70 25 L70 35 L30 35 Z" />
//           </svg>
//         </div>
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
//         <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
//           {/* Left Content */}
//           <div className="text-white space-y-8 animate-fadeInUp">
//             <div className="space-y-4">
//               <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
//                 {t("heroTitle")}{" "}
//                 <span className="gradient-text bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
//                   {t("heroTitleHighlight")}
//                 </span>
//               </h1>
//               <p className="text-xl text-blue-100 max-w-lg leading-relaxed">
//                 {t("heroSubtitle")}
//               </p>
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <a
//                 href="tel:+919368084778"
//                 className="bg-white text-blue-800 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 font-semibold flex items-center justify-center shadow-lg group"
//               >
//                 <Phone className="w-5 h-5 mr-2" />
//                 {t("callNow")}
//                 <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
//               </a>
//               <a
//                 href="https://wa.me/919368084778?text=Hello%2C%20Maya%20Tours%20and%20Travels"
//                 className="bg-emerald-600 text-white px-8 py-4 rounded-xl hover:bg-emerald-700 transition-all transform hover:scale-105 font-semibold flex items-center justify-center shadow-lg group"
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
//                 <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
//                   <Users className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
//                   <div className="text-2xl font-bold">500+</div>
//                   <div className="text-sm text-blue-200">
//                     {t("happyCustomers")}
//                   </div>
//                 </div>
//               </div>
//               <div className="text-center">
//                 <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
//                   <MapPin className="w-8 h-8 text-green-400 mx-auto mb-2" />
//                   <div className="text-2xl font-bold">50+</div>
//                   <div className="text-sm text-blue-200">
//                     {t("citiesCovered")}
//                   </div>
//                 </div>
//               </div>
//               <div className="text-center">
//                 <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
//                   <Headphones className="w-8 h-8 text-purple-400 mx-auto mb-2" />
//                   <div className="text-2xl font-bold">24/7</div>
//                   <div className="text-sm text-blue-200">{t("support")}</div>
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

//       {/* Decorative Elements */}
//       {/* <div className="absolute bottom-0 left-0 w-full h-32 "></div> */}
//     </section>
//   );
// };

// export default HeroSection;



// import React from "react";
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

//   // Temple images for carousel
//   const temples = [
//     {
//       name: "Shree Krishna Janmabhoomi Temple",
//       image: "https://images.unsplash.com/photo-1582552531148-fed05bd32a96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
//     },
//     {
//       name: "Prem Mandir",
//       image: "https://images.unsplash.com/photo-1616167424828-3f357e2e4fb5?ixlib=rb-4.0.2&auto=format&fit=crop&w=1200&q=80",
//     },
//     {
//       name: "ISKCON Temple",
//       image: "https://images.unsplash.com/photo-1591629742901-1b26b3d4a4b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
//     },
//     {
//       name: "Banke Bihari Temple",
//       image: "https://images.unsplash.com/photo-1579422422 532-4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
//     },
//     {
//       name: "Radha Raman Temple",
//       image: "https://images.unsplash.com/photo-1584477204929-236db82f5b46?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
//     },
//     {
//       name: "Govind Dev Ji Temple",
//       image: "https://images.unsplash.com/photo-1581902425250-2c4e8e4baa42?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=2",
//     },
//   ];

//   return (
//     <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
//       {/* Moving Carousel Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="flex animate-carousel">
//           {/* First set of images */}
//           {temples.map((temple, index) => (
//             <div
//               key={`first-${index}`}
//               className="relative min-w-[400px] h-screen flex-shrink-0"
//             >
//               <div
//                 className="absolute inset-0 bg-cover bg-center"
//                 style={{
//                   backgroundImage: `url(${temple.image})`,
//                 }}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
//               <div className="absolute bottom-10 left-6 text-white">
//                 <h3 className="text-2xl font-bold text-orange-300 mb-2">{temple.name}</h3>
//                 <p className="text-sm text-blue-200 font-semibold">Experience Divine Mathura</p>
//               </div>
//             </div>
//           ))}
//           {/* Duplicate set for seamless loop */}
//           {temples.map((temple, index) => (
//             <div
//               key={`second-${index}`}
//               className="relative min-w-[400px] h-screen flex-shrink-0"
//             >
//               <div
//                 className="absolute inset-0 bg-cover bg-center"
//                 style={{
//                   backgroundImage: `url(${temple.image})`,
//                 }}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
//               <div className="absolute bottom-10 left-6 text-white">
//                 <h3 className="text-2xl font-bold text-orange-300 mb-2">{temple.name}</h3>
//                 <p className="text-sm text-blue-200 font-semibold">Experience Divine Mathura</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-blue-700/90" />

//       {/* Pattern Overlay */}
//       <div className="absolute inset-0 opacity-10">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/2008%3E")`
//           }}
//         />
//       </div>

//       {/* Company Branding */}
//       <div className="absolute top-8 left-8 text-white z-10">
//         <div className="flex items-center space-x-3">
//           <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
//             <span className="text-white font-bold text-xl">M</span>
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold text-white">MAYA TOUR AND TRAVEL</h2>
//             <p className="text-sm text-yellow-400 font-semibold tracking-wide">BELIEVE IN SERVICE</p>
//           </div>
//         </div>
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
//         <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
//           {/* Left Content */}
//           <div className="text-white space-y-8 animate-fadeInUp">
//             <div className="space-y-4">
//               <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
//                 {t("heroTitle")}{" "}
//                 <span className="gradient-text bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
//                   {t("heroTitleHighlight")}
//                 </span>
//               </h1>
//               <p className="text-xl text-blue-100 max-w-lg leading-relaxed">
//                 {t("heroSubtitle")}
//               </p>
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <a
//                 href="tel:+919368084778"
//                 className="bg-white text-blue-800 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 font-semibold flex items-center justify-center shadow-lg group"
//               >
//                 <Phone className="w-5 h-5 mr-2" />
//                 {t("callNow")}
//                 <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
//               </a>
//               <a
//                 href="https://wa.me/919368084778?text=Hello%2C%20Maya%20Tours%20and%20Travels"
//                 className="bg-emerald-600 text-white px-8 py-4 rounded-xl hover:bg-emerald-700 transition-all transform hover:scale-105 font-semibold flex items-center justify-center shadow-lg group"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <MessageCircle className="w-5 h-5 mr-2" />
//                 {t("whatsapp")}
//                 {/* <ArrowRange className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" /> */}
//                 <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />

//               </a>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-3 gap-6 pt-8">
//               <div className="text-center">
//                 <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
//                   <Users className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
//                   <div className="text-2xl font-bold">500+</div>
//                   <div className="text-sm text-blue-200">
//                     {t("happyCustomers")}
//                   </div>
//                 </div>
//               </div>
//               <div className="text-center">
//                 <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
//                   <MapPin className="w-8 h-8 text-green-400 mx-auto mb-2" />
//                   <div className="text-2xl font-brand">50+</div>
//                   <div className="text-sm text-blue-200">
//                     {t("citiesCovered")}
//                   </div>
//                 </div>
//               </div>
//               <div className="text-center">
//                 <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
//                   <Headphones className="w-8 h-8 text-purple-400 mx-auto mb-2" />
//                   <div className="text-2xl font-bold">24/7</div>
//                   <div className="text-sm text-blue-200">{t("support")}</div>
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
//             transform: translateX(-2400px);
//           }
//         }
        
//         .animate-carousel {
//           animation: carousel 30s linear infinite;
//         }
        
//         .animate-carousel:hover {
//           animation-play-state: paused;
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

const HeroSection = () => {
  const { t } = useLanguage();
  
  // Typing animation state
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "WE BELIEVE IN SERVICE";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 150);

    return () => clearInterval(timer);
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
          <div className="text-white space-y-8 animate-fadeInUp">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="gradient-text bg-gradient-to-r from-yellow-200 via-amber-200 to-orange-200 bg-clip-text text-transparent block drop-shadow-lg">
                  {displayText}
                  {isTyping && <span className="animate-pulse text-yellow-200">|</span>}
                </span>
              </h1>
              <p className="text-xl text-yellow-50 max-w-lg leading-relaxed drop-shadow-md">
                {t("heroSubtitle")}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
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
            <div className="grid grid-cols-3 gap-6 pt-8">
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
          <div className="flex justify-center lg:justify-end">
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

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;