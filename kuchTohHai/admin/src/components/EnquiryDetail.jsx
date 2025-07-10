import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Car,
  MessageSquare,
  Copy,
  ExternalLink,
  Navigation,
  Route,
  Timer,
  FileText,
  PhoneCall,
  RefreshCw,
  Loader
} from 'lucide-react';
import axios from 'axios';
import { ENQUIRY_API } from './utils/constants';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EnquiryDetail = ({ enquir }) => {
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();
  const enquiryId = id;

  useEffect(() => {
    if (enquiryId) {
      fetchEnquiry();
    }
  }, [enquiryId]);

  const fetchEnquiry = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${ENQUIRY_API}/${id}`, {
          withCredentials: true,
        });
      setEnquiry(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch enquiry details');
    } finally {
      setLoading(false);
    }
  };

  const getServiceTypeIcon = (serviceType) => {
    const icons = {
      'airport transfer': Navigation,
      'one way trip': Car,
      'round trip': RefreshCw,
      'local tour': MapPin,
      'outstation trip': Route,
      'tour package': Calendar
    };
    const IconComponent = icons[serviceType.toLowerCase()] || Car;
    return <IconComponent className="w-6 h-6 text-white" />;
  };

  const getServiceTypeColor = (serviceType) => {
    const colors = {
      'airport transfer': 'from-purple-500 to-purple-600',
      'one way trip': 'from-green-500 to-green-600',
      'round trip': 'from-orange-500 to-orange-600',
      'local tour': 'from-blue-500 to-blue-600',
      'outstation trip': 'from-indigo-500 to-indigo-600',
      'tour package': 'from-pink-500 to-pink-600'
    };
    return colors[serviceType.toLowerCase()] || 'from-gray-500 to-gray-600';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  const openInMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(enquiry.to)}&origin=${encodeURIComponent(enquiry.from)}`;
    window.open(url, '_blank');
  };

  const callCustomer = () => {
    window.open(`tel:${enquiry.phoneNumber}`, '_self');
  };

  const sendWhatsApp = () => {
    const message = `Hello ${enquiry.fullName}, regarding your enquiry for ${enquiry.serviceType} service from ${enquiry.from} to ${enquiry.to} on ${formatDate(enquiry.date)}.`;
    const url = `https://wa.me/91${enquiry.phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleBack = () => {
    navigate('/enquiry');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4">
            <Loader className="w-12 h-12 text-blue-600" />
          </div>
          <p className="text-xl font-medium text-gray-700">Loading enquiry details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-xl font-semibold text-red-600 mb-2">Error</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-y-2">
            <button
              onClick={fetchEnquiry}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Retry
            </button>
            <button
              onClick={handleBack}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Back to Enquiries
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!enquiry) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-600" />
          </div>
          <p className="text-xl font-semibold text-gray-700 mb-2">Not Found</p>
          <p className="text-gray-600 mb-4">Enquiry not found</p>
          <button
            onClick={handleBack}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Back to Enquiries
          </button>
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
            className="flex items-center text-blue-700 hover:text-blue-800 font-semibold mr-6 transition-all duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Enquiries
          </button>
          <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Enquiry Details
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Customer Information */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Customer Information
                </h2>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={callCustomer}
                    className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                    title="Call Customer"
                  >
                    <PhoneCall className="w-5 h-5" />
                  </button>
                  <button
                    onClick={sendWhatsApp}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                    title="Send WhatsApp"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500 text-sm uppercase tracking-wide mb-1">Full Name</p>
                    <p className="text-gray-900 text-xl font-bold">{enquiry.fullName}</p>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-500 text-sm uppercase tracking-wide mb-1">Phone Number</p>
                    <div className="flex items-center">
                      <p className="text-gray-900 text-xl font-bold mr-3">{enquiry.phoneNumber}</p>
                      <button
                        onClick={() => copyToClipboard(enquiry.phoneNumber)}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100"
                        title="Copy Phone Number"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trip Information */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Trip Information
                </h2>
                <button
                  onClick={openInMaps}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View in Maps
                </button>
              </div>

              <div className="space-y-8">
                {/* Service Type */}
                <div className={`bg-gradient-to-r ${getServiceTypeColor(enquiry.serviceType)} rounded-2xl p-8 text-white shadow-lg`}>
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-6">
                      {getServiceTypeIcon(enquiry.serviceType)}
                    </div>
                    <div>
                      <p className="text-white/80 text-sm uppercase tracking-wide font-semibold mb-1">Service Type</p>
                      <p className="text-3xl font-bold text-white capitalize">{enquiry.serviceType}</p>
                    </div>
                  </div>
                </div>

                {/* Route */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <Route className="w-8 h-8 text-blue-600 mr-4" />
                    <h3 className="text-2xl font-bold text-gray-900">Route Details</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full mr-6 shadow-lg"></div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">From</p>
                        <p className="text-2xl font-bold text-gray-900">{enquiry.from}</p>
                      </div>
                    </div>
                    <div className="border-l-4 border-gray-300 ml-2 h-12 opacity-50"></div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-500 rounded-full mr-6 shadow-lg"></div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">To</p>
                        <p className="text-2xl font-bold text-gray-900">{enquiry.to}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
                    <div className="flex items-center mb-4">
                      <Calendar className="w-8 h-8 text-purple-600 mr-4" />
                      <h3 className="text-xl font-bold text-gray-900">Date</h3>
                    </div>
                    <p className="text-lg font-bold text-gray-700">{formatDate(enquiry.date)}</p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
                    <div className="flex items-center mb-4">
                      <Clock className="w-8 h-8 text-orange-600 mr-4" />
                      <h3 className="text-xl font-bold text-gray-900">Time</h3>
                    </div>
                    <p className="text-lg font-bold text-gray-700">{enquiry.time}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enquiry Timeline */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
                Enquiry Timeline
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-6 shadow-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Enquiry Received</p>
                    <p className="text-gray-500 font-medium">{formatDateTime(enquiry.createdAt)}</p>
                  </div>
                </div>
                
                {enquiry.updatedAt && enquiry.updatedAt !== enquiry.createdAt && (
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-6 shadow-lg">
                      <RefreshCw className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">Last Updated</p>
                      <p className="text-gray-500 font-medium">{formatDateTime(enquiry.updatedAt)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
                Quick Actions
              </h3>
              
              <div className="space-y-4">
                <button
                  onClick={callCustomer}
                  className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <PhoneCall className="w-6 h-6 mr-3" />
                  Call Customer
                </button>
                
                <button
                  onClick={sendWhatsApp}
                  className="w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <MessageSquare className="w-6 h-6 mr-3" />
                  Send WhatsApp
                </button>
                
                <button
                  onClick={() => copyToClipboard(`Name: ${enquiry.fullName}\nPhone: ${enquiry.phoneNumber}\nFrom: ${enquiry.from}\nTo: ${enquiry.to}\nDate: ${formatDate(enquiry.date)}\nTime: ${enquiry.time}\nService: ${enquiry.serviceType}`)}
                  className="w-full flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Copy className="w-6 h-6 mr-3" />
                  Copy Details
                </button>

                <button
                  onClick={openInMaps}
                  className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <ExternalLink className="w-6 h-6 mr-3" />
                  Open in Maps
                </button>
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
                Enquiry Summary
              </h3>
              
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Customer</p>
                  <p className="text-lg font-bold text-gray-900">{enquiry.fullName}</p>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Service</p>
                  <p className="text-lg font-bold text-gray-900 capitalize">{enquiry.serviceType}</p>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Journey</p>
                  <p className="text-lg font-bold text-gray-900">{enquiry.from} → {enquiry.to}</p>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Schedule</p>
                  <p className="text-lg font-bold text-gray-900">{formatDate(enquiry.date)}</p>
                  <p className="text-lg font-bold text-gray-900">{enquiry.time}</p>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Contact</p>
                  <p className="text-lg font-bold text-gray-900">{enquiry.phoneNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryDetail;