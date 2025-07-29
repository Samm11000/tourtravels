


import React, { useState, useEffect } from 'react';
import { CAR_API } from './utils/constants';
const Car = ({ car, onDelete }) => {
  const [vehicleCount, setVehicleCount] = useState(0);

  useEffect(() => {
    fetchVehicleCount();
  }, [car._id]);

  const fetchVehicleCount = async () => {
    try {
      // const response = await fetch(`http://localhost:8000/api/vehicles/car/${car._id}`);
      const response = await fetch(`${CAR_API}/${car._id}`)

      if (response.ok) {
        const data = await response.json();
        setVehicleCount(data.vehicles.length);
      }
    } catch (error) {
      console.error('Error fetching vehicle count:', error);
    }
  };

  const handleCardClick = () => {
    // Navigate to vehicle list page for this car
    window.location.href = `/vehicles/${car._id}`;
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation(); // Prevent card click when delete button is clicked

    if (window.confirm('Are you sure you want to delete this car model? This will also delete all associated vehicles.')) {
      try {
        const response = await fetch(`${CAR_API}/${car._id}`, {

          method: 'DELETE',
          credentials: 'include',
        });

        if (response.ok) {
          alert('Car deleted successfully');
          onDelete(); // Callback to refresh the cars list
        } else {
          alert('Failed to delete car');
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('Error deleting car');
      }
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    window.location.href = `/updatecar/${car._id}`;
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
          <div className="flex items-center space-x-2">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
              {car.category}
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
              {vehicleCount} Units
            </span>
          </div>
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
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Available Units:</span>
            <span className="font-medium text-green-600">{vehicleCount}</span>
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
            Edit Model
          </button>
          <button
            onClick={handleDeleteClick}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            Delete
          </button>
        </div>
        
        <div className="mt-2">
          <button 
            onClick={handleCardClick}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            View Vehicles ({vehicleCount})
          </button>
        </div>
      </div>
    </div>
  );
};

export default Car;