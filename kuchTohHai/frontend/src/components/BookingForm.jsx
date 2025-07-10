import React, { useState } from "react";
import { Calendar, MapPin, Clock, Car, Phone, ArrowRight } from "lucide-react";
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

  const [isSubmitting, setIsSubmitting] = useState(false);

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
      // 1. Save to your own backend
      await axios.post(ENQUIRY_API, {
        fullName: formData.name,
        phoneNumber: formData.phone,
        from: formData.from,
        to: formData.to,
        date: formData.date,
        time: formData.time,
        serviceType: formData.serviceType,
      });

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
          serviceType: formData.serviceType
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      // 3. Redirect to WhatsApp
      const message = `Hello Maya Tours and Travels,%0Athis side ${formData.name} and I want to enquire about ${formData.serviceType}%0Afrom ${formData.from} to ${formData.to}%0Aon ${formData.date} ${formData.time}`;
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