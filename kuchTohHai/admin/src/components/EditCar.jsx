// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { CAR_API } from './utils/constants'; // Update this path based on your setup

// const EditCar = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   console.log("EditCar Mounted with ID:", id);

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const res = await axios.get(`${CAR_API}/${id}`);
//         setFormData(res.data);
//       } catch (error) {
//         toast.error('Failed to fetch car details');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCar();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // For nested pricing
//     if (name.startsWith("pricing.")) {
//       const [_, tripType, key] = name.split(".");
//       setFormData((prev) => ({
//         ...prev,
//         pricing: {
//           ...prev.pricing,
//           [tripType]: {
//             ...prev.pricing?.[tripType],
//             [key]: value
//           }
//         }
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.put(`${CAR_API}/update/${id}`, formData, {
//         withCredentials: true,
//       });

//       toast.success("Car updated successfully!");
//       navigate("/cars"); // or back to car list
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to update car");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading car details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!formData) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-red-500 text-xl mb-4">⚠️</div>
//           <p className="text-red-600 font-medium">Car not found</p>
//           <button 
//             onClick={() => navigate("/cars")}
//             className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
//           >
//             Back to Cars
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-4xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Edit Car</h1>
//               <p className="text-gray-600 mt-1">Update vehicle information</p>
//             </div>
//             <button
//               onClick={() => navigate("/cars")}
//               className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
//             >
//               <span>←</span>
//               <span>Back to Cars</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-4xl mx-auto px-6 py-8">
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//           {/* Form Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
//             <h2 className="text-xl font-bold text-white">Editing: {formData.name}</h2>
//             <p className="text-blue-100 mt-1">Update the details below to modify this vehicle</p>
//           </div>

//           {/* Form Content */}
//           <div className="p-8">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Basic Information */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Car Name *</label>
//                     <input
//                       name="name"
//                       value={formData.name || ''}
//                       onChange={handleChange}
//                       placeholder="Car Name"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
//                     <select
//                       name="category"
//                       value={formData.category || ''}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                     >
//                       <option value="">Select Category</option>
//                       <option value="Economy">Economy</option>
//                       <option value="Premium">Premium</option>
//                       <option value="SUV">SUV</option>
//                       <option value="Luxury">Luxury</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Rating and Seating */}
//               <div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Rating (0-5)</label>
//                     <input
//                       name="rating"
//                       type="number"
//                       min="0"
//                       max="5"
//                       step="0.1"
//                       value={formData.rating || ''}
//                       onChange={handleChange}
//                       placeholder="Rating"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Seating Capacity *</label>
//                     <input
//                       name="seatingCapacity"
//                       value={formData.seatingCapacity || ''}
//                       onChange={handleChange}
//                       placeholder="e.g., 4 Seater"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
//                 <textarea
//                   name="description"
//                   value={formData.description || ''}
//                   onChange={handleChange}
//                   placeholder="Describe the vehicle features and benefits"
//                   rows={4}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 />
//               </div>

//               {/* Vehicle Specifications */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Specifications</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type *</label>
//                     <select
//                       name="fuelType"
//                       value={formData.fuelType || ''}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                     >
//                       <option value="">Select Fuel Type</option>
//                       <option value="Petrol">Petrol</option>
//                       <option value="Diesel">Diesel</option>
//                       <option value="EV">Electric</option>
//                       <option value="Hybrid">Hybrid</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Transmission *</label>
//                     <select
//                       name="transmission"
//                       value={formData.transmission || ''}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                     >
//                       <option value="">Select Transmission</option>
//                       <option value="Manual">Manual</option>
//                       <option value="Automatic">Automatic</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Mileage */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Mileage *</label>
//                 <input
//                   name="mileage"
//                   value={formData.mileage || ''}
//                   onChange={handleChange}
//                   placeholder="e.g., 18 km/l"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 />
//               </div>

//               {/* Pricing */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Information</h3>
//                 <div className="bg-gray-50 rounded-xl p-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Local Trip Rate (₹/km) *</label>
//                   <input
//                     name="pricing.localTrip.ratePerKm"
//                     type="number"
//                     value={formData.pricing?.localTrip?.ratePerKm || ""}
//                     onChange={handleChange}
//                     placeholder="Enter rate per kilometer"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                   />
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex space-x-4 pt-6">
//                 <button
//                   type="button"
//                   onClick={() => navigate("/cars")}
//                   className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
//                 >
//                   Update Car
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditCar;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CAR_API } from './utils/constants'; // Update this path based on your setup

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [featuresInput, setFeaturesInput] = useState('');

  console.log("EditCar Mounted with ID:", id);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`${CAR_API}/${id}`);
        setFormData(res.data);
      } catch (error) {
        toast.error('Failed to fetch car details');
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    setFormData((prev) => {
      const newForm = { ...prev };

      if (keys.length === 1) {
        newForm[keys[0]] = value;
      } else if (keys.length === 2) {
        newForm[keys[0]] = {
          ...prev[keys[0]],
          [keys[1]]: value,
        };
      } else if (keys.length === 3) {
        newForm[keys[0]] = {
          ...prev[keys[0]],
          [keys[1]]: {
            ...prev[keys[0]][keys[1]],
            [keys[2]]: value,
          },
        };
      }

      return newForm;
    });
  };

  const handleAddFeature = () => {
    if (featuresInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...(prev.features || []), featuresInput.trim()]
      }));
      setFeaturesInput('');
    }
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`${CAR_API}/update/${id}`, formData, {
        withCredentials: true,
      });

      toast.success("Car updated successfully!");
      navigate("/cars"); // or back to car list
    } catch (error) {
      console.error(error);
      toast.error("Failed to update car");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600 font-medium">Car not found</p>
          <button 
            onClick={() => navigate("/cars")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Back to Cars
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Car</h1>
              <p className="text-gray-600 mt-1">Update vehicle information</p>
            </div>
            <button
              onClick={() => navigate("/cars")}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <span>←</span>
              <span>Back to Cars</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-xl font-bold text-white">Editing: {formData.name}</h2>
            <p className="text-blue-100 mt-1">Update the details below to modify this vehicle</p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Car Name *</label>
                    <input
                      name="name"
                      value={formData.name || ''}
                      onChange={handleChange}
                      placeholder="Car Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      name="category"
                      value={formData.category || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select Category</option>
                      <option value="Economy">Economy</option>
                      <option value="Premium">Premium</option>
                      <option value="SUV">SUV</option>
                      <option value="Luxury">Luxury</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Rating and Seating */}
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating (0-5)</label>
                    <input
                      name="rating"
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={formData.rating || ''}
                      onChange={handleChange}
                      placeholder="Rating"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Seating Capacity *</label>
                    <input
                      name="seatingCapacity"
                      value={formData.seatingCapacity || ''}
                      onChange={handleChange}
                      placeholder="e.g., 4 Seater"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  placeholder="Describe the vehicle features and benefits"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Vehicle Specifications */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type *</label>
                    <select
                      name="fuelType"
                      value={formData.fuelType || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select Fuel Type</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="EV">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Transmission *</label>
                    <select
                      name="transmission"
                      value={formData.transmission || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select Transmission</option>
                      <option value="Manual">Manual</option>
                      <option value="Automatic">Automatic</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Mileage and Local Trip Rate */}
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mileage *</label>
                    <input
                      name="mileage"
                      value={formData.mileage || ''}
                      onChange={handleChange}
                      placeholder="e.g., 18 km/l"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Local Trip Rate (₹/km) *</label>
                    <input
                      name="pricing.localTrip.ratePerKm"
                      type="number"
                      value={formData.pricing?.localTrip?.ratePerKm || ""}
                      onChange={handleChange}
                      placeholder="Enter rate per kilometer"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex space-x-2 mb-4">
                    <input
                      type="text"
                      value={featuresInput}
                      onChange={(e) => setFeaturesInput(e.target.value)}
                      placeholder="Add a feature"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  {formData.features && formData.features.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.features.map((feature, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm flex items-center font-medium">
                          {feature}
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="ml-2 text-blue-600 hover:text-blue-800 font-bold"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Seating</label>
                    <input
                      type="text"
                      name="specifications.seating"
                      value={formData.specifications?.seating || ''}
                      onChange={handleChange}
                      placeholder="e.g., 4 + 1 Driver"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Luggage Capacity</label>
                    <input
                      type="text"
                      name="specifications.luggage"
                      value={formData.specifications?.luggage || ''}
                      onChange={handleChange}
                      placeholder="e.g., 3 Large Bags"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Complete Pricing Information</h3>
                <div className="space-y-6">
                  {/* Local Trip Additional */}
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-900 mb-3">Local Trip Pricing</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rate Per Km (₹) *</label>
                        <input
                          name="pricing.localTrip.ratePerKm"
                          type="number"
                          value={formData.pricing?.localTrip?.ratePerKm || ""}
                          onChange={handleChange}
                          placeholder="12"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Km Per Day</label>
                        <input
                          name="pricing.localTrip.minKmPerDay"
                          type="number"
                          value={formData.pricing?.localTrip?.minKmPerDay || ""}
                          onChange={handleChange}
                          placeholder="250"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Outstation Trip */}
                  <div className="bg-green-50 rounded-xl p-6">
                    <h4 className="font-semibold text-green-900 mb-3">Outstation Trip Pricing</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rate Per Km (₹)</label>
                        <input
                          name="pricing.outstationTrip.ratePerKm"
                          type="number"
                          value={formData.pricing?.outstationTrip?.ratePerKm || ""}
                          onChange={handleChange}
                          placeholder="15"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Driver Allowance Per Day (₹)</label>
                        <input
                          name="pricing.outstationTrip.driverAllowancePerDay"
                          type="number"
                          value={formData.pricing?.outstationTrip?.driverAllowancePerDay || ""}
                          onChange={handleChange}
                          placeholder="500"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Airport Trip */}
                  <div className="bg-purple-50 rounded-xl p-6">
                    <h4 className="font-semibold text-purple-900 mb-3">Airport Trip Pricing</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rate Per Km (₹)</label>
                        <input
                          name="pricing.airportTrip.ratePerKm"
                          type="number"
                          value={formData.pricing?.airportTrip?.ratePerKm || ""}
                          onChange={handleChange}
                          placeholder="18"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Trip Type</label>
                        <select
                          name="pricing.airportTrip.tripType"
                          value={formData.pricing?.airportTrip?.tripType || "One way"}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="One way">One way</option>
                          <option value="Round trip">Round trip</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate("/cars")}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Update Car
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCar;