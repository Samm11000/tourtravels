// import React, { useState } from 'react';
// import { Users, Car, Star, ArrowLeft, Filter, Search } from 'lucide-react';

// const ExploreFleet = ({ onBack, onVehicleClick }) => {
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');

//   const allVehicles = [
//     // Economy Cars
//     {
//       id: 1,
//       name: "Maruti Swift",
//       category: "economy",
//       price: "₹10/km",
//       capacity: "4 Seater",
//       image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400",
//       features: ["AC", "Music System", "Clean Interior"],
//       rating: 4.6,
//       fuel: "Petrol",
//       transmission: "Manual"
//     },
//     {
//       id: 2,
//       name: "Hyundai i20",
//       category: "economy",
//       price: "₹10/km",
//       capacity: "4 Seater",
//       image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400",
//       features: ["AC", "Music System", "Clean Interior"],
//       rating: 4.5,
//       fuel: "Petrol",
//       transmission: "Manual"
//     },
//     {
//       id: 3,
//       name: "Tata Tiago",
//       category: "economy",
//       price: "₹9/km",
//       capacity: "4 Seater",
//       image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400",
//       features: ["AC", "Music System", "Spacious"],
//       rating: 4.4,
//       fuel: "Petrol",
//       transmission: "Manual"
//     },
//     // Premium Cars
//     {
//       id: 4,
//       name: "Honda City",
//       category: "premium",
//       price: "₹12/km",
//       capacity: "4 Seater",
//       image: "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=400",
//       features: ["AC", "Premium Interior", "GPS Navigation"],
//       rating: 4.7,
//       fuel: "Petrol",
//       transmission: "Automatic"
//     },
//     {
//       id: 5,
//       name: "Hyundai Verna",
//       category: "premium",
//       price: "₹12/km",
//       capacity: "4 Seater",
//       image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400",
//       features: ["AC", "Premium Interior", "GPS Navigation"],
//       rating: 4.6,
//       fuel: "Diesel",
//       transmission: "Automatic"
//     },
//     {
//       id: 6,
//       name: "Maruti Ciaz",
//       category: "premium",
//       price: "₹11/km",
//       capacity: "4 Seater",
//       image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400",
//       features: ["AC", "Premium Interior", "Spacious"],
//       rating: 4.5,
//       fuel: "Petrol",
//       transmission: "Manual"
//     },
//     // SUVs
//     {
//       id: 7,
//       name: "Mahindra XUV500",
//       category: "suv",
//       price: "₹15/km",
//       capacity: "7 Seater",
//       image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400",
//       features: ["Spacious", "Family Friendly", "Extra Luggage"],
//       rating: 4.8,
//       fuel: "Diesel",
//       transmission: "Manual"
//     },
//     {
//       id: 8,
//       name: "Tata Safari",
//       category: "suv",
//       price: "₹15/km",
//       capacity: "7 Seater",
//       image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400",
//       features: ["Spacious", "Family Friendly", "Premium"],
//       rating: 4.7,
//       fuel: "Diesel",
//       transmission: "Automatic"
//     },
//     {
//       id: 9,
//       name: "Toyota Innova",
//       category: "suv",
//       price: "₹16/km",
//       capacity: "8 Seater",
//       image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400",
//       features: ["Spacious", "Comfortable", "Reliable"],
//       rating: 4.9,
//       fuel: "Diesel",
//       transmission: "Manual"
//     },
//     // Luxury Cars
//     {
//       id: 10,
//       name: "BMW 3 Series",
//       category: "luxury",
//       price: "₹25/km",
//       capacity: "4 Seater",
//       image: "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=400",
//       features: ["Premium Comfort", "Professional Driver", "VIP Service"],
//       rating: 4.9,
//       fuel: "Petrol",
//       transmission: "Automatic"
//     },
//     {
//       id: 11,
//       name: "Mercedes C-Class",
//       category: "luxury",
//       price: "₹28/km",
//       capacity: "4 Seater",
//       image: "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=400",
//       features: ["Premium Comfort", "Professional Driver", "VIP Service"],
//       rating: 5.0,
//       fuel: "Petrol",
//       transmission: "Automatic"
//     },
//     {
//       id: 12,
//       name: "Audi A4",
//       category: "luxury",
//       price: "₹26/km",
//       capacity: "4 Seater",
//       image: "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=400",
//       features: ["Premium Comfort", "Professional Driver", "VIP Service"],
//       rating: 4.8,
//       fuel: "Petrol",
//       transmission: "Automatic"
//     }
//   ];

