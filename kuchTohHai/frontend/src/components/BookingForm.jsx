

import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, Car, Phone, ArrowRight, Navigation, AlertCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import axios from "axios";
import { ENQUIRY_API } from "../utils/constants";

const BookingForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    from: "",
    to: "",
    date: "",
    time: "",
    serviceType: "",
  });

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    address: "",
    error: null,
    loading: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get user's current location
  const getCurrentLocation = () => {
    setLocation(prev => ({ ...prev, loading: true, error: null }));

    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        loading: false,
        error: "Geolocation is not supported by this browser."
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocoding to get address
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_OPENCAGE_API_KEY`
          );
          const data = await response.json();
          
          let address = "Location detected";
          if (data.results && data.results[0]) {
            address = data.results[0].formatted || "Location detected";
          }

          setLocation({
            latitude,
            longitude,
            address,
            error: null,
            loading: false
          });

          // Auto-fill 'from' field with detected location
          setFormData(prev => ({
            ...prev,
            from: address
          }));

        } catch (error) {
          setLocation({
            latitude,
            longitude,
            address: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`,
            error: null,
            loading: false
          });

          // Auto-fill 'from' field with coordinates
          setFormData(prev => ({
            ...prev,
            from: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`
          }));
        }
      },
      (error) => {
        let errorMessage = "Unable to retrieve location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        
        setLocation(prev => ({
          ...prev,
          loading: false,
          error: errorMessage
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  // Auto-detect location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const enquiryData = {
        fullName: formData.name,
        phoneNumber: formData.phone,
        from: formData.from,
        to: formData.to,
        date: formData.date,
        time: formData.time,
        serviceType: formData.serviceType,
        // Include location data
        customerLocation: {
          latitude: location.latitude,
          longitude: location.longitude,
          address: location.address,
          detectedAt: new Date().toISOString()
        }
      };

      // 1. Save to your own backend
      await axios.post(ENQUIRY_API, enquiryData);

      // 2. Trigger your n8n webhook
      await axios.post(
        'https://n8ninstance.sambhavggn8n.cfd/webhook/ENQUIRY',
        {
          name: formData.name,
          phone: formData.phone,
          from: formData.from,
          to: formData.to,
          date: formData.date,
          time: formData.time,
          serviceType: formData.serviceType,
          location: {
            latitude: location.latitude,
            longitude: location.longitude,
            address: location.address
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      // 3. Redirect to WhatsApp
      const locationText = location.latitude 
        ? `%0ALocation: ${location.address || `${location.latitude}, ${location.longitude}`}`
        : '';
      
      const message = `Hello Maya Tours and Travels,%0Athis side ${formData.name} and I want to enquire about ${formData.serviceType}%0Afrom ${formData.from} to ${formData.to}%0Aon ${formData.date} ${formData.time}${locationText}`;
      const whatsappLink = `https://wa.me/9368084778?text=${message}`;
      window.location.href = whatsappLink;
    } catch (err) {
      console.error("Submission failed:", err?.response?.data?.message || err.message);
      alert("Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 rounded-2xl shadow-2xl p-8 max-w-md w-full backdrop-blur-sm bg-opacity-95 border-2 border-yellow-200 animate-slideInRight">
      <div className="text-center mb-6">
        <div className="bg-gradient-to-br from-yellow-400 to-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl animate-bounce border-4 border-yellow-200">
          <Car className="w-8 h-8 text-white drop-shadow" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2 drop-shadow">
          {t("bookYourTrip")}
        </h2>
        <p className="text-gray-700 font-medium">{t("getInstantQuote")}</p>
      </div>

      {/* Location Status */}
      <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navigation className={`w-4 h-4 mr-2 ${location.loading ? 'animate-spin text-blue-500' : location.latitude ? 'text-green-500' : 'text-gray-400'}`} />
            <span className="text-sm font-medium text-gray-700">
              {location.loading ? 'Detecting location...' : 
               location.latitude ? 'Location detected' : 
               'Location not available'}
            </span>
          </div>
          {!location.latitude && !location.loading && (
            <button
              type="button"
              onClick={getCurrentLocation}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          )}
        </div>
        
        {location.error && (
          <div className="flex items-center mt-2 text-xs text-red-600">
            <AlertCircle className="w-3 h-3 mr-1" />
            {location.error}
          </div>
        )}
        
        {location.address && (
          <div className="mt-2 text-xs text-gray-600 truncate">
            📍 {location.address}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="animate-fadeInUp" style={{animationDelay: '0.1s'}}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <span className="flex items-center">
              {t("fullName")} <span className="text-red-500 ml-1">*</span>
            </span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border-2 border-yellow-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all hover:border-amber-300 transform hover:scale-[1.02] bg-yellow-50 shadow-inner"
            placeholder={t("fullName")}
          />
        </div>

        <div className="animate-fadeInUp" style={{animationDelay: '0.2s'}}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <span className="flex items-center">
              <Phone className="w-4 h-4 mr-1 text-amber-600" />
              {t("phoneNumber")} <span className="text-red-500 ml-1">*</span>
            </span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border-2 border-yellow-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all hover:border-amber-300 transform hover:scale-[1.02] bg-yellow-50 shadow-inner"
            placeholder="+91 98765 43210"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-amber-600" />
                {t("from")}
                {location.latitude && (
                  <span className="ml-1 text-xs bg-green-100 text-green-600 px-1 rounded">📍</span>
                )}
              </span>
            </label>
            <input
              type="text"
              name="from"
              value={formData.from}
              required
              onChange={handleInputChange}
              className="w-full px-3 py-3 border-2 border-yellow-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all text-sm hover:border-amber-300 transform hover:scale-[1.02] bg-yellow-50 shadow-inner"
              placeholder={t("pickup")}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-orange-600" />
                {t("to")}
              </span>
            </label>
            <input
              type="text"
              name="to"
              value={formData.to}
              required
              onChange={handleInputChange}
              className="w-full px-3 py-3 border-2 border-yellow-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all text-sm hover:border-amber-300 transform hover:scale-[1.02] bg-yellow-50 shadow-inner"
              placeholder={t("drop")}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-amber-600" />
                {t("date")}
              </span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              required
              onChange={handleInputChange}
              className="w-full px-3 py-3 border-2 border-yellow-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all text-sm hover:border-amber-300 transform hover:scale-[1.02] bg-yellow-50 shadow-inner"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-orange-600" />
                {t("time")}
              </span>
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              required
              onChange={handleInputChange}
              className="w-full px-3 py-3 border-2 border-yellow-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all text-sm hover:border-amber-300 transform hover:scale-[1.02] bg-yellow-50 shadow-inner"
            />
          </div>
        </div>

        <div className="animate-fadeInUp" style={{animationDelay: '0.5s'}}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t("serviceType")}
          </label>
          <select
            name="serviceType"
            value={formData.serviceType}
            required
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-yellow-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all hover:border-amber-300 transform hover:scale-[1.02] bg-yellow-50 shadow-inner"
          >
            <option value="">{t("selectService")}</option>
            <option value="airport-transfer">{t("airportTransfer")}</option>
            <option value="one-way">{t("oneWayTrip")}</option>
            <option value="round-trip">{t("roundTrip")}</option>
            <option value="local-tour">{t("localTour")}</option>
            <option value="outstation">{t("outstationTrip")}</option>
            <option value="tour-package">{t("tourPackage")}</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-white py-4 rounded-xl hover:from-amber-500 hover:via-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105 font-bold flex items-center justify-center shadow-xl group animate-fadeInUp disabled:opacity-70 border-2 border-yellow-300"
          style={{animationDelay: '0.6s'}}
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          ) : null}
          {isSubmitting ? "Submitting..." : t("getInstantQuoteBtn")}
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="text-center pt-2 animate-fadeInUp" style={{animationDelay: '0.7s'}}>
          <p className="text-sm text-gray-600 font-medium">
            {t("needHelp")}{" "}
            <a
              href="tel:+919368084778"
              className="text-amber-600 font-bold hover:underline hover:text-orange-600 transition-colors"
            >
              +91 9368084778
            </a>
          </p>
        </div>
      </form>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideInRight {
          animation: slideInRight 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BookingForm;