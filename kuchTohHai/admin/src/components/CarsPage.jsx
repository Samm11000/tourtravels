import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CAR_API } from "./utils/constants";
import toast from "react-hot-toast";
import useGetAllCars from "./hooks/useGetAllCars";
import Car from "./Car";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
const CarsPage = () => {
  const { cars } = useSelector((store) => store.car);
  const { loading, error } = useGetAllCars();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    rating: "",
    description: "",
    seatingCapacity: "",
    fuelType: "",
    transmission: "",
    mileage: "",
    features: [],
    specifications: {
      seating: "",
      luggage: "",
    },
    pricing: {
      localTrip: {
        ratePerKm: "",
        minKmPerDay: "",
      },
      outstationTrip: {
        ratePerKm: "",
        driverAllowancePerDay: "",
      },
      airportTrip: {
        ratePerKm: "",
        tripType: "One way",
      },
    },
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [featuresInput, setFeaturesInput] = useState("");

  const handleInputChange = (e) => {
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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      toast.error("Maximum 5 photos allowed");
      return;
    }
    setSelectedFiles(files);
  };

  const handleAddFeature = () => {
    if (featuresInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featuresInput.trim()],
      }));
      setFeaturesInput("");
    }
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      // Append flat fields
      Object.keys(formData).forEach((key) => {
        if (key === "features") {
          formData.features.forEach((feature) => {
            formDataToSend.append("features[]", feature);
          });
        } else if (key === "specifications") {
          Object.entries(formData.specifications).forEach(
            ([specKey, specVal]) => {
              formDataToSend.append(`specifications.${specKey}`, specVal);
            }
          );
        } else if (key === "pricing") {
          Object.entries(formData.pricing).forEach(([tripType, tripData]) => {
            Object.entries(tripData).forEach(([rateKey, rateVal]) => {
              formDataToSend.append(`pricing.${tripType}.${rateKey}`, rateVal);
            });
          });
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append photo files
      selectedFiles.forEach((file) => {
        formDataToSend.append("photos", file);
      });

      // Debug log
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await axios.post(`${CAR_API}/add`, formDataToSend, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success("Car added successfully");
        setShowAddForm(false);
        setFormData({
          name: "",
          category: "",
          rating: "",
          description: "",
          seatingCapacity: "",
          fuelType: "",
          transmission: "",
          mileage: "",
          features: [],
          specifications: {
            seating: "",
            luggage: "",
          },
          pricing: {
            localTrip: {
              ratePerKm: "",
              minKmPerDay: "",
            },
            outstationTrip: {
              ratePerKm: "",
              driverAllowancePerDay: "",
            },
            airportTrip: {
              ratePerKm: "",
              tripType: "One way",
            },
          },
        });
        setSelectedFiles([]);
        setFeaturesInput("");
        // The custom hook will automatically refetch cars when component remounts
        window.location.reload(); // Simple way to refresh data
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to add car");
      }
    } catch (error) {
      console.error(
        "Error adding car:",
        error?.response?.data || error.message || error
      );
      toast.error(error?.response?.data?.message || "Error adding car");
    }
  };
  const navigate = useNavigate();

  const backHandler = () => {
    navigate("/dashboard");
  };

  const handleDeleteCallback = () => {
    // Refresh the page to update the cars list
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cars...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600 font-medium">Error loading cars</p>
          <p className="text-gray-600 mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={backHandler}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <ArrowLeft size={18} />
              <span>Back to Dashboard</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Cars Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your vehicle inventory
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <span>+</span>
              <span>Add New Car</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {!cars || cars.length === 0 ? (
          /* No Cars State */
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm p-12">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No cars available
              </h3>
              <p className="text-gray-600 mb-6">
                Get started by adding your first car to the inventory
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Add Your First Car
              </button>
            </div>
          </div>
        ) : (
          /* Cars Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <Car key={car._id} car={car} onDelete={handleDeleteCallback} />
            ))}
          </div>
        )}
      </div>

      {/* Add Car Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Add New Car</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddCar} className="space-y-4">
                {/* Photos Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Car Photos (Max 5)
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {selectedFiles.length > 0 && (
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedFiles.length} file(s) selected
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Car Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Category</option>
                      <option value="Economy">Economy</option>
                      <option value="Premium">Premium</option>
                      <option value="SUV">SUV</option>
                      <option value="Luxury">Luxury</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rating (0-5)
                    </label>
                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Seating Capacity *
                    </label>
                    <input
                      type="text"
                      name="seatingCapacity"
                      value={formData.seatingCapacity}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 4 Seater"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fuel Type *
                    </label>
                    <select
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Fuel Type</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="EV">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Transmission *
                    </label>
                    <select
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Transmission</option>
                      <option value="Manual">Manual</option>
                      <option value="Automatic">Automatic</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mileage *
                    </label>
                    <input
                      type="text"
                      name="mileage"
                      value={formData.mileage}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 18 km/l"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Local Trip Rate (₹/km) *
                    </label>
                    <input
                      type="number"
                      name="pricing.localTrip.ratePerKm"
                      value={formData.pricing.localTrip.ratePerKm}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Features Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Features
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={featuresInput}
                      onChange={(e) => setFeaturesInput(e.target.value)}
                      placeholder="Add a feature"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Add
                    </button>
                  </div>
                  {formData.features.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.features.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center"
                        >
                          {feature}
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Specifications */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specifications
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="specifications.seating"
                        value={formData.specifications.seating}
                        onChange={handleInputChange}
                        placeholder="e.g., 4 + 1 Driver"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Detailed seating
                      </p>
                    </div>
                    <div>
                      <input
                        type="text"
                        name="specifications.luggage"
                        value={formData.specifications.luggage}
                        onChange={handleInputChange}
                        placeholder="e.g., 3 Large Bags"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Luggage capacity
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Pricing */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Pricing
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="number"
                        name="pricing.localTrip.minKmPerDay"
                        value={formData.pricing.localTrip.minKmPerDay}
                        onChange={handleInputChange}
                        placeholder="Min km per day"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Local trip minimum
                      </p>
                    </div>
                    <div>
                      <input
                        type="number"
                        name="pricing.outstationTrip.ratePerKm"
                        value={formData.pricing.outstationTrip.ratePerKm}
                        onChange={handleInputChange}
                        placeholder="Outstation rate/km"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Outstation pricing
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <input
                        type="number"
                        name="pricing.outstationTrip.driverAllowancePerDay"
                        value={
                          formData.pricing.outstationTrip.driverAllowancePerDay
                        }
                        onChange={handleInputChange}
                        placeholder="Driver allowance/day"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Driver allowance
                      </p>
                    </div>
                    <div>
                      <input
                        type="number"
                        name="pricing.airportTrip.ratePerKm"
                        value={formData.pricing.airportTrip.ratePerKm}
                        onChange={handleInputChange}
                        placeholder="Airport rate/km"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Airport trip pricing
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Add Car
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarsPage;
