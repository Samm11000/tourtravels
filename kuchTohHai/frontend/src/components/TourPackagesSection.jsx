// import React from 'react';
// import { Clock, Star, ArrowRight, MapPin } from 'lucide-react';
// import { useLanguage } from '../contexts/LanguageContext';

// const TourPackagesSection = ({ onViewMore, onPackageClick }) => {
//   const { t } = useLanguage();

//   const featuredPackages = [
//     {
//       id: 1,
//       title: "Golden Triangle Tour",
//       duration: "6 Days / 5 Nights",
//       price: "₹25,000",
//       originalPrice: "₹30,000",
//       image: "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=400",
//       highlights: ["Delhi", "Agra", "Jaipur", "Taj Mahal"],
//       rating: 4.8
//     },
//     {
//       id: 2,
//       title: "Kerala Backwaters",
//       duration: "5 Days / 4 Nights",
//       price: "₹18,000",
//       originalPrice: "₹22,000",
//       image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=400",
//       highlights: ["Alleppey", "Kumarakom", "Houseboat", "Spice Gardens"],
//       rating: 4.9
//     },
//     {
//       id: 3,
//       title: "Goa Beach Holiday",
//       duration: "4 Days / 3 Nights",
//       price: "₹15,000",
//       originalPrice: "₹18,000",
//       image: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=400",
//       highlights: ["North Goa", "South Goa", "Water Sports", "Nightlife"],
//       rating: 4.7
//     }
//   ];

//   return (
//     <section id="packages" className="py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('popularTourPackages')}</h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             {t('packagesSubtitle')}
//           </p>
//         </div>
        
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//           {featuredPackages.map(pkg => (
//             <div key={pkg.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden group cursor-pointer">
//               <div className="relative h-48 overflow-hidden">
//                 <img 
//                   src={pkg.image} 
//                   alt={pkg.title}
//                   className="w-full h-full object-cover transition-transform group-hover:scale-110"
//                 />
//                 <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
//                   {pkg.price}
//                 </div>
//                 <div className="absolute top-4 left-4 bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
//                   <span className="line-through text-gray-500">{pkg.originalPrice}</span>
//                 </div>
//                 <div className="absolute bottom-4 left-4 flex items-center bg-white bg-opacity-90 px-2 py-1 rounded-full">
//                   <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
//                   <span className="text-sm font-medium">{pkg.rating}</span>
//                 </div>
//               </div>
              
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.title}</h3>
//                 <p className="text-gray-600 mb-3 flex items-center">
//                   <Clock className="w-4 h-4 mr-2" />
//                   {pkg.duration}
//                 </p>
                
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {pkg.highlights.map((highlight, idx) => (
//                     <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
//                       <MapPin className="w-3 h-3 mr-1" />
//                       {highlight}
//                     </span>
//                   ))}
//                 </div>
                
//                 <button 
//                   onClick={() => onPackageClick(pkg.id)}
//                   className="w-full bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800 transition-colors font-semibold"
//                 >
//                   View Details & Book
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
//             {t('viewMorePackages')}
//             <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TourPackagesSection;




import React from 'react';
import { Clock, Star, ArrowRight, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TourPackagesSection = ({ onViewMore, onPackageClick }) => {
  const { t } = useLanguage();

  const featuredPackages = [
    {
      id: 1,
      title: "Golden Triangle Tour",
      duration: "6 Days / 5 Nights",
      price: "₹25,000",
      originalPrice: "₹30,000",
      image: "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=400",
      highlights: ["Delhi", "Agra", "Jaipur", "Taj Mahal"],
      rating: 4.8
    },
    {
      id: 2,
      title: "Kerala Backwaters",
      duration: "5 Days / 4 Nights",
      price: "₹18,000",
      originalPrice: "₹22,000",
      image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=400",
      highlights: ["Alleppey", "Kumarakom", "Houseboat", "Spice Gardens"],
      rating: 4.9
    },
    {
      id: 3,
      title: "Goa Beach Holiday",
      duration: "4 Days / 3 Nights",
      price: "₹15,000",
      originalPrice: "₹18,000",
      image: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=400",
      highlights: ["North Goa", "South Goa", "Water Sports", "Nightlife"],
      rating: 4.7
    }
  ];

  return (
    <section id="packages" className="py-20 bg-gradient-to-b from-amber-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('popularTourPackages')}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('packagesSubtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPackages.map(pkg => (
            <div key={pkg.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 overflow-hidden group cursor-pointer border border-amber-100">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {pkg.price}
                </div>
                <div className="absolute top-4 left-4 bg-white bg-opacity-95 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                  <span className="line-through text-gray-500">{pkg.originalPrice}</span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center bg-white bg-opacity-95 px-2 py-1 rounded-full shadow-md">
                  <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                  <span className="text-sm font-medium">{pkg.rating}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.title}</h3>
                <p className="text-gray-600 mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-amber-600" />
                  {pkg.duration}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {pkg.highlights.map((highlight, idx) => (
                    <span key={idx} className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-medium flex items-center border border-amber-200">
                      <MapPin className="w-3 h-3 mr-1" />
                      {highlight}
                    </span>
                  ))}
                </div>
                
                <button 
                  onClick={() => onPackageClick(pkg.id)}
                  className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white py-3 rounded-xl hover:from-amber-700 hover:to-yellow-700 transition-all font-semibold transform hover:scale-[1.02]"
                >
                  View Details & Book
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button 
            onClick={onViewMore}
            className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-8 py-4 rounded-xl hover:from-amber-700 hover:to-yellow-700 transition-all font-semibold flex items-center mx-auto group shadow-lg transform hover:scale-105"
          >
            {t('viewMorePackages')}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TourPackagesSection;