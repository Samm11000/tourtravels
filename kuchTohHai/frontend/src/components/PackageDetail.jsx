import React, { useState } from "react";
import {
  ArrowLeft,
  Star,
  Clock,
  MapPin,
  Users,
  Calendar,
  Phone,
  MessageCircle,
  ArrowRight,
  Check,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const PackageDetail = ({ packageId, onBack }) => {
  const { t } = useLanguage();
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    email: "",
    numberOfTravelers: "2",
    preferredStartDate: "",
    specialRequests: "",
  });

  // Mock package data - in a real app, this would come from an API
  const packageData = {
    id: packageId,
    title: "Golden Triangle Tour",
    duration: "6 Days / 5 Nights",
    price: "₹25,000",
    originalPrice: "₹30,000",
    image:
      "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    highlights: ["Delhi", "Agra", "Jaipur", "Taj Mahal"],
    rating: 4.8,
    category: "heritage",
    description:
      "Explore India's most iconic destinations in this classic tour covering Delhi, Agra, and Jaipur. Experience the rich history, magnificent architecture, and vibrant culture of these three historic cities.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Delhi",
        description:
          "Arrive in Delhi, check into hotel, visit Red Fort and Jama Masjid",
        activities: [
          "Airport pickup",
          "Hotel check-in",
          "Red Fort visit",
          "Jama Masjid tour",
        ],
      },
      {
        day: 2,
        title: "Delhi Sightseeing",
        description: "Full day Delhi tour covering major attractions",
        activities: [
          "India Gate",
          "Lotus Temple",
          "Qutub Minar",
          "Humayun's Tomb",
        ],
      },
      {
        day: 3,
        title: "Delhi to Agra",
        description: "Drive to Agra, visit Taj Mahal at sunset",
        activities: [
          "Drive to Agra",
          "Taj Mahal visit",
          "Agra Fort",
          "Local markets",
        ],
      },
      {
        day: 4,
        title: "Agra to Jaipur",
        description: "Visit Fatehpur Sikri en route to Jaipur",
        activities: [
          "Fatehpur Sikri",
          "Drive to Jaipur",
          "City Palace",
          "Local dinner",
        ],
      },
      {
        day: 5,
        title: "Jaipur Sightseeing",
        description: "Explore the Pink City's magnificent palaces and forts",
        activities: ["Amber Fort", "Hawa Mahal", "Jantar Mantar", "Shopping"],
      },
      {
        day: 6,
        title: "Departure",
        description: "Return to Delhi for departure",
        activities: ["Hotel checkout", "Drive to Delhi", "Airport drop-off"],
      },
    ],
    inclusions: [
      "5 nights accommodation in 4-star hotels",
      "Daily breakfast and dinner",
      "AC transportation throughout",
      "Professional tour guide",
      "All monument entry fees",
      "Airport transfers",
    ],
    exclusions: [
      "International/domestic flights",
      "Lunch (except mentioned)",
      "Personal expenses",
      "Tips and gratuities",
      "Travel insurance",
    ],
  };

  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    console.log("Package booking submitted:", bookingData);
    // Handle booking submission
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-blue-700 hover:text-blue-800 font-semibold mr-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t("backToPackages")}
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {packageData.title}
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Package Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-96">
                <img
                  src={packageData.image}
                  alt={packageData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                  {packageData.price}
                </div>
                <div className="absolute top-4 left-4 bg-white bg-opacity-90 text-gray-800 px-3 py-2 rounded-full text-xs font-medium">
                  <span className="line-through text-gray-500">
                    {packageData.originalPrice}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center bg-white bg-opacity-90 px-3 py-2 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                  <span className="font-medium">{packageData.rating}</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-2 rounded-full flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">
                    {packageData.duration}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {packageData.gallery.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${packageData.title} ${idx + 1}`}
                      className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {packageData.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                    >
                      <MapPin className="w-3 h-3 mr-1" />
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Package Description */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                About This Package
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {packageData.description}
              </p>
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Detailed Itinerary
              </h2>
              <div className="space-y-6">
                {packageData.itinerary.map((day, idx) => (
                  <div
                    key={idx}
                    className="border-l-4 border-blue-500 pl-6 pb-6"
                  >
                    <div className="flex items-center mb-2">
                      <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        {day.day}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {day.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-3">{day.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {day.activities.map((activity, actIdx) => (
                        <div
                          key={actIdx}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <Check className="w-4 h-4 text-green-500 mr-2" />
                          {activity}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-green-700">
                  What's Included
                </h3>
                <ul className="space-y-2">
                  {packageData.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start text-gray-600">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-red-700">
                  What's Not Included
                </h3>
                <ul className="space-y-2">
                  {packageData.exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start text-gray-600">
                      <div className="w-5 h-5 border-2 border-red-300 rounded mr-2 mt-0.5 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {t("bookThisPackage")}
              </h2>

              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("fullName")} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={bookingData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t("fullName")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("phoneNumber")} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("emailAddress")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={bookingData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    {t("numberOfTravelers")}
                  </label>
                  <select
                    name="numberOfTravelers"
                    value={bookingData.numberOfTravelers}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="1">1 Traveler</option>
                    <option value="2">2 Travelers</option>
                    <option value="3">3 Travelers</option>
                    <option value="4">4 Travelers</option>
                    <option value="5">5+ Travelers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {t("preferredStartDate")}
                  </label>
                  <input
                    type="date"
                    name="preferredStartDate"
                    value={bookingData.preferredStartDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("specialRequests")}
                  </label>
                  <textarea
                    rows={3}
                    name="specialRequests"
                    value={bookingData.specialRequests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t("anySpecialRequirements")}
                  ></textarea>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Package Price:</span>
                    <span className="font-semibold">{packageData.price}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Per person (based on 2 travelers)</span>
                    <span className="line-through">
                      {packageData.originalPrice}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-700 to-blue-800 text-white py-4 rounded-xl hover:from-blue-800 hover:to-blue-900 transition-all font-semibold flex items-center justify-center group shadow-lg"
                >
                  {t("bookThisPackage")}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="text-center pt-4 space-y-2">
                  <p className="text-sm text-gray-500">
                    {t("safeSecureBooking")}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t("customerSupport24x7")}
                  </p>
                  <div className="flex justify-center gap-4 pt-2">
                    <a
                      href="tel:+919368084778"
                      className="text-blue-700 hover:text-blue-800 flex items-center text-sm"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      {t("callNow")}
                    </a>
                    <a
                      href="https://wa.me/919368084778?text=Hello%20Maya%20Tours%20and%20Travel"
                      className="text-emerald-600 hover:text-emerald-700 flex items-center text-sm"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {t("whatsapp")}
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
