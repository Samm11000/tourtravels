// import React from 'react';
// import { Users, Star, ArrowRight } from 'lucide-react';
// import { useLanguage } from '../contexts/LanguageContext';
// import { useSelector } from 'react-redux';
// import useGetAllCars from '../hooks/useGetAllCars';
// import { useNavigate } from 'react-router-dom';
// const FleetSection = ({ onViewMore, onVehicleClick }) => {
//   const { t } = useLanguage();
//   const { loading, error } = useGetAllCars(); // fetch cars
//   const cars = useSelector((state) => state.cars.cars); // get from Redux
//   const navigate = useNavigate();

//   if (loading) return <p className="text-center py-10">{t('loading')}...</p>;
//   if (error) return <p className="text-center text-red-600 py-10">{error}</p>;

//   return (
//     <section id="fleet" className="py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('ourFleet')}</h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             {t('fleetSubtitle')}
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//           {cars.slice(0, 3).map(vehicle => (
//             <div key={vehicle._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden group cursor-pointer">
//               <div className="relative h-48 overflow-hidden">
//                 <img 
//                   src={vehicle.photos[0]} 
//                   alt={vehicle.name}
//                   className="w-full h-full object-cover transition-transform group-hover:scale-110"
//                 />
//                 <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
//                   ₹{vehicle.mileage}/km
//                 </div>
//                 <div className="absolute top-4 left-4 bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded-full flex items-center">
//                   <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
//                   <span className="text-xs font-medium">{vehicle.rating}</span>
//                 </div>
//               </div>

//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">{vehicle.name}</h3>
//                 <p className="text-gray-600 mb-3 flex items-center">
//                   <Users className="w-4 h-4 mr-2" />
//                   {vehicle.seatingCapacity} Seater
//                 </p>

//                 <div className="flex flex-wrap gap-1 mb-4">
//                   {vehicle.features?.map((feature, idx) => (
//                     <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
//                       {feature}
//                     </span>
//                   ))}
//                 </div>

//                 <button 
//                   onClick={() => navigate(`/vehicle/${vehicle._id}`, { state: { from: 'home' } })}
//                   className="w-full bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800 transition-colors font-semibold"
//                 >
//                   {t('viewDetails')}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="text-center">
//           <button 
//             onClick={onViewMore}
//             className="bg-gradient-to-r from-blue-700 to-blue-800 text-white px-8 py-4 rounded-xl hover:from-blue-800 hover:to-blue-900 transition-all font-semibold flex items-center mx-auto group shadow-lg"
//           >
//             {t('viewMoreCars')}
//             <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FleetSection;



import React, { useState, useEffect } from 'react';
import { Users, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSelector } from 'react-redux';
import useGetAllCars from '../hooks/useGetAllCars';
import { useNavigate } from 'react-router-dom';

const FleetSection = ({ onViewMore, onVehicleClick }) => {
  const { t } = useLanguage();
  const { loading, error } = useGetAllCars();
  const cars = useSelector((state) => state.cars.cars);
  const navigate = useNavigate();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating || cars.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % cars.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handlePrev = () => {
    if (isAnimating || cars.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + cars.length) % cars.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const getVisibleCars = () => {
    if (cars.length === 0) return [];
    
    const visible = [];
    for (let i = 0; i < Math.min(3, cars.length); i++) {
      const index = (currentIndex + i) % cars.length;
      visible.push({ ...cars[index], displayIndex: i });
    }
    return visible;
  };

  if (loading) return <p className="text-center py-10 text-amber-600 font-semibold text-lg">{t('loading')}...</p>;
  if (error) return <p className="text-center text-red-600 py-10 font-semibold text-lg">{error}</p>;

  return (
    <section id="fleet" className="py-20 bg-gradient-to-b from-amber-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Professional Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('ourFleet')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            {t('fleetSubtitle')}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative mb-16">
          
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            disabled={isAnimating || cars.length <= 3}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white text-amber-600 p-3 rounded-full shadow-lg hover:bg-amber-50 transition-all transform hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed border border-amber-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleNext}
            disabled={isAnimating || cars.length <= 3}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white text-amber-600 p-3 rounded-full shadow-lg hover:bg-amber-50 transition-all transform hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed border border-amber-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cars Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-12">
            {getVisibleCars().map((vehicle, idx) => {
              const isCenter = idx === 1 && cars.length >= 3;
              
              return (
                <div
                  key={`${vehicle._id}-${currentIndex}`}
                  className={`transition-all duration-400 ease-out ${
                    isAnimating ? 'transform translate-x-0' : ''
                  }`}
                >
                  <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 overflow-hidden group cursor-pointer border-2 ${
                    isCenter ? 'border-amber-300 shadow-amber-100 scale-105' : 'border-gray-100'
                  }`}>
                    
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={vehicle.photos?.[0] || '/api/placeholder/400/250'}
                        alt={vehicle.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      
                      {/* Price Badge */}
                      <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                        ₹{vehicle.mileage}/km
                      </div>
                      
                      {/* Rating Badge */}
                      <div className="absolute top-4 left-4 bg-white bg-opacity-95 text-gray-800 px-2 py-1 rounded-full flex items-center shadow-md">
                        <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                        <span className="text-xs font-semibold">{vehicle.rating || '4.8'}</span>
                      </div>

                      {/* Center Card Premium Badge */}
                      
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {vehicle.name}
                      </h3>
                      
                      <p className="text-gray-600 mb-3 flex items-center">
                        <Users className="w-4 h-4 mr-2 text-amber-600" />
                        {vehicle.seatingCapacity} Seater
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {vehicle.features?.slice(0, 3).map((feature, featureIdx) => (
                          <span 
                            key={featureIdx} 
                            className="bg-amber-50 text-amber-700 px-2 py-1 rounded-md text-xs font-medium border border-amber-200"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Button */}
                      <button
                        onClick={() => navigate(`/vehicle/${vehicle._id}`, { state: { from: 'home' } })}
                        className={`w-full rounded-xl transition-all font-semibold shadow-md transform hover:scale-[1.02] ${
                          isCenter 
                            ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-4 hover:from-amber-600 hover:to-yellow-600' 
                            : 'bg-amber-600 text-white py-3 hover:bg-amber-700'
                        }`}
                      >
                        {t('viewDetails')}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          {cars.length > 3 && (
            <div className="flex justify-center space-x-2 mt-8">
              {Array.from({ length: cars.length }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentIndex(index);
                      setTimeout(() => setIsAnimating(false), 400);
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-amber-500 w-6' 
                      : 'bg-amber-300 hover:bg-amber-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <button
            onClick={onViewMore}
            className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-10 py-4 rounded-xl hover:from-amber-700 hover:to-yellow-700 transition-all font-semibold flex items-center mx-auto group shadow-lg transform hover:scale-105"
          >
            {t('viewMoreCars')}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FleetSection;