//   const categories = [
//     { id: 'all', name: 'All Vehicles' },
//     { id: 'economy', name: 'Economy' },
//     { id: 'premium', name: 'Premium' },
//     { id: 'suv', name: 'SUV' },
//     { id: 'luxury', name: 'Luxury' }
//   ];

//   const filteredVehicles = allVehicles.filter(vehicle => {
//     const matchesCategory = selectedCategory === 'all' || vehicle.category === selectedCategory;
//     const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="flex items-center mb-8">
//           <button
//             onClick={onBack}
//             className="flex items-center text-blue-700 hover:text-blue-800 font-semibold mr-6 transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             Back
//           </button>
//           <h1 className="text-3xl font-bold text-gray-900">Explore Our Fleet</h1>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <div className="flex flex-col lg:flex-row gap-6">
//             {/* Search */}
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search vehicles..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* Category Filter */}
//             <div className="flex items-center gap-2">
//               <Filter className="w-5 h-5 text-gray-600" />
//               <div className="flex flex-wrap gap-2">
//                 {categories.map(category => (
//                   <button
//                     key={category.id}
//                     onClick={() => setSelectedCategory(category.id)}
//                     className={`px-4 py-2 rounded-full font-medium transition-all ${
//                       selectedCategory === category.id
//                         ? 'bg-blue-700 text-white'
//                         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                     }`}
//                   >
//                     {category.name}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Vehicle Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredVehicles.map(vehicle => (
//             <div key={vehicle.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden group cursor-pointer">
//               <div className="relative h-48 overflow-hidden">
//                 <img 
//                   src={vehicle.image} 
//                   alt={vehicle.name}
//                   className="w-full h-full object-cover transition-transform group-hover:scale-110"
//                 />
//                 <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
//                   {vehicle.price}
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
//                   {vehicle.capacity}
//                 </p>
                
//                 <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
//                   <div>Fuel: {vehicle.fuel}</div>
//                   <div>Transmission: {vehicle.transmission}</div>
//                 </div>
                
//                 <div className="flex flex-wrap gap-1 mb-4">
//                   {vehicle.features.map((feature, idx) => (
//                     <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
//                       {feature}
//                     </span>
//                   ))}
//                 </div>
                
//                 <button 
//                   onClick={() => onVehicleClick(vehicle.id)}
//                   className="w-full bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800 transition-colors font-semibold"
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredVehicles.length === 0 && (
//           <div className="text-center py-12">
//             <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-600 mb-2">No vehicles found</h3>
//             <p className="text-gray-500">Try adjusting your search or filter criteria</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ExploreFleet;

import React from 'react';
import { Users, Star, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSelector } from 'react-redux';
import useGetAllCars from '../hooks/useGetAllCars';
import { useNavigate } from 'react-router-dom';
const ExploreFleet = ({ onViewMore, onVehicleClick }) => {
  const { t } = useLanguage();
  const { loading, error } = useGetAllCars(); // fetch cars
  const cars = useSelector((state) => state.cars.cars); // get from Redux
  const navigate = useNavigate();

  if (loading) return <p className="text-center py-10">{t('loading')}...</p>;
  if (error) return <p className="text-center text-red-600 py-10">{error}</p>;

  return (
    <section id="fleet" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
      onClick={() => navigate('/')}
      className="flex items-center text-blue-700 hover:text-blue-800 font-semibold transition-colors"
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      Back to Home
    </button>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('ourFleet')}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('fleetSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {cars.map(vehicle => (
            <div key={vehicle._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={vehicle.photos[0]} 
                  alt={vehicle.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  ₹{vehicle.mileage}/km
                </div>
                <div className="absolute top-4 left-4 bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded-full flex items-center">
                  <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                  <span className="text-xs font-medium">{vehicle.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{vehicle.name}</h3>
                <p className="text-gray-600 mb-3 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  {vehicle.seatingCapacity} Seater
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {vehicle.features?.map((feature, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                      {feature}
                    </span>
                  ))}
                </div>

                <button 
                  onClick={() => navigate(`/vehicle/${vehicle._id}`, { state: { from: 'explore' } })}
                  className="w-full bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800 transition-colors font-semibold"
                >
                  {t('viewDetails')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreFleet;
