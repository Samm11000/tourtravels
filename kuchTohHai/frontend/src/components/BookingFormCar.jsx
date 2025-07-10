import React, { useState } from "react";
import { Calendar, MapPin, Clock, Car, Phone, ArrowRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import axios from "axios";
import { ENQUIRY_API } from "../utils/constants";

const BookingFormCar = ({ id, name }) => {
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(ENQUIRY_API, {
        fullName: formData.name,
        phoneNumber: formData.phone,
        from: formData.from,
        to: formData.to,
        date: formData.date,
        time: formData.time,
        serviceType: formData.serviceType,
      });

const message = `Hello Maya Tours and Travels,%0A
This is ${formData.name}.%0A
I would like to enquire about the vehicle with ID: ${id} (${name}).%0A
Service Type: ${formData.serviceType}%0A
Travel Date & Time: ${formData.date} at ${formData.time}%0A
Route: From ${formData.from} to ${formData.to}.%0A
Kindly confirm availability and provide the booking details.%0A
Thank you.`;

      const whatsappLink = `https://wa.me/9368084778?text=${message}`;

      window.location.href = whatsappLink;
    } catch (err) {
      console.error(
        "Submission failed:",
        err?.response?.data?.message || err.message
      );

      alert("Failed to submit enquiry. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full backdrop-blur-sm bg-opacity-95">
      <div className="text-center mb-6">
        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Car className="w-8 h-8 text-blue-700" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t("bookYourTrip")}
        </h2>
        <p className="text-gray-600">{t("getInstantQuote")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder={t("fullName")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              {t("phoneNumber")} <span className="text-red-500 ml-1">*</span>
            </span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="+91 98765 43210"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {t("from")}
              </span>
            </label>
            <input
              type="text"
              name="from"
              value={formData.from}
              required
              onChange={handleInputChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              placeholder={t("pickup")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {t("to")}
              </span>
            </label>
            <input
              type="text"
              name="to"
              value={formData.to}
              required
              onChange={handleInputChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              placeholder={t("drop")}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {t("date")}
              </span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              required
              onChange={handleInputChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {t("time")}
              </span>
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              required
              onChange={handleInputChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("serviceType")}
          </label>
          <select
            name="serviceType"
            value={formData.serviceType}
            required
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
          className="w-full bg-gradient-to-r from-blue-700 to-blue-800 text-white py-4 rounded-xl hover:from-blue-800 hover:to-blue-900 transition-all transform hover:scale-105 font-semibold flex items-center justify-center shadow-lg group"
        >
          {t("getInstantQuoteBtn")}
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="text-center pt-2">
          <p className="text-sm text-gray-500">
            {t("needHelp")}{" "}
            <a
              href="tel:+919368084778"
              className="text-blue-700 font-semibold hover:underline"
            >
              +91 9368084778
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default BookingFormCar;
