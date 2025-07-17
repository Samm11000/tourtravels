

import React, { useState } from "react";
import {
  ArrowLeft,
  Star,
  Users,
  Fuel,
  Settings,
  Shield,
  Phone,
  MessageCircle,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useEffect } from "react";
import { CAR_API } from "../utils/constants"; // or wherever your API base is
import { useParams } from "react-router-dom";
import BookingForm from "./BookingForm";
import BookingFormCar from "./BookingFormCar";
 import { useLocation, useNavigate } from 'react-router-dom';

const VehicleDetail = ({ onBack }) => {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  // console.log(id);

  const { t } = useLanguage();
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    email: "",
    pickupDate: "",
    pickupTime: "",
    pickupLocation: "",
    dropLocation: "",
    tripType: "one-way",
    specialRequests: "",
  });
 


  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.state?.from);

  const handleBack = () => {
    if (location.state?.from === 'home') {
      navigate('/'); // go to home if came from FleetSection
    } else {
      navigate('/fleet'); // default: back to explore fleet
    }
  }

  
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await fetch(`${CAR_API}/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch vehicle");

        setVehicle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    console.log("Booking submitted:", bookingData);
    // Handle booking submission
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-xl font-medium text-gray-700">{t("loading")}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-xl font-semibold text-red-600 mb-2">Error</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-600" />
          </div>
          <p className="text-xl font-semibold text-gray-700 mb-2">Not Found</p>
          <p className="text-gray-600">Vehicle not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={handleBack}
            className="flex items-center text-blue-700 hover:text-blue-800 font-semibold mr-6 transition-all duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {vehicle.name}
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Vehicle Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/20">
              <div className="relative h-96 group">
                <img
                  src={vehicle.photos?.[0]}
                  alt={vehicle.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                <div className="absolute top-6 right-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-full font-bold shadow-lg backdrop-blur-sm transform hover:scale-105 transition-transform duration-200">
                  ₹{vehicle.pricing?.localTrip?.ratePerKm}/km
                </div>
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full flex items-center shadow-lg">
                  <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                  <span className="font-semibold">{vehicle.rating}</span>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {vehicle.photos?.map((img, idx) => (
                    <div key={idx} className="relative group overflow-hidden rounded-xl">
                      <img
                        src={img}
                        alt={`${vehicle.name} ${idx + 1}`}
                        className="w-full h-24 object-cover cursor-pointer transition-all duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t("specifications")}
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">Capacity</p>
                    <p className="text-gray-600 text-base">{vehicle.seatingCapacity}</p>
                  </div>
                </div>
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                    <Fuel className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">Fuel Type</p>
                    <p className="text-gray-600 text-base">{vehicle.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">Transmission</p>
                    <p className="text-gray-600 text-base">{vehicle.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">Safety Rating</p>
                    <p className="text-gray-600 text-base">
                      {vehicle.specifications?.safetyRating || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t("features")}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {vehicle.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Vehicle Description */}
              <div className="border-t border-gray-200 pt-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t("description")}
                </h3>
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-100">
                  <p className="text-gray-700 leading-relaxed text-lg">{vehicle.description}</p>
                </div>
              </div>

              {/* Mileage */}
              <div className="border-t border-gray-200 pt-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t("mileage")}
                </h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                  <p className="text-gray-700 font-semibold text-lg">{vehicle.mileage}</p>
                </div>
              </div>

              {/* Additional Specifications */}
              <div className="border-t border-gray-200 pt-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t("additionalSpecifications")}
                </h3>
                <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-900 mr-3 text-lg">
                        Seating:
                      </span>
                      <span className="text-gray-600 text-lg">
                        {vehicle.specifications?.seating || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-900 mr-3 text-lg">
                        Luggage:
                      </span>
                      <span className="text-gray-600 text-lg">
                        {vehicle.specifications?.luggage || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t("pricing")}
                </h3>
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white/70 rounded-xl">
                      <span className="text-gray-700 font-medium text-lg">Local/Hourly:</span>
                      <span className="font-bold text-emerald-600 text-lg">
                        ₹{vehicle.pricing?.localTrip?.ratePerKm}/km (Min{" "}
                        {vehicle.pricing?.localTrip?.minKmPerDay} km)
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/70 rounded-xl">
                      <span className="text-gray-700 font-medium text-lg">Outstation:</span>
                      <span className="font-bold text-emerald-600 text-lg">
                        ₹{vehicle.pricing?.outstationTrip?.ratePerKm}/km + ₹
                        {vehicle.pricing?.outstationTrip?.driverAllowancePerDay}
                        /day Driver
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/70 rounded-xl">
                      <span className="text-gray-700 font-medium text-lg">Airport Transfer:</span>
                      <span className="font-bold text-emerald-600 text-lg">
                        ₹{vehicle.pricing?.airportTrip?.ratePerKm}/km (
                        {vehicle.pricing?.airportTrip?.tripType})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <BookingFormCar id={vehicle._id} name={vehicle.name} />

        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;