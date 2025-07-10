// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { CAR_API } from "./utils/constants";
// import toast from "react-hot-toast";
// import axios from "axios";

// const Car = ({ car, onDelete }) => {
//   const navigate = useNavigate();

//   const handleCardClick = () => {
//     navigate(`/${car._id}`);
//   };

//   const handleDeleteClick = async (e) => {
//     e.stopPropagation(); // Prevent card click when delete button is clicked

//     if (window.confirm("Are you sure you want to delete this car?")) {
//       try {
//         const response = await axios.delete(`${CAR_API}/${car._id}`, {
//           withCredentials: true,
//         });

//         if (response.status === 200) {
//           toast.success("Car deleted successfully");
//           onDelete(); // Callback to refresh the cars list
//         } else {
//           toast.error("Failed to delete car");
//         }
//       } catch (error) {
//         toast.error(error?.response?.data?.message || "Error deleting car");
//       }
//     }
//   };

  

//   const handleEditClick = (e) => {
//     e.stopPropagation();
//     navigate(`/updatecar/${car.id}`)
//   };

//   return (
//     <div
//       onClick={handleCardClick}
//       className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer group"
//     >
//       {car.photos && car.photos.length > 0 && (
//         <div className="h-48 w-full overflow-hidden rounded-t-lg">
//           <img
//             src={car.photos[0]}
//             alt={car.name}
//             className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
//           />
//         </div>
//       )}

//       <div className="p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
//             {car.name}
//           </h3>
//           <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
//             {car.category}
//           </span>
//         </div>

//         {car.rating && (
//           <div className="flex items-center mb-3">
//             <div className="flex text-yellow-400">
//               {[...Array(5)].map((_, i) => (
//                 <span
//                   key={i}
//                   className={
//                     i < Math.floor(car.rating)
//                       ? "text-yellow-400"
//                       : "text-gray-300"
//                   }
//                 >
//                   ⭐
//                 </span>
//               ))}
//             </div>
//             <span className="ml-2 text-sm text-gray-600">{car.rating}</span>
//           </div>
//         )}

//         <p className="text-gray-600 mb-4 line-clamp-3">
//           {car.description.length > 80
//             ? `${car.description.slice(0, 80)}...`
//             : car.description}
//         </p>

//         {car.features && car.features.length > 0 && (
//           <div className="mb-4">
//             <div className="flex flex-wrap gap-1">
//               {car.features.slice(0, 3).map((feature, index) => (
//                 <span
//                   key={index}
//                   className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
//                 >
//                   {feature}
//                 </span>
//               ))}
//               {car.features.length > 3 && (
//                 <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
//                   +{car.features.length - 3} more
//                 </span>
//               )}
//             </div>
//           </div>
//         )}

//         <div className="space-y-2 mb-4">
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-500">Seating:</span>
//             <span className="font-medium">{car.seatingCapacity}</span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-500">Fuel:</span>
//             <span className="font-medium">{car.fuelType}</span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-500">Transmission:</span>
//             <span className="font-medium">{car.transmission}</span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-500">Mileage:</span>
//             <span className="font-medium">{car.mileage}</span>
//           </div>
//         </div>

//         {car.pricing?.localTrip?.ratePerKm && (
//           <div className="bg-gray-50 rounded-lg p-3 mb-4">
//             <p className="text-sm text-gray-600">Local Trip Rate</p>
//             <p className="font-semibold text-lg">
//               ₹{car.pricing.localTrip.ratePerKm}/km
//             </p>
//           </div>
//         )}

//         <div className="flex space-x-2">
//           <button
//             onClick={handleEditClick}
//             className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
//           >
//             Edit
//           </button>
//           <button
//             onClick={handleDeleteClick}
//             className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Car;
  import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CAR_API } from './utils/constants';
import toast from 'react-hot-toast';

const Car = ({ car, onDelete }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/${car._id}`);
  };



const handleDeleteClick = async (e) => {
  e.stopPropagation(); // Prevent card click when delete button is clicked

  if (window.confirm('Are you sure you want to delete this car?')) {
    try {
      const response = await axios.delete(`${CAR_API}/${car._id}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success('Car deleted successfully');
        onDelete(); // Callback to refresh the cars list
      } else {
        toast.error('Failed to delete car');
      }
    } catch (error) {
      console.error('Delete error:', error?.response?.data || error.message);
      toast.error(
        error?.response?.data?.message || 'Error deleting car'
      );
    }
  }
};


    const handleEditClick = (e) => {
    e.stopPropagation();
    navigate(`/updatecar/${car._id}`)
  };


  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer group"
    >
      {/* Car Image */}
      {car.photos && car.photos.length > 0 && (
        <div className="h-48 w-full overflow-hidden rounded-t-lg">
          <img 
            src={car.photos[0]} 
            alt={car.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {car.name}
          </h3>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
            {car.category}
          </span>
        </div>
        
        {car.rating && (
          <div className="flex items-center mb-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(car.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                  ⭐
                </span>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">{car.rating}</span>
          </div>
        )}
        
        <p className="text-gray-600 mb-4 line-clamp-3">{car.description}</p>
        
        {/* Features */}
        {car.features && car.features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {car.features.slice(0, 3).map((feature, index) => (
                <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                  {feature}
                </span>
              ))}
              {car.features.length > 3 && (
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                  +{car.features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Seating:</span>
            <span className="font-medium">{car.seatingCapacity}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Fuel:</span>
            <span className="font-medium">{car.fuelType}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Transmission:</span>
            <span className="font-medium">{car.transmission}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Mileage:</span>
            <span className="font-medium">{car.mileage}</span>
          </div>
        </div>
        
        {car.pricing?.localTrip?.ratePerKm && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-600">Local Trip Rate</p>
            <p className="font-semibold text-lg">₹{car.pricing.localTrip.ratePerKm}/km</p>
          </div>
        )}
        
        <div className="flex space-x-2">
          <button 
            onClick={handleEditClick}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteClick}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Car;