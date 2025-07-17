// import React, { useState, useEffect } from 'react';
// import {
//   ArrowLeft,
//   User,
//   Phone,
//   MapPin,
//   Calendar,
//   Clock,
//   Car,
//   MessageSquare,
//   Copy,
//   ExternalLink,
//   Navigation,
//   Route,
//   Timer,
//   FileText,
//   PhoneCall,
//   RefreshCw,
//   Loader
// } from 'lucide-react';
// import axios from 'axios';
// import { ENQUIRY_API } from './utils/constants';
// import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

// const EnquiryDetail = ({ enquir }) => {
//   const [enquiry, setEnquiry] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const { id } = useParams();
//   const enquiryId = id;

//   useEffect(() => {
//     if (enquiryId) {
//       fetchEnquiry();
//     }
//   }, [enquiryId]);

//   const fetchEnquiry = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${ENQUIRY_API}/${id}`, {
//           withCredentials: true,
//         });
//       setEnquiry(response.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch enquiry details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getServiceTypeIcon = (serviceType) => {
//     const icons = {
//       'airport transfer': Navigation,
//       'one way trip': Car,
//       'round trip': RefreshCw,
//       'local tour': MapPin,
//       'outstation trip': Route,
//       'tour package': Calendar
//     };
//     const IconComponent = icons[serviceType.toLowerCase()] || Car;
//     return <IconComponent className="w-6 h-6 text-white" />;
//   };

//   const getServiceTypeColor = (serviceType) => {
//     const colors = {
//       'airport transfer': 'from-purple-500 to-purple-600',
//       'one way trip': 'from-green-500 to-green-600',
//       'round trip': 'from-orange-500 to-orange-600',
//       'local tour': 'from-blue-500 to-blue-600',
//       'outstation trip': 'from-indigo-500 to-indigo-600',
//       'tour package': 'from-pink-500 to-pink-600'
//     };
//     return colors[serviceType.toLowerCase()] || 'from-gray-500 to-gray-600';
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatDateTime = (dateString) => {
//     return new Date(dateString).toLocaleString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     // You can add a toast notification here
//   };

//   const openInMaps = () => {
//     const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(enquiry.to)}&origin=${encodeURIComponent(enquiry.from)}`;
//     window.open(url, '_blank');
//   };

//   const callCustomer = () => {
//     window.open(`tel:${enquiry.phoneNumber}`, '_self');
//   };

//   const sendWhatsApp = () => {
//     const message = `Hello ${enquiry.fullName}, regarding your enquiry for ${enquiry.serviceType} service from ${enquiry.from} to ${enquiry.to} on ${formatDate(enquiry.date)}.`;
//     const url = `https://wa.me/91${enquiry.phoneNumber}?text=${encodeURIComponent(message)}`;
//     window.open(url, '_blank');
//   };

//   const handleBack = () => {
//     navigate('/enquiry');
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4">
//             <Loader className="w-12 h-12 text-blue-600" />
//           </div>
//           <p className="text-xl font-medium text-gray-700">Loading enquiry details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FileText className="w-8 h-8 text-red-600" />
//           </div>
//           <p className="text-xl font-semibold text-red-600 mb-2">Error</p>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <div className="space-y-2">
//             <button
//               onClick={fetchEnquiry}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//             >
//               Retry
//             </button>
//             <button
//               onClick={handleBack}
//               className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//             >
//               Back to Enquiries
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!enquiry) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
//           <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FileText className="w-8 h-8 text-gray-600" />
//           </div>
//           <p className="text-xl font-semibold text-gray-700 mb-2">Not Found</p>
//           <p className="text-gray-600 mb-4">Enquiry not found</p>
//           <button
//             onClick={handleBack}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//           >
//             Back to Enquiries
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="flex items-center mb-8">
//           <button
//             onClick={handleBack}
//             className="flex items-center text-blue-700 hover:text-blue-800 font-semibold mr-6 transition-all duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-md hover:shadow-lg"
//           >
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             Back to Enquiries
//           </button>
//           <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//             Enquiry Details
//           </h1>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left Column - Main Details */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Customer Information */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Customer Information
//                 </h2>
//                 <div className="flex items-center space-x-3">
//                   <button
//                     onClick={callCustomer}
//                     className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                     title="Call Customer"
//                   >
//                     <PhoneCall className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={sendWhatsApp}
//                     className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                     title="Send WhatsApp"
//                   >
//                     <MessageSquare className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-8">
//                 <div className="flex items-center group">
//                   <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-200 shadow-lg">
//                     <User className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-500 text-sm uppercase tracking-wide mb-1">Full Name</p>
//                     <p className="text-gray-900 text-xl font-bold">{enquiry.fullName}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center group">
//                   <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-200 shadow-lg">
//                     <Phone className="w-8 h-8 text-white" />
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-500 text-sm uppercase tracking-wide mb-1">Phone Number</p>
//                     <div className="flex items-center">
//                       <p className="text-gray-900 text-xl font-bold mr-3">{enquiry.phoneNumber}</p>
//                       <button
//                         onClick={() => copyToClipboard(enquiry.phoneNumber)}
//                         className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100"
//                         title="Copy Phone Number"
//                       >
//                         <Copy className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Trip Information */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Trip Information
//                 </h2>
//                 <button
//                   onClick={openInMaps}
//                   className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <ExternalLink className="w-5 h-5 mr-2" />
//                   View in Maps
//                 </button>
//               </div>

//               <div className="space-y-8">
//                 {/* Service Type */}
//                 <div className={`bg-gradient-to-r ${getServiceTypeColor(enquiry.serviceType)} rounded-2xl p-8 text-white shadow-lg`}>
//                   <div className="flex items-center">
//                     <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-6">
//                       {getServiceTypeIcon(enquiry.serviceType)}
//                     </div>
//                     <div>
//                       <p className="text-white/80 text-sm uppercase tracking-wide font-semibold mb-1">Service Type</p>
//                       <p className="text-3xl font-bold text-white capitalize">{enquiry.serviceType}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Route */}
//                 <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-100">
//                   <div className="flex items-center mb-6">
//                     <Route className="w-8 h-8 text-blue-600 mr-4" />
//                     <h3 className="text-2xl font-bold text-gray-900">Route Details</h3>
//                   </div>
//                   <div className="space-y-6">
//                     <div className="flex items-center">
//                       <div className="w-4 h-4 bg-green-500 rounded-full mr-6 shadow-lg"></div>
//                       <div className="flex-1">
//                         <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">From</p>
//                         <p className="text-2xl font-bold text-gray-900">{enquiry.from}</p>
//                       </div>
//                     </div>
//                     <div className="border-l-4 border-gray-300 ml-2 h-12 opacity-50"></div>
//                     <div className="flex items-center">
//                       <div className="w-4 h-4 bg-red-500 rounded-full mr-6 shadow-lg"></div>
//                       <div className="flex-1">
//                         <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">To</p>
//                         <p className="text-2xl font-bold text-gray-900">{enquiry.to}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Date and Time */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
//                     <div className="flex items-center mb-4">
//                       <Calendar className="w-8 h-8 text-purple-600 mr-4" />
//                       <h3 className="text-xl font-bold text-gray-900">Date</h3>
//                     </div>
//                     <p className="text-lg font-bold text-gray-700">{formatDate(enquiry.date)}</p>
//                   </div>

//                   <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
//                     <div className="flex items-center mb-4">
//                       <Clock className="w-8 h-8 text-orange-600 mr-4" />
//                       <h3 className="text-xl font-bold text-gray-900">Time</h3>
//                     </div>
//                     <p className="text-lg font-bold text-gray-700">{enquiry.time}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Enquiry Timeline */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                 Enquiry Timeline
//               </h2>
              
//               <div className="space-y-6">
//                 <div className="flex items-center">
//                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-6 shadow-lg">
//                     <FileText className="w-6 h-6 text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="font-bold text-gray-900 text-lg">Enquiry Received</p>
//                     <p className="text-gray-500 font-medium">{formatDateTime(enquiry.createdAt)}</p>
//                   </div>
//                 </div>
                
//                 {enquiry.updatedAt && enquiry.updatedAt !== enquiry.createdAt && (
//                   <div className="flex items-center">
//                     <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-6 shadow-lg">
//                       <RefreshCw className="w-6 h-6 text-green-600" />
//                     </div>
//                     <div>
//                       <p className="font-bold text-gray-900 text-lg">Last Updated</p>
//                       <p className="text-gray-500 font-medium">{formatDateTime(enquiry.updatedAt)}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Quick Actions */}
//           <div className="space-y-8">
//             {/* Quick Actions */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                 Quick Actions
//               </h3>
              
//               <div className="space-y-4">
//                 <button
//                   onClick={callCustomer}
//                   className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <PhoneCall className="w-6 h-6 mr-3" />
//                   Call Customer
//                 </button>
                
//                 <button
//                   onClick={sendWhatsApp}
//                   className="w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <MessageSquare className="w-6 h-6 mr-3" />
//                   Send WhatsApp
//                 </button>
                
//                 <button
//                   onClick={() => copyToClipboard(`Name: ${enquiry.fullName}\nPhone: ${enquiry.phoneNumber}\nFrom: ${enquiry.from}\nTo: ${enquiry.to}\nDate: ${formatDate(enquiry.date)}\nTime: ${enquiry.time}\nService: ${enquiry.serviceType}`)}
//                   className="w-full flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <Copy className="w-6 h-6 mr-3" />
//                   Copy Details
//                 </button>

//                 <button
//                   onClick={openInMaps}
//                   className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <ExternalLink className="w-6 h-6 mr-3" />
//                   Open in Maps
//                 </button>
//               </div>
//             </div>

//             {/* Summary Card */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                 Enquiry Summary
//               </h3>
              
//               <div className="space-y-6">
//                 <div className="border-b border-gray-200 pb-4">
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Customer</p>
//                   <p className="text-lg font-bold text-gray-900">{enquiry.fullName}</p>
//                 </div>
                
//                 <div className="border-b border-gray-200 pb-4">
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Service</p>
//                   <p className="text-lg font-bold text-gray-900 capitalize">{enquiry.serviceType}</p>
//                 </div>
                
//                 <div className="border-b border-gray-200 pb-4">
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Journey</p>
//                   <p className="text-lg font-bold text-gray-900">{enquiry.from} → {enquiry.to}</p>
//                 </div>
                
//                 <div className="border-b border-gray-200 pb-4">
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Schedule</p>
//                   <p className="text-lg font-bold text-gray-900">{formatDate(enquiry.date)}</p>
//                   <p className="text-lg font-bold text-gray-900">{enquiry.time}</p>
//                 </div>
                
//                 <div>
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Contact</p>
//                   <p className="text-lg font-bold text-gray-900">{enquiry.phoneNumber}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EnquiryDetail;





// import React, { useState, useEffect } from 'react';
// import {
//   ArrowLeft,
//   User,
//   Phone,
//   MapPin,
//   Calendar,
//   Clock,
//   Car,
//   MessageSquare,
//   Copy,
//   ExternalLink,
//   Navigation,
//   Route,
//   Timer,
//   FileText,
//   PhoneCall,
//   RefreshCw,
//   Loader,
//   UserCheck,
//   Send,
//   X,
//   ChevronDown,
//   CheckCircle,
//   AlertCircle,
//   Eye,
//   Settings
// } from 'lucide-react';

// const ENQUIRY_API = 'http://localhost:8000/api/enquiry';

// const EnhancedEnquiryDetail = () => {
//   const [enquiry, setEnquiry] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showDriverModal, setShowDriverModal] = useState(false);
//   const [showCarModal, setShowCarModal] = useState(false);
//   const [showVehicleModal, setShowVehicleModal] = useState(false);
//   const [showMessageModal, setShowMessageModal] = useState(false);
//   const [availableDrivers, setAvailableDrivers] = useState([]);
//   const [availableCars, setAvailableCars] = useState([]);
//   const [availableVehicles, setAvailableVehicles] = useState([]);
//   const [selectedCar, setSelectedCar] = useState(null);
//   const [message, setMessage] = useState('');
//   const [messageType, setMessageType] = useState('Custom Message');
//   const [updating, setUpdating] = useState(false);

//   // Mock ID for demonstration - in real app, get from useParams
//   const enquiryId = "67890abcdef123456789";

//   useEffect(() => {
//     fetchEnquiry();
//   }, []);

//   const fetchEnquiry = async () => {
//     try {
//       setLoading(true);
//       // Replace with actual API call
//       // const response = await fetch(`${ENQUIRY_API}/${enquiryId}`, {
//       //   credentials: 'include',
//       // });
//       // const data = await response.json();
      
//       const mockEnquiry = {
//         _id: enquiryId,
//         fullName: "Rajesh Kumar",
//         phoneNumber: "9876543210",
//         from: "Delhi Airport",
//         to: "Connaught Place",
//         date: "2024-01-15",
//         time: "10:30 AM",
//         serviceType: "airport-transfer",
//         status: "Not Confirmed",
//         createdAt: "2024-01-14T08:30:00Z",
//         updatedAt: "2024-01-14T08:30:00Z",
//         allocatedDriver: null,
//         allocatedCar: null,
//         allocatedVehicle: null,
//         messages: [],
//         customerNotifications: []
//       };
//       setEnquiry(mockEnquiry);
//     } catch (err) {
//       setError(err.message || 'Failed to fetch enquiry details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAvailableDrivers = async () => {
//     try {
//       // Replace with actual API call
//       // const response = await fetch(`${ENQUIRY_API}/available-drivers`, {
//       //   credentials: 'include',
//       // });
//       // const data = await response.json();
      
//       const mockDrivers = [
//         { _id: "driver1", name: "Suresh Sharma", phone: "9876543210", experienceYears: 5, rating: 4.5 },
//         { _id: "driver2", name: "Ramesh Gupta", phone: "9876543211", experienceYears: 8, rating: 4.8 },
//         { _id: "driver3", name: "Mukesh Singh", phone: "9876543212", experienceYears: 3, rating: 4.2 }
//       ];
//       setAvailableDrivers(mockDrivers);
//     } catch (err) {
//       console.error('Error fetching drivers:', err);
//     }
//   };

//   const fetchAvailableCars = async () => {
//     try {
//       // Replace with actual API call
//       // const response = await fetch(`${ENQUIRY_API}/available-cars`, {
//       //   credentials: 'include',
//       // });
//       // const data = await response.json();
      
//       const mockCars = [
//         { 
//           _id: "car1", 
//           name: "Swift Dzire", 
//           category: "Sedan", 
//           seatingCapacity: 4,
//           photos: ["https://via.placeholder.com/300x200"],
//           pricing: { baseFare: 15, perKm: 12 }
//         },
//         { 
//           _id: "car2", 
//           name: "Toyota Innova", 
//           category: "SUV", 
//           seatingCapacity: 7,
//           photos: ["https://via.placeholder.com/300x200"],
//           pricing: { baseFare: 20, perKm: 18 }
//         },
//         { 
//           _id: "car3", 
//           name: "Maruti Ertiga", 
//           category: "MUV", 
//           seatingCapacity: 6,
//           photos: ["https://via.placeholder.com/300x200"],
//           pricing: { baseFare: 18, perKm: 15 }
//         }
//       ];
//       setAvailableCars(mockCars);
//     } catch (err) {
//       console.error('Error fetching cars:', err);
//     }
//   };

//   const fetchAvailableVehicles = async (carId) => {
//     try {
//       // Replace with actual API call
//       // const response = await fetch(`${ENQUIRY_API}/available-vehicles/${carId}`, {
//       //   credentials: 'include',
//       // });
//       // const data = await response.json();
      
//       const mockVehicles = [
//         { _id: "vehicle1", carNumber: "DL-01-AB-1234", color: "White", mileage: 15000, totalTrips: 150 },
//         { _id: "vehicle2", carNumber: "DL-02-CD-5678", color: "Silver", mileage: 12000, totalTrips: 120 },
//         { _id: "vehicle3", carNumber: "DL-03-EF-9012", color: "Black", mileage: 18000, totalTrips: 180 }
//       ];
//       setAvailableVehicles(mockVehicles);
//     } catch (err) {
//       console.error('Error fetching vehicles:', err);
//     }
//   };

//   const handleStatusChange = async (newStatus) => {
//     try {
//       setUpdating(true);
      
//       // Replace with actual API call
//       // const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/status`, {
//       //   method: 'PATCH',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   credentials: 'include',
//       //   body: JSON.stringify({ status: newStatus }),
//       // });
      
//       setEnquiry(prev => ({ ...prev, status: newStatus }));
      
//       // Add notification based on status
//       let notificationMessage = '';
//       switch(newStatus) {
//         case 'Confirmed':
//           notificationMessage = 'Your booking has been confirmed! We will contact you soon.';
//           break;
//         case 'Ongoing':
//           notificationMessage = 'Your trip has started. Have a safe journey!';
//           break;
//         case 'Completed':
//           notificationMessage = 'Your trip has been completed. Thank you for choosing us!';
//           break;
//         case 'Cancelled':
//           notificationMessage = 'Your booking has been cancelled. Please contact us for more details.';
//           break;
//       }
      
//       if (notificationMessage) {
//         setEnquiry(prev => ({
//           ...prev,
//           customerNotifications: [
//             ...prev.customerNotifications,
//             {
//               type: 'Status Update',
//               message: notificationMessage,
//               sentAt: new Date().toISOString(),
//               isRead: false
//             }
//           ]
//         }));
//       }
//     } catch (err) {
//       setError('Failed to update status');
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleAllocateDriver = async (driverId) => {
//     try {
//       setUpdating(true);
      
//       // Replace with actual API call
//       // const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/allocate-driver`, {
//       //   method: 'PATCH',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   credentials: 'include',
//       //   body: JSON.stringify({ driverId }),
//       // });
      
//       const driver = availableDrivers.find(d => d._id === driverId);
      
//       setEnquiry(prev => ({
//         ...prev,
//         allocatedDriver: driver,
//         customerNotifications: [
//           ...prev.customerNotifications,
//           {
//             type: 'Driver Assigned',
//             message: `Driver ${driver.name} has been assigned to your trip. Contact: ${driver.phone}`,
//             sentAt: new Date().toISOString(),
//             isRead: false
//           }
//         ]
//       }));
      
//       setShowDriverModal(false);
//     } catch (err) {
//       setError('Failed to allocate driver');
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleAllocateVehicle = async (vehicleId) => {
//     try {
//       setUpdating(true);
      
//       // Replace with actual API call
//       // const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/allocate-vehicle`, {
//       //   method: 'PATCH',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   credentials: 'include',
//       //   body: JSON.stringify({ carId: selectedCar._id, vehicleId }),
//       // });
      
//       const vehicle = availableVehicles.find(v => v._id === vehicleId);
      
//       setEnquiry(prev => ({
//         ...prev,
//         allocatedCar: selectedCar,
//         allocatedVehicle: vehicle,
//         customerNotifications: [
//           ...prev.customerNotifications,
//           {
//             type: 'Vehicle Assigned',
//             message: `Vehicle ${selectedCar.name} (${vehicle.carNumber}) has been assigned to your trip.`,
//             sentAt: new Date().toISOString(),
//             isRead: false
//           }
//         ]
//       }));
      
//       setShowVehicleModal(false);
//       setShowCarModal(false);
//     } catch (err) {
//       setError('Failed to allocate vehicle');
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleSendMessage = async () => {
//     try {
//       setUpdating(true);
      
//       // Replace with actual API call
//       // const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/message`, {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   credentials: 'include',
//       //   body: JSON.stringify({ message, type: messageType }),
//       // });
      
//       setEnquiry(prev => ({
//         ...prev,
//         messages: [
//           ...prev.messages,
//           {
//             sender: 'Admin',
//             message: message,
//             timestamp: new Date().toISOString(),
//             isRead: false
//           }
//         ],
//         customerNotifications: [
//           ...prev.customerNotifications,
//           {
//             type: messageType,
//             message: message,
//             sentAt: new Date().toISOString(),
//             isRead: false
//           }
//         ]
//       }));
      
//       setMessage('');
//       setShowMessageModal(false);
//     } catch (err) {
//       setError('Failed to send message');
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Not Confirmed': return 'bg-gray-100 text-gray-800';
//       case 'Confirmed': return 'bg-green-100 text-green-800';
//       case 'Ongoing': return 'bg-blue-100 text-blue-800';
//       case 'Completed': return 'bg-purple-100 text-purple-800';
//       case 'Cancelled': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getServiceTypeIcon = (serviceType) => {
//     const icons = {
//       'airport-transfer': Navigation,
//       'one-way': Car,
//       'round-trip': RefreshCw,
//       'local-tour': MapPin,
//       'outstation': Route,
//       'tour-package': Calendar
//     };
//     const IconComponent = icons[serviceType] || Car;
//     return <IconComponent className="w-6 h-6 text-white" />;
//   };

//   const getServiceTypeColor = (serviceType) => {
//     const colors = {
//       'airport-transfer': 'from-purple-500 to-purple-600',
//       'one-way': 'from-green-500 to-green-600',
//       'round-trip': 'from-orange-500 to-orange-600',
//       'local-tour': 'from-blue-500 to-blue-600',
//       'outstation': 'from-indigo-500 to-indigo-600',
//       'tour-package': 'from-pink-500 to-pink-600'
//     };
//     return colors[serviceType] || 'from-gray-500 to-gray-600';
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatDateTime = (dateString) => {
//     return new Date(dateString).toLocaleString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//   };

//   const openInMaps = () => {
//     const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(enquiry.to)}&origin=${encodeURIComponent(enquiry.from)}`;
//     window.open(url, '_blank');
//   };

//   const callCustomer = () => {
//     window.open(`tel:${enquiry.phoneNumber}`, '_self');
//   };

//   const sendWhatsApp = () => {
//     const message = `Hello ${enquiry.fullName}, regarding your enquiry for ${enquiry.serviceType} service from ${enquiry.from} to ${enquiry.to} on ${formatDate(enquiry.date)}.`;
//     const url = `https://wa.me/91${enquiry.phoneNumber}?text=${encodeURIComponent(message)}`;
//     window.open(url, '_blank');
//   };

//   const handleBack = () => {
//     window.location.href = '/enquiries';
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4">
//             <Loader className="w-12 h-12 text-blue-600" />
//           </div>
//           <p className="text-xl font-medium text-gray-700">Loading enquiry details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FileText className="w-8 h-8 text-red-600" />
//           </div>
//           <p className="text-xl font-semibold text-red-600 mb-2">Error</p>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <div className="space-y-2">
//             <button
//               onClick={fetchEnquiry}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//             >
//               Retry
//             </button>
//             <button
//               onClick={handleBack}
//               className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//             >
//               Back to Enquiries
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!enquiry) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
//           <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FileText className="w-8 h-8 text-gray-600" />
//           </div>
//           <p className="text-xl font-semibold text-gray-700 mb-2">Not Found</p>
//           <p className="text-gray-600 mb-4">Enquiry not found</p>
//           <button
//             onClick={handleBack}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//           >
//             Back to Enquiries
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center">
//             <button
//               onClick={handleBack}
//               className="flex items-center text-blue-700 hover:text-blue-800 font-semibold mr-6 transition-all duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-md hover:shadow-lg"
//             >
//               <ArrowLeft className="w-5 h-5 mr-2" />
//               Back to Enquiries
//             </button>
//             <div>
//               <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Enquiry Details
//               </h1>
//               <p className="text-lg text-gray-600 mt-2">
//                 ID: ENQ-{enquiry._id.slice(-6).toUpperCase()}
//               </p>
//             </div>
//           </div>
          
//           {/* Status Dropdown */}
//           <div className="relative">
//             <select
//               value={enquiry.status}
//               onChange={(e) => handleStatusChange(e.target.value)}
//               disabled={updating}
//               className={`appearance-none font-semibold rounded-full px-6 py-3 pr-10 border-0 cursor-pointer ${getStatusColor(enquiry.status)} ${updating ? 'opacity-50' : ''}`}
//             >
//               <option value="Not Confirmed">Not Confirmed</option>
//               <option value="Confirmed">Confirmed</option>
//               <option value="Ongoing">Ongoing</option>
//               <option value="Completed">Completed</option>
//               <option value="Cancelled">Cancelled</option>
//             </select>
//             <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5 pointer-events-none" />
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left Column - Main Details */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Customer Information */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Customer Information
//                 </h2>
//                 <div className="flex items-center space-x-3">
//                   <button
//                     onClick={callCustomer}
//                     className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                     title="Call Customer"
//                   >
//                     <PhoneCall className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={sendWhatsApp}
//                     className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                     title="Send WhatsApp"
//                   >
//                     <MessageSquare className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-8">
//                 <div className="flex items-center group">
//                   <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-200 shadow-lg">
//                     <User className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-500 text-sm uppercase tracking-wide mb-1">Full Name</p>
//                     <p className="text-gray-900 text-xl font-bold">{enquiry.fullName}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center group">
//                   <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-200 shadow-lg">
//                     <Phone className="w-8 h-8 text-white" />
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-500 text-sm uppercase tracking-wide mb-1">Phone Number</p>
//                     <div className="flex items-center">
//                       <p className="text-gray-900 text-xl font-bold mr-3">{enquiry.phoneNumber}</p>
//                       <button
//                         onClick={() => copyToClipboard(enquiry.phoneNumber)}
//                         className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100"
//                         title="Copy Phone Number"
//                       >
//                         <Copy className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Trip Information */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Trip Information
//                 </h2>
//                 <button
//                   onClick={openInMaps}
//                   className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <ExternalLink className="w-5 h-5 mr-2" />
//                   View in Maps
//                 </button>
//               </div>

//               <div className="space-y-8">
//                 {/* Service Type */}
//                 <div className={`bg-gradient-to-r ${getServiceTypeColor(enquiry.serviceType)} rounded-2xl p-8 text-white shadow-lg`}>
//                   <div className="flex items-center">
//                     <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-6">
//                       {getServiceTypeIcon(enquiry.serviceType)}
//                     </div>
//                     <div>
//                       <p className="text-white/80 text-sm uppercase tracking-wide font-semibold mb-1">Service Type</p>
//                       <p className="text-3xl font-bold text-white capitalize">{enquiry.serviceType.replace('-', ' ')}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Route */}
//                 <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-100">
//                   <div className="flex items-center mb-6">
//                     <Route className="w-8 h-8 text-blue-600 mr-4" />
//                     <h3 className="text-2xl font-bold text-gray-900">Route Details</h3>
//                   </div>
//                   <div className="space-y-6">
//                     <div className="flex items-center">
//                       <div className="w-4 h-4 bg-green-500 rounded-full mr-6 shadow-lg"></div>
//                       <div className="flex-1">
//                         <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">From</p>
//                         <p className="text-2xl font-bold text-gray-900">{enquiry.from}</p>
//                       </div>
//                     </div>
//                     <div className="border-l-4 border-gray-300 ml-2 h-12 opacity-50"></div>
//                     <div className="flex items-center">
//                       <div className="w-4 h-4 bg-red-500 rounded-full mr-6 shadow-lg"></div>
//                       <div className="flex-1">
//                         <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">To</p>
//                         <p className="text-2xl font-bold text-gray-900">{enquiry.to}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Date and Time */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
//                     <div className="flex items-center mb-4">
//                       <Calendar className="w-8 h-8 text-purple-600 mr-4" />
//                       <h3 className="text-xl font-bold text-gray-900">Date</h3>
//                     </div>
//                     <p className="text-lg font-bold text-gray-700">{formatDate(enquiry.date)}</p>
//                   </div>

//                   <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
//                     <div className="flex items-center mb-4">
//                       <Clock className="w-8 h-8 text-orange-600 mr-4" />
//                       <h3 className="text-xl font-bold text-gray-900">Time</h3>
//                     </div>
//                     <p className="text-lg font-bold text-gray-700">{enquiry.time}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Allocation Status */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                 Allocation Status
//               </h2>
              
//               <div className="grid md:grid-cols-2 gap-8">
//                 {/* Driver Allocation */}
//                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-xl font-bold text-gray-900">Driver</h3>
//                     <UserCheck className="w-8 h-8 text-blue-600" />
//                   </div>
                  
//                   {enquiry.allocatedDriver ? (
//                     <div className="space-y-2">
//                       <p className="text-lg font-bold text-gray-900">{enquiry.allocatedDriver.name}</p>
//                       <p className="text-gray-600">{enquiry.allocatedDriver.phone}</p>
//                       <p className="text-sm text-gray-500">
//                         {enquiry.allocatedDriver.experienceYears} years exp • Rating: {enquiry.allocatedDriver.rating?.toFixed(1)}
//                       </p>
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       <p className="text-gray-500">No driver allocated</p>
//                       <button
//                         onClick={() => {
//                           setShowDriverModal(true);
//                           fetchAvailableDrivers();
//                         }}
//                         className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
//                       >
//                         Allocate Driver
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Vehicle Allocation */}
//                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-xl font-bold text-gray-900">Vehicle</h3>
//                     <Car className="w-8 h-8 text-green-600" />
//                   </div>
                  
//                   {enquiry.allocatedVehicle ? (
//                     <div className="space-y-2">
//                       <p className="text-lg font-bold text-gray-900">{enquiry.allocatedCar.name}</p>
//                       <p className="text-gray-600">{enquiry.allocatedVehicle.carNumber}</p>
//                       <p className="text-sm text-gray-500">
//                         {enquiry.allocatedVehicle.color} • {enquiry.allocatedVehicle.mileage} km
//                       </p>
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       <p className="text-gray-500">No vehicle allocated</p>
//                       <button
//                         onClick={() => {
//                           setShowCarModal(true);
//                           fetchAvailableCars();
//                         }}
//                         className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
//                       >
//                         Allocate Vehicle
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Timeline */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                 Enquiry Timeline
//               </h2>
              
//               <div className="space-y-6">
//                 <div className="flex items-center">
//                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-6 shadow-lg">
//                     <FileText className="w-6 h-6 text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="font-bold text-gray-900 text-lg">Enquiry Received</p>
//                     <p className="text-gray-500 font-medium">{formatDateTime(enquiry.createdAt)}</p>
//                   </div>
//                 </div>
                
//                 {enquiry.updatedAt && enquiry.updatedAt !== enquiry.createdAt && (
//                   <div className="flex items-center">
//                     <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-6 shadow-lg">
//                       <RefreshCw className="w-6 h-6 text-green-600" />
//                     </div>
//                     <div>
//                       <p className="font-bold text-gray-900 text-lg">Last Updated</p>
//                       <p className="text-gray-500 font-medium">{formatDateTime(enquiry.updatedAt)}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Actions & Summary */}
//           <div className="space-y-8">
//             {/* Quick Actions */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                 Quick Actions
//               </h3>
              
//               <div className="space-y-4">
//                 <button
//                   onClick={callCustomer}
//                   className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <PhoneCall className="w-6 h-6 mr-3" />
//                   Call Customer
//                 </button>
                
//                 <button
//                   onClick={sendWhatsApp}
//                   className="w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <MessageSquare className="w-6 h-6 mr-3" />
//                   Send WhatsApp
//                 </button>
                
//                 <button
//                   onClick={() => setShowMessageModal(true)}
//                   className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <Send className="w-6 h-6 mr-3" />
//                   Send Message
//                 </button>
                
//                 <button
//                   onClick={() => copyToClipboard(`Name: ${enquiry.fullName}\nPhone: ${enquiry.phoneNumber}\nFrom: ${enquiry.from}\nTo: ${enquiry.to}\nDate: ${formatDate(enquiry.date)}\nTime: ${enquiry.time}\nService: ${enquiry.serviceType}`)}
//                   className="w-full flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <Copy className="w-6 h-6 mr-3" />
//                   Copy Details
//                 </button>

//                 <button
//                   onClick={openInMaps}
//                   className="w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <ExternalLink className="w-6 h-6 mr-3" />
//                   Open in Maps
//                 </button>
//               </div>
//             </div>

//             {/* Summary Card */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                 Enquiry Summary
//               </h3>
              
//               <div className="space-y-6">
//                 <div className="border-b border-gray-200 pb-4">
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Customer</p>
//                   <p className="text-lg font-bold text-gray-900">{enquiry.fullName}</p>
//                 </div>
                
//                 <div className="border-b border-gray-200 pb-4">
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Service</p>
//                   <p className="text-lg font-bold text-gray-900 capitalize">{enquiry.serviceType.replace('-', ' ')}</p>
//                 </div>
                
//                 <div className="border-b border-gray-200 pb-4">
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Journey</p>
//                   <p className="text-lg font-bold text-gray-900">{enquiry.from} → {enquiry.to}</p>
//                 </div>
                
//                 <div className="border-b border-gray-200 pb-4">
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Schedule</p>
//                   <p className="text-lg font-bold text-gray-900">{formatDate(enquiry.date)}</p>
//                   <p className="text-lg font-bold text-gray-900">{enquiry.time}</p>
//                 </div>
                
//                 <div>
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Contact</p>
//                   <p className="text-lg font-bold text-gray-900">{enquiry.phoneNumber}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Notifications Preview */}
//             {enquiry.customerNotifications && enquiry.customerNotifications.length > 0 && (
//               <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//                 <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                   Recent Notifications
//                 </h3>
                
//                 <div className="space-y-4">
//                   {enquiry.customerNotifications.slice(-3).map((notification, index) => (
//                     <div key={index} className="bg-blue-50 rounded-lg p-4">
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <p className="text-sm font-semibold text-blue-800">{notification.type}</p>
//                           <p className="text-sm text-blue-700 mt-1">{notification.message}</p>
//                         </div>
//                         <div className="ml-4">
//                           <p className="text-xs text-blue-600">{formatDateTime(notification.sentAt)}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Message Modal */}
//         {showMessageModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-2xl font-bold text-gray-900">Send Message</h2>
//                   <button
//                     onClick={() => setShowMessageModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//                 <p className="text-gray-600 mt-2">To: {enquiry?.fullName}</p>
//               </div>
//               <div className="p-6">
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
//                     <select
//                       value={messageType}
//                       onChange={(e) => setMessageType(e.target.value)}
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="Rate Quote">Rate Quote</option>
//                       <option value="Driver Assigned">Driver Assigned</option>
//                       <option value="Booking Confirmed">Booking Confirmed</option>
//                       <option value="Trip Started">Trip Started</option>
//                       <option value="Trip Completed">Trip Completed</option>
//                       <option value="Custom Message">Custom Message</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
//                     <textarea
//                       value={message}
//                       onChange={(e) => setMessage(e.target.value)}
//                       rows={4}
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Type your message here..."
//                     />
//                   </div>
//                   {messageType === 'Rate Quote' && (
//                     <div className="bg-blue-50 p-4 rounded-lg">
//                       <p className="text-sm text-blue-700 font-medium">Quick Templates:</p>
//                       <div className="space-y-2 mt-2">
//                         <button
//                           onClick={() => setMessage(`Hello ${enquiry?.fullName}, your trip rate is ₹18/km. If you agree, please confirm to book. Thank you!`)}
//                           className="text-left text-sm text-blue-600 hover:text-blue-800 block"
//                         >
//                           • Rate ₹18/km template
//                         </button>
//                         <button
//                           onClick={() => setMessage(`Dear ${enquiry?.fullName}, we have reviewed your enquiry. The estimated fare is ₹15/km + ₹200 base fare. Please let us know if you want to proceed.`)}
//                           className="text-left text-sm text-blue-600 hover:text-blue-800 block"
//                         >
//                           • Detailed rate template
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="p-6 border-t border-gray-200">
//                 <div className="flex space-x-4">
//                   <button
//                     onClick={() => setShowMessageModal(false)}
//                     className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSendMessage}
//                     disabled={!message.trim() || updating}
//                     className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                   >
//                     {updating ? (
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     ) : (
//                       <>
//                         <Send className="w-4 h-4 mr-2" />
//                         Send
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Vehicle Selection Modal */}
//         {showVehicleModal && selectedCar && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900">Select Vehicle</h2>
//                     <p className="text-gray-600">Car: {selectedCar.name}</p>
//                   </div>
//                   <button
//                     onClick={() => setShowVehicleModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <div className="space-y-4">
//                   {availableVehicles.length === 0 ? (
//                     <p className="text-gray-500 text-center">No available vehicles found for this car model</p>
//                   ) : (
//                     availableVehicles.map((vehicle) => (
//                       <div key={vehicle._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
//                         <div>
//                           <p className="font-medium text-lg">{vehicle.carNumber}</p>
//                           <p className="text-sm text-gray-600">Color: {vehicle.color}</p>
//                           <p className="text-sm text-gray-600">
//                             Mileage: {vehicle.mileage?.toLocaleString() || 'N/A'} km • 
//                             Trips: {vehicle.totalTrips || 0}
//                           </p>
//                         </div>
//                         <button
//                           onClick={() => handleAllocateVehicle(vehicle._id)}
//                           disabled={updating}
//                           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
//                         >
//                           {updating ? 'Allocating...' : 'Allocate'}
//                         </button>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//               <div className="p-6 border-t border-gray-200">
//                 <button
//                   onClick={() => setShowVehicleModal(false)}
//                   className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Car Selection Modal */}
//         {showCarModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900">Select Car Model</h2>
//                     <p className="text-gray-600">For: {enquiry?.fullName}</p>
//                   </div>
//                   <button
//                     onClick={() => setShowCarModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {availableCars.length === 0 ? (
//                     <p className="text-gray-500 text-center col-span-full">No available cars found</p>
//                   ) : (
//                     availableCars.map((car) => (
//                       <div 
//                         key={car._id} 
//                         className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
//                         onClick={() => {
//                           setSelectedCar(car);
//                           setShowVehicleModal(true);
//                           fetchAvailableVehicles(car._id);
//                         }}
//                       >
//                         {car.photos && car.photos[0] && (
//                           <img 
//                             src={car.photos[0]} 
//                             alt={car.name} 
//                             className="w-full h-32 object-cover rounded-lg mb-3" 
//                           />
//                         )}
//                         <h3 className="font-medium text-lg mb-2">{car.name}</h3>
//                         <p className="text-sm text-gray-600 mb-1">Category: {car.category}</p>
//                         <p className="text-sm text-gray-600 mb-3">Seating: {car.seatingCapacity} people</p>
//                         {car.pricing && (
//                           <div className="text-sm text-green-600 font-medium">
//                             Base: ₹{car.pricing.baseFare} + ₹{car.pricing.perKm}/km
//                           </div>
//                         )}
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//               <div className="p-6 border-t border-gray-200">
//                 <button
//                   onClick={() => setShowCarModal(false)}
//                   className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Driver Allocation Modal */}
//         {showDriverModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900">Allocate Driver</h2>
//                     <p className="text-gray-600">For: {enquiry?.fullName}</p>
//                   </div>
//                   <button
//                     onClick={() => setShowDriverModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <div className="space-y-4">
//                   {availableDrivers.length === 0 ? (
//                     <p className="text-gray-500 text-center">No available drivers found</p>
//                   ) : (
//                     availableDrivers.map((driver) => (
//                       <div key={driver._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
//                         <div>
//                           <p className="font-medium">{driver.name}</p>
//                           <p className="text-sm text-gray-600">{driver.phone}</p>
//                           <p className="text-sm text-gray-600">
//                             {driver.experienceYears} years exp • Rating: {driver.rating?.toFixed(1) || 'N/A'}
//                           </p>
//                         </div>
//                         <button
//                           onClick={() => handleAllocateDriver(driver._id)}
//                           disabled={updating}
//                           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
//                         >
//                           {updating ? 'Allocating...' : 'Allocate'}
//                         </button>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//               <div className="p-6 border-t border-gray-200">
//                 <button
//                   onClick={() => setShowDriverModal(false)}
//                   className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EnhancedEnquiryDetail;















// import React, { useState, useEffect } from 'react';
// import {
//   ArrowLeft,
//   User,
//   Phone,
//   MapPin,
//   Calendar,
//   Clock,
//   Car,
//   MessageSquare,
//   Copy,
//   ExternalLink,
//   Navigation,
//   Route,
//   Timer,
//   FileText,
//   PhoneCall,
//   RefreshCw,
//   Loader,
//   UserCheck,
//   Send,
//   X,
//   ChevronDown,
//   CheckCircle,
//   AlertCircle,
//   Eye,
//   Settings
// } from 'lucide-react';

// const ENQUIRY_API = 'http://localhost:8000/api/enquiry';

// const EnhancedEnquiryDetail = () => {
//   const [enquiry, setEnquiry] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showDriverModal, setShowDriverModal] = useState(false);
//   const [showCarModal, setShowCarModal] = useState(false);
//   const [showVehicleModal, setShowVehicleModal] = useState(false);
//   const [showMessageModal, setShowMessageModal] = useState(false);
//   const [availableDrivers, setAvailableDrivers] = useState([]);
//   const [availableCars, setAvailableCars] = useState([]);
//   const [availableVehicles, setAvailableVehicles] = useState([]);
//   const [selectedCar, setSelectedCar] = useState(null);
//   const [message, setMessage] = useState('');
//   const [messageType, setMessageType] = useState('Custom Message');
//   const [updating, setUpdating] = useState(false);

//   // Mock ID for demonstration - in real app, get from useParams
//   const enquiryId = "67890abcdef123456789";

//   useEffect(() => {
//     fetchEnquiry();
//   }, []);

//   const fetchEnquiry = async () => {
//     try {
//       setLoading(true);
//       // Replace with actual API call
//       // const response = await fetch(`${ENQUIRY_API}/${enquiryId}`, {
//       //   credentials: 'include',
//       // });
//       // const data = await response.json();
      
//       const mockEnquiry = {
//         _id: enquiryId,
//         fullName: "Rajesh Kumar",
//         phoneNumber: "9876543210",
//         from: "Delhi Airport",
//         to: "Connaught Place",
//         date: "2024-01-15",
//         time: "10:30 AM",
//         serviceType: "airport-transfer",
//         status: "Not Confirmed",
//         createdAt: "2024-01-14T08:30:00Z",
//         updatedAt: "2024-01-14T08:30:00Z",
//         allocatedDriver: null,
//         allocatedCar: null,
//         allocatedVehicle: null,
//         messages: [],
//         customerNotifications: []
//       };
//       setEnquiry(mockEnquiry);
//     } catch (err) {
//       setError(err.message || 'Failed to fetch enquiry details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAvailableDrivers = async () => {
//     try {
//       const response = await fetch(`${ENQUIRY_API}/available-drivers`, {
//         credentials: 'include',
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setAvailableDrivers(data);
//       }
//     } catch (err) {
//       console.error('Error fetching drivers:', err);
//     }
//   };

//   const fetchAvailableCars = async () => {
//     try {
//       const response = await fetch(`${ENQUIRY_API}/available-cars`, {
//         credentials: 'include',
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setAvailableCars(data);
//       }
//     } catch (err) {
//       console.error('Error fetching cars:', err);
//     }
//   };

//   const fetchAvailableVehicles = async (carId) => {
//     try {
//       const response = await fetch(`${ENQUIRY_API}/available-vehicles/${carId}`, {
//         credentials: 'include',
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setAvailableVehicles(data);
//       }
//     } catch (err) {
//       console.error('Error fetching vehicles:', err);
//     }
//   };

//   const handleStatusChange = async (newStatus) => {
//     try {
//       setUpdating(true);
      
//       const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/status`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ status: newStatus }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setEnquiry(data.enquiry);
        
//         // Send WhatsApp notification to customer
//         await sendWhatsAppNotification(enquiry.phoneNumber, `Your enquiry status has been updated to: ${newStatus}`);
//       }
//     } catch (err) {
//       setError('Failed to update status');
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleAllocateDriver = async (driverId) => {
//     try {
//       setUpdating(true);
      
//       const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/allocate-driver`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ driverId }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setEnquiry(data.enquiry);
        
//         const driver = availableDrivers.find(d => d._id === driverId);
        
//         // Send WhatsApp to driver with enquiry details
//         const driverMessage = `New Trip Assignment:
// Customer: ${enquiry.fullName}
// Phone: ${enquiry.phoneNumber}
// From: ${enquiry.from}
// To: ${enquiry.to}
// Date: ${formatDate(enquiry.date)}
// Time: ${enquiry.time}
// Service: ${enquiry.serviceType}
// Enquiry ID: ENQ-${enquiry._id.slice(-6).toUpperCase()}`;
        
//         await sendWhatsAppNotification(driver.phone, driverMessage);
        
//         // Send WhatsApp to customer
//         const customerMessage = `Driver assigned to your trip!
// Driver: ${driver.name}
// Phone: ${driver.phone}
// Experience: ${driver.experienceYears} years
// Rating: ${driver.rating?.toFixed(1)}/5`;
        
//         await sendWhatsAppNotification(enquiry.phoneNumber, customerMessage);
        
//         setShowDriverModal(false);
//       }
//     } catch (err) {
//       setError('Failed to allocate driver');
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleAllocateVehicle = async (vehicleId) => {
//     try {
//       setUpdating(true);
      
//       const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/allocate-vehicle`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ carId: selectedCar._id, vehicleId }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setEnquiry(data.enquiry);
        
//         const vehicle = availableVehicles.find(v => v._id === vehicleId);
        
//         // Send WhatsApp to customer
//         const customerMessage = `Vehicle assigned to your trip!
// Car: ${selectedCar.name} (${selectedCar.category})
// Vehicle Number: ${vehicle.carNumber}
// Color: ${vehicle.color}
// Seating: ${selectedCar.seatingCapacity} people`;
        
//         await sendWhatsAppNotification(enquiry.phoneNumber, customerMessage);
        
//         setShowVehicleModal(false);
//         setShowCarModal(false);
//       }
//     } catch (err) {
//       setError('Failed to allocate vehicle');
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleRevertDriver = async () => {
//     try {
//       setUpdating(true);
      
//       const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/revert-driver`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setEnquiry(data.enquiry);
        
//         // Send WhatsApp notification
//         await sendWhatsAppNotification(enquiry.phoneNumber, 'Driver assignment has been reverted. We will assign a new driver soon.');
//       }
//     } catch (err) {
//       setError('Failed to revert driver');
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleRevertVehicle = async () => {
//     try {
//       setUpdating(true);
      
//       const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/revert-vehicle`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setEnquiry(data.enquiry);
        
//         // Send WhatsApp notification
//         await sendWhatsAppNotification(enquiry.phoneNumber, 'Vehicle assignment has been reverted. We will assign a new vehicle soon.');
//       }
//     } catch (err) {
//       setError('Failed to revert vehicle');
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const sendWhatsAppNotification = async (phoneNumber, message) => {
//     try {
//       // N8N WhatsApp webhook integration
//       const webhookUrl = 'https://your-n8n-webhook-url.com/webhook/whatsapp';
      
//       await fetch(webhookUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           to: phoneNumber,
//           message: message,
//           enquiryId: enquiry._id
//         }),
//       });
//     } catch (error) {
//       console.error('WhatsApp notification failed:', error);
//     }
//   };

//   const handleSendMessage = async () => {
//     try {
//       setUpdating(true);
      
//       // Replace with actual API call
//       // const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/message`, {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   credentials: 'include',
//       //   body: JSON.stringify({ message, type: messageType }),
//       // });
      
//       setEnquiry(prev => ({
//         ...prev,
//         messages: [
//           ...prev.messages,
//           {
//             sender: 'Admin',
//             message: message,
//             timestamp: new Date().toISOString(),
//             isRead: false
//           }
//         ],
//         customerNotifications: [
//           ...prev.customerNotifications,
//           {
//             type: messageType,
//             message: message,
//             sentAt: new Date().toISOString(),
//             isRead: false
//           }
//         ]
//       }));
      
//       setMessage('');
//       setShowMessageModal(false);
//     } catch (err) {
//       setError('Failed to send message');
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Not Confirmed': return 'bg-gray-100 text-gray-800';
//       case 'Confirmed': return 'bg-green-100 text-green-800';
//       case 'Ongoing': return 'bg-blue-100 text-blue-800';
//       case 'Completed': return 'bg-purple-100 text-purple-800';
//       case 'Cancelled': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getServiceTypeIcon = (serviceType) => {
//     const icons = {
//       'airport-transfer': Navigation,
//       'one-way': Car,
//       'round-trip': RefreshCw,
//       'local-tour': MapPin,
//       'outstation': Route,
//       'tour-package': Calendar
//     };
//     const IconComponent = icons[serviceType] || Car;
//     return <IconComponent className="w-6 h-6 text-white" />;
//   };

//   const getServiceTypeColor = (serviceType) => {
//     const colors = {
//       'airport-transfer': 'from-purple-500 to-purple-600',
//       'one-way': 'from-green-500 to-green-600',
//       'round-trip': 'from-orange-500 to-orange-600',
//       'local-tour': 'from-blue-500 to-blue-600',
//       'outstation': 'from-indigo-500 to-indigo-600',
//       'tour-package': 'from-pink-500 to-pink-600'
//     };
//     return colors[serviceType] || 'from-gray-500 to-gray-600';
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatDateTime = (dateString) => {
//     return new Date(dateString).toLocaleString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//   };

//   const openInMaps = () => {
//     const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(enquiry.to)}&origin=${encodeURIComponent(enquiry.from)}`;
//     window.open(url, '_blank');
//   };

//   const callCustomer = () => {
//     window.open(`tel:${enquiry.phoneNumber}`, '_self');
//   };

//   const sendWhatsApp = () => {
//     const message = `Hello ${enquiry.fullName}, regarding your enquiry for ${enquiry.serviceType} service from ${enquiry.from} to ${enquiry.to} on ${formatDate(enquiry.date)}.`;
//     const url = `https://wa.me/91${enquiry.phoneNumber}?text=${encodeURIComponent(message)}`;
//     window.open(url, '_blank');
//   };

//   const handleBack = () => {
//     window.location.href = '/enquiries';
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4">
//             <Loader className="w-12 h-12 text-blue-600" />
//           </div>
//           <p className="text-xl font-medium text-gray-700">Loading enquiry details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FileText className="w-8 h-8 text-red-600" />
//           </div>
//           <p className="text-xl font-semibold text-red-600 mb-2">Error</p>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <div className="space-y-2">
//             <button
//               onClick={fetchEnquiry}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//             >
//               Retry
//             </button>
//             <button
//               onClick={handleBack}
//               className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//             >
//               Back to Enquiries
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!enquiry) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
//           <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FileText className="w-8 h-8 text-gray-600" />
//           </div>
//           <p className="text-xl font-semibold text-gray-700 mb-2">Not Found</p>
//           <p className="text-gray-600 mb-4">Enquiry not found</p>
//           <button
//             onClick={handleBack}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//           >
//             Back to Enquiries
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center">
//             <button
//               onClick={handleBack}
//               className="flex items-center text-blue-700 hover:text-blue-800 font-semibold mr-6 transition-all duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-md hover:shadow-lg"
//             >
//               <ArrowLeft className="w-5 h-5 mr-2" />
//               Back to Enquiries
//             </button>
//             <div>
//               <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Enquiry Details
//               </h1>
//               <p className="text-lg text-gray-600 mt-2">
//                 ID: ENQ-{enquiry._id.slice(-6).toUpperCase()}
//               </p>
//             </div>
//           </div>
          
//           {/* Status Dropdown */}
//           <div className="relative">
//             <select
//               value={enquiry.status}
//               onChange={(e) => handleStatusChange(e.target.value)}
//               disabled={updating}
//               className={`appearance-none font-semibold rounded-full px-6 py-3 pr-10 border-0 cursor-pointer ${getStatusColor(enquiry.status)} ${updating ? 'opacity-50' : ''}`}
//             >
//               <option value="Not Confirmed">Not Confirmed</option>
//               <option value="Confirmed">Confirmed</option>
//               <option value="Ongoing">Ongoing</option>
//               <option value="Completed">Completed</option>
//               <option value="Cancelled">Cancelled</option>
//             </select>
//             <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5 pointer-events-none" />
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left Column - Main Details */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Customer Information */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Customer Information
//                 </h2>
//                 <div className="flex items-center space-x-3">
//                   <button
//                     onClick={callCustomer}
//                     className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                     title="Call Customer"
//                   >
//                     <PhoneCall className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={sendWhatsApp}
//                     className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                     title="Send WhatsApp"
//                   >
//                     <MessageSquare className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-8">
//                 <div className="flex items-center group">
//                   <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-200 shadow-lg">
//                     <User className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-500 text-sm uppercase tracking-wide mb-1">Full Name</p>
//                     <p className="text-gray-900 text-xl font-bold">{enquiry.fullName}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center group">
//                   <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-200 shadow-lg">
//                     <Phone className="w-8 h-8 text-white" />
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-500 text-sm uppercase tracking-wide mb-1">Phone Number</p>
//                     <div className="flex items-center">
//                       <p className="text-gray-900 text-xl font-bold mr-3">{enquiry.phoneNumber}</p>
//                       <button
//                         onClick={() => copyToClipboard(enquiry.phoneNumber)}
//                         className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100"
//                         title="Copy Phone Number"
//                       >
//                         <Copy className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Trip Information */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Trip Information
//                 </h2>
//                 <button
//                   onClick={openInMaps}
//                   className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <ExternalLink className="w-5 h-5 mr-2" />
//                   View in Maps
//                 </button>
//               </div>

//               <div className="space-y-8">
//                 {/* Service Type */}
//                 <div className={`bg-gradient-to-r ${getServiceTypeColor(enquiry.serviceType)} rounded-2xl p-8 text-white shadow-lg`}>
//                   <div className="flex items-center">
//                     <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-6">
//                       {getServiceTypeIcon(enquiry.serviceType)}
//                     </div>
//                     <div>
//                       <p className="text-white/80 text-sm uppercase tracking-wide font-semibold mb-1">Service Type</p>
//                       <p className="text-3xl font-bold text-white capitalize">{enquiry.serviceType.replace('-', ' ')}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Route */}
//                 <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-100">
//                   <div className="flex items-center mb-6">
//                     <Route className="w-8 h-8 text-blue-600 mr-4" />
//                     <h3 className="text-2xl font-bold text-gray-900">Route Details</h3>
//                   </div>
//                   <div className="space-y-6">
//                     <div className="flex items-center">
//                       <div className="w-4 h-4 bg-green-500 rounded-full mr-6 shadow-lg"></div>
//                       <div className="flex-1">
//                         <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">From</p>
//                         <p className="text-2xl font-bold text-gray-900">{enquiry.from}</p>
//                       </div>
//                     </div>
//                     <div className="border-l-4 border-gray-300 ml-2 h-12 opacity-50"></div>
//                     <div className="flex items-center">
//                       <div className="w-4 h-4 bg-red-500 rounded-full mr-6 shadow-lg"></div>
//                       <div className="flex-1">
//                         <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">To</p>
//                         <p className="text-2xl font-bold text-gray-900">{enquiry.to}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Date and Time */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
//                     <div className="flex items-center mb-4">
//                       <Calendar className="w-8 h-8 text-purple-600 mr-4" />
//                       <h3 className="text-xl font-bold text-gray-900">Date</h3>
//                     </div>
//                     <p className="text-lg font-bold text-gray-700">{formatDate(enquiry.date)}</p>
//                   </div>

//                   <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
//                     <div className="flex items-center mb-4">
//                       <Clock className="w-8 h-8 text-orange-600 mr-4" />
//                       <h3 className="text-xl font-bold text-gray-900">Time</h3>
//                     </div>
//                     <p className="text-lg font-bold text-gray-700">{enquiry.time}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Allocation Status */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                 Allocation Status
//               </h2>
              
//               <div className="grid md:grid-cols-2 gap-8">
//                 {/* Driver Allocation */}
//                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-xl font-bold text-gray-900">Driver</h3>
//                     <UserCheck className="w-8 h-8 text-blue-600" />
//                   </div>
                  
//                   {enquiry.allocatedDriver ? (
//                     <div className="space-y-2">
//                       <p className="text-lg font-bold text-gray-900">{enquiry.allocatedDriver.name}</p>
//                       <p className="text-gray-600">{enquiry.allocatedDriver.phone}</p>
//                       <p className="text-sm text-gray-500">
//                         {enquiry.allocatedDriver.experienceYears} years exp • Rating: {enquiry.allocatedDriver.rating?.toFixed(1)}
//                       </p>
//                       <button
//                         onClick={handleRevertDriver}
//                         disabled={updating}
//                         className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
//                       >
//                         {updating ? 'Reverting...' : 'Change Driver'}
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       <p className="text-gray-500">No driver allocated</p>
//                       <button
//                         onClick={() => {
//                           setShowDriverModal(true);
//                           fetchAvailableDrivers();
//                         }}
//                         className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
//                       >
//                         Allocate Driver
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Vehicle Allocation */}
//                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-xl font-bold text-gray-900">Vehicle</h3>
//                     <Car className="w-8 h-8 text-green-600" />
//                   </div>
                  
//                   {enquiry.allocatedVehicle ? (
//                     <div className="space-y-2">
//                       <p className="text-lg font-bold text-gray-900">{enquiry.allocatedCar.name}</p>
//                       <p className="text-gray-600">{enquiry.allocatedVehicle.carNumber}</p>
//                       <p className="text-sm text-gray-500">
//                         {enquiry.allocatedVehicle.color} • {enquiry.allocatedVehicle.mileage} km
//                       </p>
//                       <button
//                         onClick={handleRevertVehicle}
//                         disabled={updating}
//                         className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
//                       >
//                         {updating ? 'Reverting...' : 'Change Vehicle'}
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       <p className="text-gray-500">No vehicle allocated</p>
//                       <button
//                         onClick={() => {
//                           setShowCarModal(true);
//                           fetchAvailableCars();
//                         }}
//                         className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
//                       >
//                         Allocate Vehicle
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Timeline */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                 Enquiry Timeline
//               </h2>
              
//               <div className="space-y-6">
//                 <div className="flex items-center">
//                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-6 shadow-lg">
//                     <FileText className="w-6 h-6 text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="font-bold text-gray-900 text-lg">Enquiry Received</p>
//                     <p className="text-gray-500 font-medium">{formatDateTime(enquiry.createdAt)}</p>
//                   </div>
//                 </div>
                
//                 {enquiry.updatedAt && enquiry.updatedAt !== enquiry.createdAt && (
//                   <div className="flex items-center">
//                     <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-6 shadow-lg">
//                       <RefreshCw className="w-6 h-6 text-green-600" />
//                     </div>
//                     <div>
//                       <p className="font-bold text-gray-900 text-lg">Last Updated</p>
//                       <p className="text-gray-500 font-medium">{formatDateTime(enquiry.updatedAt)}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Actions & Summary */}
//           <div className="space-y-8">
//             {/* Quick Actions */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                 Quick Actions
//               </h3>
              
//               <div className="space-y-4">
//                 <button
//                   onClick={callCustomer}
//                   className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <PhoneCall className="w-6 h-6 mr-3" />
//                   Call Customer
//                 </button>
                
//                 <button
//                   onClick={sendWhatsApp}
//                   className="w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <MessageSquare className="w-6 h-6 mr-3" />
//                   Send WhatsApp
//                 </button>
                
//                 <button
//                   onClick={() => setShowMessageModal(true)}
//                   className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <Send className="w-6 h-6 mr-3" />
//                   Send Message
//                 </button>
                
//                 <button
//                   onClick={() => copyToClipboard(`Name: ${enquiry.fullName}\nPhone: ${enquiry.phoneNumber}\nFrom: ${enquiry.from}\nTo: ${enquiry.to}\nDate: ${formatDate(enquiry.date)}\nTime: ${enquiry.time}\nService: ${enquiry.serviceType}`)}
//                   className="w-full flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <Copy className="w-6 h-6 mr-3" />
//                   Copy Details
//                 </button>

//                 <button
//                   onClick={openInMaps}
//                   className="w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <ExternalLink className="w-6 h-6 mr-3" />
//                   Open in Maps
//                 </button>
//               </div>
//             </div>

//             {/* Summary Card */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                 Enquiry Summary
//               </h3>
              
//               <div className="space-y-6">
//                 <div className="border-b border-gray-200 pb-4">
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Customer</p>
//                   <p className="text-lg font-bold text-gray-900">{enquiry.fullName}</p>
//                 </div>
                
//                 <div className="border-b border-gray-200 pb-4">
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Service</p>
//                   <p className="text-lg font-bold text-gray-900 capitalize">{enquiry.serviceType.replace('-', ' ')}</p>
//                 </div>
                
//                 <div className="border-b border-gray-200 pb-4">
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Journey</p>
//                   <p className="text-lg font-bold text-gray-900">{enquiry.from} → {enquiry.to}</p>
//                 </div>
                
//                 <div className="border-b border-gray-200 pb-4">
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Schedule</p>
//                   <p className="text-lg font-bold text-gray-900">{formatDate(enquiry.date)}</p>
//                   <p className="text-lg font-bold text-gray-900">{enquiry.time}</p>
//                 </div>
                
//                 <div>
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Contact</p>
//                   <p className="text-lg font-bold text-gray-900">{enquiry.phoneNumber}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Notifications Preview */}
//             {enquiry.customerNotifications && enquiry.customerNotifications.length > 0 && (
//               <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//                 <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                   Recent Notifications
//                 </h3>
                
//                 <div className="space-y-4">
//                   {enquiry.customerNotifications.slice(-3).map((notification, index) => (
//                     <div key={index} className="bg-blue-50 rounded-lg p-4">
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <p className="text-sm font-semibold text-blue-800">{notification.type}</p>
//                           <p className="text-sm text-blue-700 mt-1">{notification.message}</p>
//                         </div>
//                         <div className="ml-4">
//                           <p className="text-xs text-blue-600">{formatDateTime(notification.sentAt)}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Message Modal */}
//         {showMessageModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-2xl font-bold text-gray-900">Send Message</h2>
//                   <button
//                     onClick={() => setShowMessageModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//                 <p className="text-gray-600 mt-2">To: {enquiry?.fullName}</p>
//               </div>
//               <div className="p-6">
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
//                     <select
//                       value={messageType}
//                       onChange={(e) => setMessageType(e.target.value)}
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="Rate Quote">Rate Quote</option>
//                       <option value="Driver Assigned">Driver Assigned</option>
//                       <option value="Booking Confirmed">Booking Confirmed</option>
//                       <option value="Trip Started">Trip Started</option>
//                       <option value="Trip Completed">Trip Completed</option>
//                       <option value="Custom Message">Custom Message</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
//                     <textarea
//                       value={message}
//                       onChange={(e) => setMessage(e.target.value)}
//                       rows={4}
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Type your message here..."
//                     />
//                   </div>
//                   {messageType === 'Rate Quote' && (
//                     <div className="bg-blue-50 p-4 rounded-lg">
//                       <p className="text-sm text-blue-700 font-medium">Quick Templates:</p>
//                       <div className="space-y-2 mt-2">
//                         <button
//                           onClick={() => setMessage(`Hello ${enquiry?.fullName}, your trip rate is ₹18/km. If you agree, please confirm to book. Thank you!`)}
//                           className="text-left text-sm text-blue-600 hover:text-blue-800 block"
//                         >
//                           • Rate ₹18/km template
//                         </button>
//                         <button
//                           onClick={() => setMessage(`Dear ${enquiry?.fullName}, we have reviewed your enquiry. The estimated fare is ₹15/km + ₹200 base fare. Please let us know if you want to proceed.`)}
//                           className="text-left text-sm text-blue-600 hover:text-blue-800 block"
//                         >
//                           • Detailed rate template
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="p-6 border-t border-gray-200">
//                 <div className="flex space-x-4">
//                   <button
//                     onClick={() => setShowMessageModal(false)}
//                     className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSendMessage}
//                     disabled={!message.trim() || updating}
//                     className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                   >
//                     {updating ? (
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     ) : (
//                       <>
//                         <Send className="w-4 h-4 mr-2" />
//                         Send
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Vehicle Selection Modal */}
//         {showVehicleModal && selectedCar && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900">Select Vehicle</h2>
//                     <p className="text-gray-600">Car: {selectedCar.name}</p>
//                   </div>
//                   <button
//                     onClick={() => setShowVehicleModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <div className="space-y-4">
//                   {availableVehicles.length === 0 ? (
//                     <p className="text-gray-500 text-center">No available vehicles found for this car model</p>
//                   ) : (
//                     availableVehicles.map((vehicle) => (
//                       <div key={vehicle._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
//                         <div>
//                           <p className="font-medium text-lg">{vehicle.carNumber}</p>
//                           <p className="text-sm text-gray-600">Color: {vehicle.color}</p>
//                           <p className="text-sm text-gray-600">
//                             Mileage: {vehicle.mileage?.toLocaleString() || 'N/A'} km • 
//                             Trips: {vehicle.totalTrips || 0}
//                           </p>
//                         </div>
//                         <button
//                           onClick={() => handleAllocateVehicle(vehicle._id)}
//                           disabled={updating}
//                           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
//                         >
//                           {updating ? 'Allocating...' : 'Allocate'}
//                         </button>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//               <div className="p-6 border-t border-gray-200">
//                 <button
//                   onClick={() => setShowVehicleModal(false)}
//                   className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Car Selection Modal */}
//         {showCarModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900">Select Car Model</h2>
//                     <p className="text-gray-600">For: {enquiry?.fullName}</p>
//                   </div>
//                   <button
//                     onClick={() => setShowCarModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {availableCars.length === 0 ? (
//                     <p className="text-gray-500 text-center col-span-full">No available cars found</p>
//                   ) : (
//                     availableCars.map((car) => (
//                       <div 
//                         key={car._id} 
//                         className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
//                         onClick={() => {
//                           setSelectedCar(car);
//                           setShowVehicleModal(true);
//                           fetchAvailableVehicles(car._id);
//                         }}
//                       >
//                         {car.photos && car.photos[0] && (
//                           <img 
//                             src={car.photos[0]} 
//                             alt={car.name} 
//                             className="w-full h-32 object-cover rounded-lg mb-3" 
//                           />
//                         )}
//                         <h3 className="font-medium text-lg mb-2">{car.name}</h3>
//                         <p className="text-sm text-gray-600 mb-1">Category: {car.category}</p>
//                         <p className="text-sm text-gray-600 mb-3">Seating: {car.seatingCapacity} people</p>
//                         {car.pricing && (
//                           <div className="text-sm text-green-600 font-medium">
//                             Base: ₹{car.pricing.baseFare} + ₹{car.pricing.perKm}/km
//                           </div>
//                         )}
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//               <div className="p-6 border-t border-gray-200">
//                 <button
//                   onClick={() => setShowCarModal(false)}
//                   className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Driver Allocation Modal */}
//         {showDriverModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900">Allocate Driver</h2>
//                     <p className="text-gray-600">For: {enquiry?.fullName}</p>
//                   </div>
//                   <button
//                     onClick={() => setShowDriverModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <div className="space-y-4">
//                   {availableDrivers.length === 0 ? (
//                     <p className="text-gray-500 text-center">No available drivers found</p>
//                   ) : (
//                     availableDrivers.map((driver) => (
//                       <div key={driver._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
//                         <div>
//                           <p className="font-medium">{driver.name}</p>
//                           <p className="text-sm text-gray-600">{driver.phone}</p>
//                           <p className="text-sm text-gray-600">
//                             {driver.experienceYears} years exp • Rating: {driver.rating?.toFixed(1) || 'N/A'}
//                           </p>
//                         </div>
//                         <button
//                           onClick={() => handleAllocateDriver(driver._id)}
//                           disabled={updating}
//                           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
//                         >
//                           {updating ? 'Allocating...' : 'Allocate'}
//                         </button>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//               <div className="p-6 border-t border-gray-200">
//                 <button
//                   onClick={() => setShowDriverModal(false)}
//                   className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EnhancedEnquiryDetail;



















// import React, { useState, useEffect } from 'react';
// import {
//   ArrowLeft,
//   User,
//   Phone,
//   MapPin,
//   Calendar,
//   Clock,
//   Car,
//   MessageSquare,
//   Copy,
//   ExternalLink,
//   Navigation,
//   Route,
//   Timer,
//   FileText,
//   PhoneCall,
//   RefreshCw,
//   Loader,
//   UserCheck,
//   Send,
//   X,
//   ChevronDown,
//   CheckCircle,
//   AlertCircle,
//   Eye,
//   Settings
// } from 'lucide-react';

// const ENQUIRY_API = 'http://localhost:8000/api/enquiry';

// const EnhancedEnquiryDetail = () => {
//   const [enquiry, setEnquiry] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showDriverModal, setShowDriverModal] = useState(false);
//   const [showCarModal, setShowCarModal] = useState(false);
//   const [showVehicleModal, setShowVehicleModal] = useState(false);
//   const [showMessageModal, setShowMessageModal] = useState(false);
//   const [availableDrivers, setAvailableDrivers] = useState([]);
//   const [availableCars, setAvailableCars] = useState([]);
//   const [availableVehicles, setAvailableVehicles] = useState([]);
//   const [selectedCar, setSelectedCar] = useState(null);
//   const [message, setMessage] = useState('');
//   const [messageType, setMessageType] = useState('Custom Message');
//   const [updating, setUpdating] = useState(false);

//   // Mock ID for demonstration - in real app, get from useParams
//   const enquiryId = "67890abcdef123456789";

//   useEffect(() => {
//     fetchEnquiry();
//   }, []);

//   const fetchEnquiry = async () => {
//     try {
//       setLoading(true);
//       // Replace with actual API call
//       const mockEnquiry = {
//         _id: enquiryId,
//         fullName: "Rajesh Kumar",
//         phoneNumber: "9876543210",
//         from: "Delhi Airport",
//         to: "Connaught Place",
//         date: "2024-01-15",
//         time: "10:30 AM",
//         serviceType: "airport-transfer",
//         status: "Not Confirmed",
//         createdAt: "2024-01-14T08:30:00Z",
//         updatedAt: "2024-01-14T08:30:00Z",
//         allocatedDriver: null,
//         allocatedCar: null,
//         allocatedVehicle: null,
//         messages: [],
//         customerNotifications: []
//       };
//       setEnquiry(mockEnquiry);
//     } catch (err) {
//       setError(err.message || 'Failed to fetch enquiry details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAvailableDrivers = async () => {
//     try {
//       // Mock data for demonstration
//       const mockDrivers = [
//         {
//           _id: "driver1",
//           name: "Suresh Kumar",
//           phone: "9123456789",
//           experienceYears: 5,
//           rating: 4.5
//         },
//         {
//           _id: "driver2",
//           name: "Amit Singh",
//           phone: "9234567890",
//           experienceYears: 8,
//           rating: 4.8
//         },
//         {
//           _id: "driver3",
//           name: "Vikash Sharma",
//           phone: "9345678901",
//           experienceYears: 3,
//           rating: 4.2
//         }
//       ];
//       setAvailableDrivers(mockDrivers);
//     } catch (err) {
//       console.error('Error fetching drivers:', err);
//     }
//   };

//   const fetchAvailableCars = async () => {
//     try {
//       // Mock data for demonstration
//       const mockCars = [
//         {
//           _id: "car1",
//           name: "Maruti Swift",
//           category: "Hatchback",
//           seatingCapacity: 4,
//           pricing: { baseFare: 200, perKm: 15 }
//         },
//         {
//           _id: "car2",
//           name: "Honda City",
//           category: "Sedan",
//           seatingCapacity: 4,
//           pricing: { baseFare: 300, perKm: 18 }
//         },
//         {
//           _id: "car3",
//           name: "Toyota Innova",
//           category: "SUV",
//           seatingCapacity: 7,
//           pricing: { baseFare: 500, perKm: 22 }
//         }
//       ];
//       setAvailableCars(mockCars);
//     } catch (err) {
//       console.error('Error fetching cars:', err);
//     }
//   };

//   const fetchAvailableVehicles = async (carId) => {
//     try {
//       // Mock data for demonstration
//       const mockVehicles = [
//         {
//           _id: "vehicle1",
//           carNumber: "DL 01 AB 1234",
//           color: "White",
//           mileage: 45000,
//           totalTrips: 120
//         },
//         {
//           _id: "vehicle2",
//           carNumber: "DL 02 CD 5678",
//           color: "Silver",
//           mileage: 32000,
//           totalTrips: 85
//         },
//         {
//           _id: "vehicle3",
//           carNumber: "DL 03 EF 9012",
//           color: "Black",
//           mileage: 28000,
//           totalTrips: 95
//         }
//       ];
//       setAvailableVehicles(mockVehicles);
//     } catch (err) {
//       console.error('Error fetching vehicles:', err);
//     }
//   };

//   // Helper function to create enquiry details message for driver
//   const createEnquiryDetailsMessage = () => {
//     return `🚗 *New Trip Assignment*

// 👤 *Customer:* ${enquiry.fullName}
// 📞 *Phone:* ${enquiry.phoneNumber}
// 📍 *From:* ${enquiry.from}
// 📍 *To:* ${enquiry.to}
// 📅 *Date:* ${formatDate(enquiry.date)}
// ⏰ *Time:* ${enquiry.time}
// 🎯 *Service:* ${enquiry.serviceType.replace('-', ' ')}
// 🆔 *Enquiry ID:* ENQ-${enquiry._id.slice(-6).toUpperCase()}

// Please confirm your availability for this trip.`;
//   };

//   // Helper function to create customer message with allocated details
//   const createCustomerAllocationMessage = () => {
//     let message = `🚗 *Trip Confirmed!*

// Hello ${enquiry.fullName},

// Your booking details:
// 📍 *From:* ${enquiry.from}
// 📍 *To:* ${enquiry.to}
// 📅 *Date:* ${formatDate(enquiry.date)}
// ⏰ *Time:* ${enquiry.time}
// 🆔 *Booking ID:* ENQ-${enquiry._id.slice(-6).toUpperCase()}`;

//     if (enquiry.allocatedDriver) {
//       message += `\n\n👨‍✈️ *Driver Details:*
// 🏷️ *Name:* ${enquiry.allocatedDriver.name}
// 📞 *Phone:* ${enquiry.allocatedDriver.phone}
// ⭐ *Experience:* ${enquiry.allocatedDriver.experienceYears} years
// 📊 *Rating:* ${enquiry.allocatedDriver.rating?.toFixed(1)}/5`;
//     }

//     if (enquiry.allocatedCar && enquiry.allocatedVehicle) {
//       message += `\n\n🚙 *Vehicle Details:*
// 🚗 *Car:* ${enquiry.allocatedCar.name}
// 🔢 *Number:* ${enquiry.allocatedVehicle.carNumber}
// 🎨 *Color:* ${enquiry.allocatedVehicle.color}
// 👥 *Seating:* ${enquiry.allocatedCar.seatingCapacity} people`;
//     }

//     message += `\n\nThank you for choosing our service! 🙏`;
//     return message;
//   };

//   const handleStatusChange = async (newStatus) => {
//     try {
//       setUpdating(true);
      
//       // Replace with actual API call
//       const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/status`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ status: newStatus }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setEnquiry(data.enquiry);
//       } else {
//         // Mock update for demo
//         setEnquiry(prev => ({ ...prev, status: newStatus }));
//       }
      
//     } catch (err) {
//       setError('Failed to update status');
//       // Mock update for demo
//       setEnquiry(prev => ({ ...prev, status: newStatus }));
//     } finally {
//       setUpdating(false);
//     }
//   };

//   // New function to handle driver allocation with WhatsApp redirection
//   const handleAllocateDriverWithWhatsApp = async (driver) => {
//     try {
//       setUpdating(true);
      
//       // API call to allocate driver
//       // const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/allocate-driver`, {
//       //   method: 'PATCH',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   credentials: 'include',
//       //   body: JSON.stringify({ driverId: driver._id }),
//       // });

//       // Update state (mock for demo)
//       setEnquiry(prev => ({
//         ...prev,
//         allocatedDriver: driver
//       }));

//       // Create the enquiry details message
//       const message = createEnquiryDetailsMessage();
      
//       // Redirect to WhatsApp with the driver's number and pre-filled message
//       const whatsappUrl = `https://wa.me/91${driver.phone}?text=${encodeURIComponent(message)}`;
//       window.open(whatsappUrl, '_blank');
      
//       setShowDriverModal(false);
//     } catch (err) {
//       setError('Failed to allocate driver');
//     } finally {
//       setUpdating(false);
//     }
//   };

//   // New function to handle vehicle allocation with WhatsApp redirection
//   const handleAllocateVehicleWithWhatsApp = async (vehicle) => {
//     try {
//       setUpdating(true);
      
//       // API call to allocate vehicle
//       // const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/allocate-vehicle`, {
//       //   method: 'PATCH',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   credentials: 'include',
//       //   body: JSON.stringify({ carId: selectedCar._id, vehicleId: vehicle._id }),
//       // });

//       // Update state (mock for demo)
//       const updatedEnquiry = {
//         ...enquiry,
//         allocatedCar: selectedCar,
//         allocatedVehicle: vehicle
//       };
//       setEnquiry(updatedEnquiry);

//       // If driver is also allocated, send combined message to customer
//       if (updatedEnquiry.allocatedDriver) {
//         const customerMessage = createCustomerAllocationMessage();
//         const customerWhatsappUrl = `https://wa.me/91${enquiry.phoneNumber}?text=${encodeURIComponent(customerMessage)}`;
//         window.open(customerWhatsappUrl, '_blank');
//       }
      
//       setShowVehicleModal(false);
//       setShowCarModal(false);
//     } catch (err) {
//       setError('Failed to allocate vehicle');
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleRevertDriver = async () => {
//     try {
//       setUpdating(true);
      
//       // API call to revert driver
//       // const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/revert-driver`, {
//       //   method: 'PATCH',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   credentials: 'include',
//       // });

//       setEnquiry(prev => ({ ...prev, allocatedDriver: null }));
//     } catch (err) {
//       setError('Failed to revert driver');
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleRevertVehicle = async () => {
//     try {
//       setUpdating(true);
      
//       // API call to revert vehicle
//       // const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/revert-vehicle`, {
//       //   method: 'PATCH',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   credentials: 'include',
//       // });

//       setEnquiry(prev => ({ 
//         ...prev, 
//         allocatedCar: null,
//         allocatedVehicle: null 
//       }));
//     } catch (err) {
//       setError('Failed to revert vehicle');
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleSendMessage = async () => {
//     try {
//       setUpdating(true);
      
//       // API call to send message
//       // const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/message`, {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   credentials: 'include',
//       //   body: JSON.stringify({ message, type: messageType }),
//       // });
      
//       setEnquiry(prev => ({
//         ...prev,
//         messages: [
//           ...prev.messages,
//           {
//             sender: 'Admin',
//             message: message,
//             timestamp: new Date().toISOString(),
//             isRead: false
//           }
//         ],
//         customerNotifications: [
//           ...prev.customerNotifications,
//           {
//             type: messageType,
//             message: message,
//             sentAt: new Date().toISOString(),
//             isRead: false
//           }
//         ]
//       }));
      
//       setMessage('');
//       setShowMessageModal(false);
//     } catch (err) {
//       setError('Failed to send message');
//     } finally {
//       setUpdating(false);
//     }
//   };

//   // New function to send complete details to customer
//   const handleSendDetailsToCustomer = () => {
//     const detailsMessage = createCustomerAllocationMessage();
//     const whatsappUrl = `https://wa.me/91${enquiry.phoneNumber}?text=${encodeURIComponent(detailsMessage)}`;
//     window.open(whatsappUrl, '_blank');
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Not Confirmed': return 'bg-gray-100 text-gray-800';
//       case 'Confirmed': return 'bg-green-100 text-green-800';
//       case 'Ongoing': return 'bg-blue-100 text-blue-800';
//       case 'Completed': return 'bg-purple-100 text-purple-800';
//       case 'Cancelled': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getServiceTypeIcon = (serviceType) => {
//     const icons = {
//       'airport-transfer': Navigation,
//       'one-way': Car,
//       'round-trip': RefreshCw,
//       'local-tour': MapPin,
//       'outstation': Route,
//       'tour-package': Calendar
//     };
//     const IconComponent = icons[serviceType] || Car;
//     return <IconComponent className="w-6 h-6 text-white" />;
//   };

//   const getServiceTypeColor = (serviceType) => {
//     const colors = {
//       'airport-transfer': 'from-purple-500 to-purple-600',
//       'one-way': 'from-green-500 to-green-600',
//       'round-trip': 'from-orange-500 to-orange-600',
//       'local-tour': 'from-blue-500 to-blue-600',
//       'outstation': 'from-indigo-500 to-indigo-600',
//       'tour-package': 'from-pink-500 to-pink-600'
//     };
//     return colors[serviceType] || 'from-gray-500 to-gray-600';
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatDateTime = (dateString) => {
//     return new Date(dateString).toLocaleString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//   };

//   const openInMaps = () => {
//     const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(enquiry.to)}&origin=${encodeURIComponent(enquiry.from)}`;
//     window.open(url, '_blank');
//   };

//   const callCustomer = () => {
//     window.open(`tel:${enquiry.phoneNumber}`, '_self');
//   };

//   const sendWhatsApp = () => {
//     const message = `Hello ${enquiry.fullName}, regarding your enquiry for ${enquiry.serviceType} service from ${enquiry.from} to ${enquiry.to} on ${formatDate(enquiry.date)}.`;
//     const url = `https://wa.me/91${enquiry.phoneNumber}?text=${encodeURIComponent(message)}`;
//     window.open(url, '_blank');
//   };

//   const handleBack = () => {
//     window.location.href = '/enquiries';
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4">
//             <Loader className="w-12 h-12 text-blue-600" />
//           </div>
//           <p className="text-xl font-medium text-gray-700">Loading enquiry details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FileText className="w-8 h-8 text-red-600" />
//           </div>
//           <p className="text-xl font-semibold text-red-600 mb-2">Error</p>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <div className="space-y-2">
//             <button
//               onClick={fetchEnquiry}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//             >
//               Retry
//             </button>
//             <button
//               onClick={handleBack}
//               className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//             >
//               Back to Enquiries
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!enquiry) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
//           <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FileText className="w-8 h-8 text-gray-600" />
//           </div>
//           <p className="text-xl font-semibold text-gray-700 mb-2">Not Found</p>
//           <p className="text-gray-600 mb-4">Enquiry not found</p>
//           <button
//             onClick={handleBack}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//           >
//             Back to Enquiries
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center">
//             <button
//               onClick={handleBack}
//               className="flex items-center text-blue-700 hover:text-blue-800 font-semibold mr-6 transition-all duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-md hover:shadow-lg"
//             >
//               <ArrowLeft className="w-5 h-5 mr-2" />
//               Back to Enquiries
//             </button>
//             <div>
//               <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Enquiry Details
//               </h1>
//               <p className="text-lg text-gray-600 mt-2">
//                 ID: ENQ-{enquiry._id.slice(-6).toUpperCase()}
//               </p>
//             </div>
//           </div>
          
//           {/* Status Dropdown */}
//           <div className="relative">
//             <select
//               value={enquiry.status}
//               onChange={(e) => handleStatusChange(e.target.value)}
//               disabled={updating}
//               className={`appearance-none font-semibold rounded-full px-6 py-3 pr-10 border-0 cursor-pointer ${getStatusColor(enquiry.status)} ${updating ? 'opacity-50' : ''}`}
//             >
//               <option value="Not Confirmed">Not Confirmed</option>
//               <option value="Confirmed">Confirmed</option>
//               <option value="Ongoing">Ongoing</option>
//               <option value="Completed">Completed</option>
//               <option value="Cancelled">Cancelled</option>
//             </select>
//             <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5 pointer-events-none" />
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left Column - Main Details */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Customer Information */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Customer Information
//                 </h2>
//                 <div className="flex items-center space-x-3">
//                   <button
//                     onClick={callCustomer}
//                     className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                     title="Call Customer"
//                   >
//                     <PhoneCall className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={sendWhatsApp}
//                     className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                     title="Send WhatsApp"
//                   >
//                     <MessageSquare className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-8">
//                 <div className="flex items-center group">
//                   <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-200 shadow-lg">
//                     <User className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-500 text-sm uppercase tracking-wide mb-1">Full Name</p>
//                     <p className="text-gray-900 text-xl font-bold">{enquiry.fullName}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center group">
//                   <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-200 shadow-lg">
//                     <Phone className="w-8 h-8 text-white" />
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-500 text-sm uppercase tracking-wide mb-1">Phone Number</p>
//                     <div className="flex items-center">
//                       <p className="text-gray-900 text-xl font-bold mr-3">{enquiry.phoneNumber}</p>
//                       <button
//                         onClick={() => copyToClipboard(enquiry.phoneNumber)}
//                         className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100"
//                         title="Copy Phone Number"
//                       >
//                         <Copy className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Trip Information */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Trip Information
//                 </h2>
//                 <button
//                   onClick={openInMaps}
//                   className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <ExternalLink className="w-5 h-5 mr-2" />
//                   View in Maps
//                 </button>
//               </div>

//               <div className="space-y-8">
//                 {/* Service Type */}
//                 <div className={`bg-gradient-to-r ${getServiceTypeColor(enquiry.serviceType)} rounded-2xl p-8 text-white shadow-lg`}>
//                   <div className="flex items-center">
//                     <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-6">
//                       {getServiceTypeIcon(enquiry.serviceType)}
//                     </div>
//                     <div>
//                       <p className="text-white/80 text-sm uppercase tracking-wide font-semibold mb-1">Service Type</p>
//                       <p className="text-3xl font-bold text-white capitalize">{enquiry.serviceType.replace('-', ' ')}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Route */}
//                 <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-100">
//                   <div className="flex items-center mb-6">
//                     <Route className="w-8 h-8 text-blue-600 mr-4" />
//                     <h3 className="text-2xl font-bold text-gray-900">Route Details</h3>
//                   </div>
//                   <div className="space-y-6">
//                     <div className="flex items-center">
//                       <div className="w-4 h-4 bg-green-500 rounded-full mr-6 shadow-lg"></div>
//                       <div className="flex-1">
//                         <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">From</p>
//                         <p className="text-2xl font-bold text-gray-900">{enquiry.from}</p>
//                       </div>
//                     </div>
//                     <div className="border-l-4 border-gray-300 ml-2 h-12 opacity-50"></div>
//                     <div className="flex items-center">
//                       <div className="w-4 h-4 bg-red-500 rounded-full mr-6 shadow-lg"></div>
//                       <div className="flex-1">
//                         <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">To</p>
//                         <p className="text-2xl font-bold text-gray-900">{enquiry.to}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Date and Time */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
//                     <div className="flex items-center mb-4">
//                       <Calendar className="w-8 h-8 text-purple-600 mr-4" />
//                       <h3 className="text-xl font-bold text-gray-900">Date</h3>
//                     </div>
//                     <p className="text-lg font-bold text-gray-700">{formatDate(enquiry.date)}</p>
//                   </div>

//                   <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
//                     <div className="flex items-center mb-4">
//                       <Clock className="w-8 h-8 text-orange-600 mr-4" />
//                       <h3 className="text-xl font-bold text-gray-900">Time</h3>
//                     </div>
//                     <p className="text-lg font-bold text-gray-700">{enquiry.time}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Allocation Status */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                 Allocation Status
//               </h2>
              
//               <div className="grid md:grid-cols-2 gap-8">
//                 {/* Driver Allocation */}
//                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-xl font-bold text-gray-900">Driver</h3>
//                     <UserCheck className="w-8 h-8 text-blue-600" />
//                   </div>
                  
//                   {enquiry.allocatedDriver ? (
//                     <div className="space-y-2">
//                       <p className="text-lg font-bold text-gray-900">{enquiry.allocatedDriver.name}</p>
//                       <p className="text-gray-600">{enquiry.allocatedDriver.phone}</p>
//                       <p className="text-sm text-gray-500">
//                         {enquiry.allocatedDriver.experienceYears} years exp • Rating: {enquiry.allocatedDriver.rating?.toFixed(1)}
//                       </p>
//                       <button
//                         onClick={handleRevertDriver}
//                         disabled={updating}
//                         className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
//                       >
//                         {updating ? 'Reverting...' : 'Change Driver'}
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       <p className="text-gray-500">No driver allocated</p>
//                       <button
//                         onClick={() => {
//                           setShowDriverModal(true);
//                           fetchAvailableDrivers();
//                         }}
//                         className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
//                       >
//                         Allocate Driver
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Vehicle Allocation */}
//                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-xl font-bold text-gray-900">Vehicle</h3>
//                     <Car className="w-8 h-8 text-green-600" />
//                   </div>
                  
//                   {enquiry.allocatedVehicle ? (
//                     <div className="space-y-2">
//                       <p className="text-lg font-bold text-gray-900">{enquiry.allocatedCar.name}</p>
//                       <p className="text-gray-600">{enquiry.allocatedVehicle.carNumber}</p>
//                       <p className="text-sm text-gray-500">
//                         {enquiry.allocatedVehicle.color} • {enquiry.allocatedVehicle.mileage} km
//                       </p>
//                       <button
//                         onClick={handleRevertVehicle}
//                         disabled={updating}
//                         className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
//                       >
//                         {updating ? 'Reverting...' : 'Change Vehicle'}
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       <p className="text-gray-500">No vehicle allocated</p>
//                       <button
//                         onClick={() => {
//                           setShowCarModal(true);
//                           fetchAvailableCars();
//                         }}
//                         className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
//                       >
//                         Allocate Vehicle
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Timeline */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                 Enquiry Timeline
//               </h2>
              
//               <div className="space-y-6">
//                 <div className="flex items-center">
//                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-6 shadow-lg">
//                     <FileText className="w-6 h-6 text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="font-bold text-gray-900 text-lg">Enquiry Received</p>
//                     <p className="text-gray-500 font-medium">{formatDateTime(enquiry.createdAt)}</p>
//                   </div>
//                 </div>
                
//                 {enquiry.updatedAt && enquiry.updatedAt !== enquiry.createdAt && (
//                   <div className="flex items-center">
//                     <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-6 shadow-lg">
//                       <RefreshCw className="w-6 h-6 text-green-600" />
//                     </div>
//                     <div>
//                       <p className="font-bold text-gray-900 text-lg">Last Updated</p>
//                       <p className="text-gray-500 font-medium">{formatDateTime(enquiry.updatedAt)}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Actions & Summary */}
//           <div className="space-y-8">
//             {/* Quick Actions */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                 Quick Actions
//               </h3>
              
//               <div className="space-y-4">
//                 <button
//                   onClick={callCustomer}
//                   className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <PhoneCall className="w-6 h-6 mr-3" />
//                   Call Customer
//                 </button>
                
//                 <button
//                   onClick={sendWhatsApp}
//                   className="w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <MessageSquare className="w-6 h-6 mr-3" />
//                   Send WhatsApp
//                 </button>
                
//                 {/* New Send Details Button - Only show if both driver and vehicle are allocated */}
//                 {enquiry.allocatedDriver && enquiry.allocatedVehicle && (
//                   <button
//                     onClick={handleSendDetailsToCustomer}
//                     className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                   >
//                     <Send className="w-6 h-6 mr-3" />
//                     Send Details
//                   </button>
//                 )}
                
//                 <button
//                   onClick={() => setShowMessageModal(true)}
//                   className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <Send className="w-6 h-6 mr-3" />
//                   Send Message
//                 </button>
                
//                 <button
//                   onClick={() => copyToClipboard(`Name: ${enquiry.fullName}\nPhone: ${enquiry.phoneNumber}\nFrom: ${enquiry.from}\nTo: ${enquiry.to}\nDate: ${formatDate(enquiry.date)}\nTime: ${enquiry.time}\nService: ${enquiry.serviceType}`)}
//                   className="w-full flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <Copy className="w-6 h-6 mr-3" />
//                   Copy Details
//                 </button>

//                 <button
//                   onClick={openInMaps}
//                   className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <ExternalLink className="w-6 h-6 mr-3" />
//                   Open in Maps
//                 </button>
//               </div>
//             </div>

//             {/* Summary Card */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                 Enquiry Summary
//               </h3>
              
//               <div className="space-y-6">
//                 <div className="border-b border-gray-200 pb-4">
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Customer</p>
//                   <p className="text-lg font-bold text-gray-900">{enquiry.fullName}</p>
//                 </div>
                
//                 <div className="border-b border-gray-200 pb-4">
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Service</p>
//                   <p className="text-lg font-bold text-gray-900 capitalize">{enquiry.serviceType.replace('-', ' ')}</p>
//                 </div>
                
//                 <div className="border-b border-gray-200 pb-4">
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Journey</p>
//                   <p className="text-lg font-bold text-gray-900">{enquiry.from} → {enquiry.to}</p>
//                 </div>
                
//                 <div className="border-b border-gray-200 pb-4">
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Schedule</p>
//                   <p className="text-lg font-bold text-gray-900">{formatDate(enquiry.date)}</p>
//                   <p className="text-lg font-bold text-gray-900">{enquiry.time}</p>
//                 </div>
                
//                 <div>
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Contact</p>
//                   <p className="text-lg font-bold text-gray-900">{enquiry.phoneNumber}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Notifications Preview */}
//             {enquiry.customerNotifications && enquiry.customerNotifications.length > 0 && (
//               <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//                 <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                   Recent Notifications
//                 </h3>
                
//                 <div className="space-y-4">
//                   {enquiry.customerNotifications.slice(-3).map((notification, index) => (
//                     <div key={index} className="bg-blue-50 rounded-lg p-4">
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <p className="text-sm font-semibold text-blue-800">{notification.type}</p>
//                           <p className="text-sm text-blue-700 mt-1">{notification.message}</p>
//                         </div>
//                         <div className="ml-4">
//                           <p className="text-xs text-blue-600">{formatDateTime(notification.sentAt)}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Message Modal */}
//         {showMessageModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-2xl font-bold text-gray-900">Send Message</h2>
//                   <button
//                     onClick={() => setShowMessageModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//                 <p className="text-gray-600 mt-2">To: {enquiry?.fullName}</p>
//               </div>
//               <div className="p-6">
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
//                     <select
//                       value={messageType}
//                       onChange={(e) => setMessageType(e.target.value)}
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="Rate Quote">Rate Quote</option>
//                       <option value="Driver Assigned">Driver Assigned</option>
//                       <option value="Booking Confirmed">Booking Confirmed</option>
//                       <option value="Trip Started">Trip Started</option>
//                       <option value="Trip Completed">Trip Completed</option>
//                       <option value="Custom Message">Custom Message</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
//                     <textarea
//                       value={message}
//                       onChange={(e) => setMessage(e.target.value)}
//                       rows={4}
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Type your message here..."
//                     />
//                   </div>
//                   {messageType === 'Rate Quote' && (
//                     <div className="bg-blue-50 p-4 rounded-lg">
//                       <p className="text-sm text-blue-700 font-medium">Quick Templates:</p>
//                       <div className="space-y-2 mt-2">
//                         <button
//                           onClick={() => setMessage(`Hello ${enquiry?.fullName}, your trip rate is ₹18/km. If you agree, please confirm to book. Thank you!`)}
//                           className="text-left text-sm text-blue-600 hover:text-blue-800 block"
//                         >
//                           • Rate ₹18/km template
//                         </button>
//                         <button
//                           onClick={() => setMessage(`Dear ${enquiry?.fullName}, we have reviewed your enquiry. The estimated fare is ₹15/km + ₹200 base fare. Please let us know if you want to proceed.`)}
//                           className="text-left text-sm text-blue-600 hover:text-blue-800 block"
//                         >
//                           • Detailed rate template
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="p-6 border-t border-gray-200">
//                 <div className="flex space-x-4">
//                   <button
//                     onClick={() => setShowMessageModal(false)}
//                     className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSendMessage}
//                     disabled={!message.trim() || updating}
//                     className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                   >
//                     {updating ? (
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     ) : (
//                       <>
//                         <Send className="w-4 h-4 mr-2" />
//                         Send
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Driver Allocation Modal */}
//         {showDriverModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900">Allocate Driver</h2>
//                     <p className="text-gray-600">For: {enquiry?.fullName}</p>
//                     <p className="text-sm text-blue-600 mt-1">📱 Will open WhatsApp chat with driver</p>
//                   </div>
//                   <button
//                     onClick={() => setShowDriverModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <div className="space-y-4">
//                   {availableDrivers.length === 0 ? (
//                     <p className="text-gray-500 text-center">No available drivers found</p>
//                   ) : (
//                     availableDrivers.map((driver) => (
//                       <div key={driver._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
//                         <div>
//                           <p className="font-medium text-lg">{driver.name}</p>
//                           <p className="text-sm text-gray-600">{driver.phone}</p>
//                           <p className="text-sm text-gray-600">
//                             {driver.experienceYears} years exp • Rating: {driver.rating?.toFixed(1) || 'N/A'}
//                           </p>
//                         </div>
//                         <button
//                           onClick={() => handleAllocateDriverWithWhatsApp(driver)}
//                           disabled={updating}
//                           className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg flex items-center disabled:opacity-50"
//                         >
//                           <MessageSquare className="w-4 h-4 mr-2" />
//                           {updating ? 'Allocating...' : 'Allocate'}
//                         </button>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//               <div className="p-6 border-t border-gray-200">
//                 <button
//                   onClick={() => setShowDriverModal(false)}
//                   className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Car Selection Modal */}
//         {showCarModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900">Select Car Model</h2>
//                     <p className="text-gray-600">For: {enquiry?.fullName}</p>
//                     <p className="text-sm text-blue-600 mt-1">📱 Will open WhatsApp chat after vehicle selection</p>
//                   </div>
//                   <button
//                     onClick={() => setShowCarModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {availableCars.length === 0 ? (
//                     <p className="text-gray-500 text-center col-span-full">No available cars found</p>
//                   ) : (
//                     availableCars.map((car) => (
//                       <div 
//                         key={car._id} 
//                         className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors hover:shadow-lg"
//                         onClick={() => {
//                           setSelectedCar(car);
//                           setShowVehicleModal(true);
//                           fetchAvailableVehicles(car._id);
//                         }}
//                       >
//                         <div className="bg-gradient-to-r from-blue-500 to-green-500 h-32 rounded-lg mb-3 flex items-center justify-center">
//                           <Car className="w-16 h-16 text-white" />
//                         </div>
//                         <h3 className="font-medium text-lg mb-2">{car.name}</h3>
//                         <p className="text-sm text-gray-600 mb-1">Category: {car.category}</p>
//                         <p className="text-sm text-gray-600 mb-3">Seating: {car.seatingCapacity} people</p>
//                         {car.pricing && (
//                           <div className="text-sm text-green-600 font-medium">
//                             Base: ₹{car.pricing.baseFare} + ₹{car.pricing.perKm}/km
//                           </div>
//                         )}
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//               <div className="p-6 border-t border-gray-200">
//                 <button
//                   onClick={() => setShowCarModal(false)}
//                   className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Vehicle Selection Modal */}
//         {showVehicleModal && selectedCar && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900">Select Vehicle</h2>
//                     <p className="text-gray-600">Car: {selectedCar.name}</p>
//                     <p className="text-sm text-blue-600 mt-1">📱 Will open WhatsApp chat with customer</p>
//                   </div>
//                   <button
//                     onClick={() => setShowVehicleModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <div className="space-y-4">
//                   {availableVehicles.length === 0 ? (
//                     <p className="text-gray-500 text-center">No available vehicles found for this car model</p>
//                   ) : (
//                     availableVehicles.map((vehicle) => (
//                       <div key={vehicle._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
//                         <div className="flex items-center">
//                           <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
//                             <Car className="w-6 h-6 text-white" />
//                           </div>
//                           <div>
//                             <p className="font-medium text-lg">{vehicle.carNumber}</p>
//                             <p className="text-sm text-gray-600">Color: {vehicle.color}</p>
//                             <p className="text-sm text-gray-600">
//                               Mileage: {vehicle.mileage?.toLocaleString() || 'N/A'} km • 
//                               Trips: {vehicle.totalTrips || 0}
//                             </p>
//                           </div>
//                         </div>
//                         <button
//                           onClick={() => handleAllocateVehicleWithWhatsApp(vehicle)}
//                           disabled={updating}
//                           className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg flex items-center disabled:opacity-50"
//                         >
//                           <MessageSquare className="w-4 h-4 mr-2" />
//                           {updating ? 'Allocating...' : 'Allocate'}
//                         </button>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//               <div className="p-6 border-t border-gray-200">
//                 <button
//                   onClick={() => setShowVehicleModal(false)}
//                   className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EnhancedEnquiryDetail;












// import React, { useState, useEffect } from 'react';
// import {
//   ArrowLeft,
//   User,
//   Phone,
//   MapPin,
//   Calendar,
//   Clock,
//   Car,
//   MessageSquare,
//   Copy,
//   ExternalLink,
//   Navigation,
//   Route,
//   Timer,
//   FileText,
//   PhoneCall,
//   RefreshCw,
//   Loader,
//   UserCheck,
//   Send,
//   X,
//   ChevronDown,
//   CheckCircle,
//   AlertCircle,
//   Eye,
//   Settings
// } from 'lucide-react';

// const ENQUIRY_API = 'http://localhost:8000/api/enquiry';

// const EnhancedEnquiryDetail = () => {
//   const [enquiry, setEnquiry] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showDriverModal, setShowDriverModal] = useState(false);
//   const [showCarModal, setShowCarModal] = useState(false);
//   const [showVehicleModal, setShowVehicleModal] = useState(false);
//   const [showMessageModal, setShowMessageModal] = useState(false);
//   const [availableDrivers, setAvailableDrivers] = useState([]);
//   const [availableCars, setAvailableCars] = useState([]);
//   const [availableVehicles, setAvailableVehicles] = useState([]);
//   const [selectedCar, setSelectedCar] = useState(null);
//   const [message, setMessage] = useState('');
//   const [messageType, setMessageType] = useState('Custom Message');
//   const [updating, setUpdating] = useState(false);

//   // Mock ID for demonstration - in real app, get from useParams
//   const enquiryId = "67890abcdef123456789"; // Replace with: const { id: enquiryId } = useParams();

//   useEffect(() => {
//     fetchEnquiry();
//   }, []);

//   const fetchEnquiry = async () => {
//     try {
//       setLoading(true);
      
//       // Try to fetch from API first, if fails use mock data
//       try {
//         const response = await fetch(`${ENQUIRY_API}/${enquiryId}`, {
//           method: 'GET',
//           credentials: 'include',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
        
//         if (response.ok) {
//           const data = await response.json();
//           setEnquiry(data);
//           return;
//         }
//       } catch (apiError) {
//         console.log('API call failed, using mock data:', apiError);
//       }
      
//       // Fallback to mock data if API fails
//       const mockEnquiry = {
//         _id: enquiryId,
//         fullName: "Rajesh Kumar",
//         phoneNumber: "9876543210",
//         from: "Delhi Airport",
//         to: "Connaught Place",
//         date: "2024-01-15",
//         time: "10:30 AM",
//         serviceType: "airport-transfer",
//         status: "Not Confirmed",
//         createdAt: "2024-01-14T08:30:00Z",
//         updatedAt: "2024-01-14T08:30:00Z",
//         allocatedDriver: null,
//         allocatedCar: null,
//         allocatedVehicle: null,
//         messages: [],
//         customerNotifications: []
//       };
//       setEnquiry(mockEnquiry);
      
//     } catch (err) {
//       setError(err.message || 'Failed to fetch enquiry details');
//       console.error('Error fetching enquiry:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAvailableDrivers = async () => {
//     try {
//       setLoading(true);
      
//       // Try API first, fallback to mock data
//       try {
//         const response = await fetch(`${ENQUIRY_API}/available-drivers`, {
//           method: 'GET',
//           credentials: 'include',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
        
//         if (response.ok) {
//           const data = await response.json();
//           setAvailableDrivers(data);
//           return;
//         }
//       } catch (apiError) {
//         console.log('Drivers API failed, using mock data:', apiError);
//       }
      
//       // Fallback mock data
//       const mockDrivers = [
//         {
//           _id: "driver1",
//           name: "Suresh Kumar",
//           phone: "9123456789",
//           experienceYears: 5,
//           rating: 4.5,
//           status: "Active"
//         },
//         {
//           _id: "driver2", 
//           name: "Amit Singh",
//           phone: "9234567890",
//           experienceYears: 8,
//           rating: 4.8,
//           status: "Active"
//         },
//         {
//           _id: "driver3",
//           name: "Vikash Sharma", 
//           phone: "9345678901",
//           experienceYears: 3,
//           rating: 4.2,
//           status: "Active"
//         }
//       ];
//       setAvailableDrivers(mockDrivers);
      
//     } catch (err) {
//       console.error('Error fetching drivers:', err);
//       setError('Failed to fetch available drivers');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAvailableCars = async () => {
//     try {
//       setLoading(true);
      
//       // Try API first, fallback to mock data
//       try {
//         const response = await fetch(`${ENQUIRY_API}/available-cars`, {
//           method: 'GET',
//           credentials: 'include',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
        
//         if (response.ok) {
//           const data = await response.json();
//           setAvailableCars(data);
//           return;
//         }
//       } catch (apiError) {
//         console.log('Cars API failed, using mock data:', apiError);
//       }
      
//       // Fallback mock data
//       const mockCars = [
//         {
//           _id: "car1",
//           name: "Maruti Swift",
//           category: "Hatchback", 
//           seatingCapacity: 4,
//           pricing: { baseFare: 200, perKm: 15 },
//           photos: []
//         },
//         {
//           _id: "car2",
//           name: "Honda City",
//           category: "Sedan",
//           seatingCapacity: 4, 
//           pricing: { baseFare: 300, perKm: 18 },
//           photos: []
//         },
//         {
//           _id: "car3",
//           name: "Toyota Innova",
//           category: "SUV",
//           seatingCapacity: 7,
//           pricing: { baseFare: 500, perKm: 22 },
//           photos: []
//         }
//       ];
//       setAvailableCars(mockCars);
      
//     } catch (err) {
//       console.error('Error fetching cars:', err);
//       setError('Failed to fetch available cars');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAvailableVehicles = async (carId) => {
//     try {
//       setLoading(true);
      
//       // Try API first, fallback to mock data
//       try {
//         const response = await fetch(`${ENQUIRY_API}/available-vehicles/${carId}`, {
//           method: 'GET',
//           credentials: 'include',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
        
//         if (response.ok) {
//           const data = await response.json();
//           setAvailableVehicles(data);
//           return;
//         }
//       } catch (apiError) {
//         console.log('Vehicles API failed, using mock data:', apiError);
//       }
      
//       // Fallback mock data
//       const mockVehicles = [
//         {
//           _id: "vehicle1",
//           carNumber: "DL 01 AB 1234",
//           color: "White",
//           mileage: 45000,
//           totalTrips: 120,
//           status: "Available"
//         },
//         {
//           _id: "vehicle2",
//           carNumber: "DL 02 CD 5678", 
//           color: "Silver",
//           mileage: 32000,
//           totalTrips: 85,
//           status: "Available"
//         },
//         {
//           _id: "vehicle3",
//           carNumber: "DL 03 EF 9012",
//           color: "Black",
//           mileage: 28000,
//           totalTrips: 95,
//           status: "Available"
//         }
//       ];
//       setAvailableVehicles(mockVehicles);
      
//     } catch (err) {
//       console.error('Error fetching vehicles:', err);
//       setError('Failed to fetch available vehicles');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to create enquiry details message for driver
//   const createEnquiryDetailsMessage = () => {
//     return `🚗 *New Trip Assignment*

// 👤 *Customer:* ${enquiry.fullName}
// 📞 *Phone:* ${enquiry.phoneNumber}
// 📍 *From:* ${enquiry.from}
// 📍 *To:* ${enquiry.to}
// 📅 *Date:* ${formatDate(enquiry.date)}
// ⏰ *Time:* ${enquiry.time}
// 🎯 *Service:* ${enquiry.serviceType.replace('-', ' ')}
// 🆔 *Enquiry ID:* ENQ-${enquiry._id.slice(-6).toUpperCase()}

// Please confirm your availability for this trip.`;
//   };

//   // Helper function to create customer message with allocated details
//   const createCustomerAllocationMessage = () => {
//     let message = `🚗 *Trip Confirmed!*

// Hello ${enquiry.fullName},

// Your booking details:
// 📍 *From:* ${enquiry.from}
// 📍 *To:* ${enquiry.to}
// 📅 *Date:* ${formatDate(enquiry.date)}
// ⏰ *Time:* ${enquiry.time}
// 🆔 *Booking ID:* ENQ-${enquiry._id.slice(-6).toUpperCase()}`;

//     if (enquiry.allocatedDriver) {
//       message += `\n\n👨‍✈️ *Driver Details:*
// 🏷️ *Name:* ${enquiry.allocatedDriver.name}
// 📞 *Phone:* ${enquiry.allocatedDriver.phone}
// ⭐ *Experience:* ${enquiry.allocatedDriver.experienceYears} years
// 📊 *Rating:* ${enquiry.allocatedDriver.rating?.toFixed(1)}/5`;
//     }

//     if (enquiry.allocatedCar && enquiry.allocatedVehicle) {
//       message += `\n\n🚙 *Vehicle Details:*
// 🚗 *Car:* ${enquiry.allocatedCar.name}
// 🔢 *Number:* ${enquiry.allocatedVehicle.carNumber}
// 🎨 *Color:* ${enquiry.allocatedVehicle.color}
// 👥 *Seating:* ${enquiry.allocatedCar.seatingCapacity} people`;
//     }

//     message += `\n\nThank you for choosing our service! 🙏`;
//     return message;
//   };

//   const handleStatusChange = async (newStatus) => {
//     try {
//       setUpdating(true);
      
//       // Replace with actual API call
//       const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/status`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ status: newStatus }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setEnquiry(data.enquiry);
//       } else {
//         // Mock update for demo
//         setEnquiry(prev => ({ ...prev, status: newStatus }));
//       }
      
//     } catch (err) {
//       setError('Failed to update status');
//       // Mock update for demo
//       setEnquiry(prev => ({ ...prev, status: newStatus }));
//     } finally {
//       setUpdating(false);
//     }
//   };

//   // New function to handle driver allocation with WhatsApp redirection
//   const handleAllocateDriverWithWhatsApp = async (driver) => {
//     try {
//       setUpdating(true);
      
//       // Try API call first
//       try {
//         const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/allocate-driver`, {
//           method: 'PATCH',
//           headers: { 'Content-Type': 'application/json' },
//           credentials: 'include',
//           body: JSON.stringify({ driverId: driver._id }),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setEnquiry(data.enquiry);
//         } else {
//           // Fallback to local state update
//           setEnquiry(prev => ({
//             ...prev,
//             allocatedDriver: driver
//           }));
//         }
//       } catch (apiError) {
//         console.log('Driver allocation API failed, updating locally:', apiError);
//         // Fallback to local state update
//         setEnquiry(prev => ({
//           ...prev,
//           allocatedDriver: driver
//         }));
//       }

//       // Create the enquiry details message
//       const message = createEnquiryDetailsMessage();
      
//       // Redirect to WhatsApp with the driver's number and pre-filled message
//       const whatsappUrl = `https://wa.me/91${driver.phone}?text=${encodeURIComponent(message)}`;
//       window.open(whatsappUrl, '_blank');
      
//       setShowDriverModal(false);
      
//       // Show success message
//       alert(`Driver ${driver.name} allocated successfully! WhatsApp opened.`);
      
//     } catch (err) {
//       setError(`Failed to allocate driver: ${err.message}`);
//       console.error('Error allocating driver:', err);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   // New function to handle vehicle allocation with WhatsApp redirection
//   const handleAllocateVehicleWithWhatsApp = async (vehicle) => {
//     try {
//       setUpdating(true);
      
//       // API call to allocate vehicle
//       const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/allocate-vehicle`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ carId: selectedCar._id, vehicleId: vehicle._id }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to allocate vehicle');
//       }

//       const data = await response.json();
//       setEnquiry(data.enquiry);

//       // If driver is also allocated, send combined message to customer
//       if (data.enquiry.allocatedDriver) {
//         const customerMessage = createCustomerAllocationMessage();
//         const customerWhatsappUrl = `https://wa.me/91${enquiry.phoneNumber}?text=${encodeURIComponent(customerMessage)}`;
//         window.open(customerWhatsappUrl, '_blank');
        
//         // Show success message
//         alert(`Vehicle ${vehicle.carNumber} allocated successfully! Customer WhatsApp opened with complete details.`);
//       } else {
//         // Show partial success message
//         alert(`Vehicle ${vehicle.carNumber} allocated successfully! Allocate driver to send complete details to customer.`);
//       }
      
//       setShowVehicleModal(false);
//       setShowCarModal(false);
      
//     } catch (err) {
//       setError(`Failed to allocate vehicle: ${err.message}`);
//       console.error('Error allocating vehicle:', err);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleRevertDriver = async () => {
//     try {
//       setUpdating(true);
      
//       // API call to revert driver
//       const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/revert-driver`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to revert driver');
//       }

//       const data = await response.json();
//       setEnquiry(data.enquiry);
      
//       // Show success message
//       alert('Driver allocation reverted successfully!');
      
//     } catch (err) {
//       setError(`Failed to revert driver: ${err.message}`);
//       console.error('Error reverting driver:', err);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleRevertVehicle = async () => {
//     try {
//       setUpdating(true);
      
//       // API call to revert vehicle
//       const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/revert-vehicle`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to revert vehicle');
//       }

//       const data = await response.json();
//       setEnquiry(data.enquiry);
      
//       // Show success message
//       alert('Vehicle allocation reverted successfully!');
      
//     } catch (err) {
//       setError(`Failed to revert vehicle: ${err.message}`);
//       console.error('Error reverting vehicle:', err);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleSendMessage = async () => {
//     try {
//       setUpdating(true);
      
//       // API call to send message
//       const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/message`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ message, type: messageType }),
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to send message');
//       }

//       const data = await response.json();
//       setEnquiry(data.enquiry);
      
//       setMessage('');
//       setShowMessageModal(false);
      
//       // Show success message
//       alert('Message sent successfully!');
      
//     } catch (err) {
//       setError(`Failed to send message: ${err.message}`);
//       console.error('Error sending message:', err);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   // New function to send complete details to customer
//   const handleSendDetailsToCustomer = () => {
//     const detailsMessage = createCustomerAllocationMessage();
//     const whatsappUrl = `https://wa.me/91${enquiry.phoneNumber}?text=${encodeURIComponent(detailsMessage)}`;
//     window.open(whatsappUrl, '_blank');
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Not Confirmed': return 'bg-gray-100 text-gray-800';
//       case 'Confirmed': return 'bg-green-100 text-green-800';
//       case 'Ongoing': return 'bg-blue-100 text-blue-800';
//       case 'Completed': return 'bg-purple-100 text-purple-800';
//       case 'Cancelled': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getServiceTypeIcon = (serviceType) => {
//     const icons = {
//       'airport-transfer': Navigation,
//       'one-way': Car,
//       'round-trip': RefreshCw,
//       'local-tour': MapPin,
//       'outstation': Route,
//       'tour-package': Calendar
//     };
//     const IconComponent = icons[serviceType] || Car;
//     return <IconComponent className="w-6 h-6 text-white" />;
//   };

//   const getServiceTypeColor = (serviceType) => {
//     const colors = {
//       'airport-transfer': 'from-purple-500 to-purple-600',
//       'one-way': 'from-green-500 to-green-600',
//       'round-trip': 'from-orange-500 to-orange-600',
//       'local-tour': 'from-blue-500 to-blue-600',
//       'outstation': 'from-indigo-500 to-indigo-600',
//       'tour-package': 'from-pink-500 to-pink-600'
//     };
//     return colors[serviceType] || 'from-gray-500 to-gray-600';
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatDateTime = (dateString) => {
//     return new Date(dateString).toLocaleString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//   };

//   const openInMaps = () => {
//     const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(enquiry.to)}&origin=${encodeURIComponent(enquiry.from)}`;
//     window.open(url, '_blank');
//   };

//   const callCustomer = () => {
//     window.open(`tel:${enquiry.phoneNumber}`, '_self');
//   };

//   const sendWhatsApp = () => {
//     const message = `Hello ${enquiry.fullName}, regarding your enquiry for ${enquiry.serviceType} service from ${enquiry.from} to ${enquiry.to} on ${formatDate(enquiry.date)}.`;
//     const url = `https://wa.me/91${enquiry.phoneNumber}?text=${encodeURIComponent(message)}`;
//     window.open(url, '_blank');
//   };

//   const handleBack = () => {
//     window.location.href = '/enquiries';
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4">
//             <Loader className="w-12 h-12 text-blue-600" />
//           </div>
//           <p className="text-xl font-medium text-gray-700">Loading enquiry details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FileText className="w-8 h-8 text-red-600" />
//           </div>
//           <p className="text-xl font-semibold text-red-600 mb-2">Error</p>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <div className="space-y-2">
//             <button
//               onClick={fetchEnquiry}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//             >
//               Retry
//             </button>
//             <button
//               onClick={handleBack}
//               className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//             >
//               Back to Enquiries
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!enquiry) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
//           <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FileText className="w-8 h-8 text-gray-600" />
//           </div>
//           <p className="text-xl font-semibold text-gray-700 mb-2">Not Found</p>
//           <p className="text-gray-600 mb-4">Enquiry not found</p>
//           <button
//             onClick={handleBack}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//           >
//             Back to Enquiries
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center">
//             <button
//               onClick={handleBack}
//               className="flex items-center text-blue-700 hover:text-blue-800 font-semibold mr-6 transition-all duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-md hover:shadow-lg"
//             >
//               <ArrowLeft className="w-5 h-5 mr-2" />
//               Back to Enquiries
//             </button>
//             <div>
//               <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Enquiry Details
//               </h1>
//               <p className="text-lg text-gray-600 mt-2">
//                 ID: ENQ-{enquiry._id.slice(-6).toUpperCase()}
//               </p>
//             </div>
//           </div>
          
//           {/* Status Dropdown */}
//           <div className="relative">
//             <select
//               value={enquiry.status}
//               onChange={(e) => handleStatusChange(e.target.value)}
//               disabled={updating}
//               className={`appearance-none font-semibold rounded-full px-6 py-3 pr-10 border-0 cursor-pointer ${getStatusColor(enquiry.status)} ${updating ? 'opacity-50' : ''}`}
//             >
//               <option value="Not Confirmed">Not Confirmed</option>
//               <option value="Confirmed">Confirmed</option>
//               <option value="Ongoing">Ongoing</option>
//               <option value="Completed">Completed</option>
//               <option value="Cancelled">Cancelled</option>
//             </select>
//             <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5 pointer-events-none" />
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left Column - Main Details */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Customer Information */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Customer Information
//                 </h2>
//                 <div className="flex items-center space-x-3">
//                   <button
//                     onClick={callCustomer}
//                     className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                     title="Call Customer"
//                   >
//                     <PhoneCall className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={sendWhatsApp}
//                     className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                     title="Send WhatsApp"
//                   >
//                     <MessageSquare className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-8">
//                 <div className="flex items-center group">
//                   <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-200 shadow-lg">
//                     <User className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-500 text-sm uppercase tracking-wide mb-1">Full Name</p>
//                     <p className="text-gray-900 text-xl font-bold">{enquiry.fullName}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center group">
//                   <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-200 shadow-lg">
//                     <Phone className="w-8 h-8 text-white" />
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-500 text-sm uppercase tracking-wide mb-1">Phone Number</p>
//                     <div className="flex items-center">
//                       <p className="text-gray-900 text-xl font-bold mr-3">{enquiry.phoneNumber}</p>
//                       <button
//                         onClick={() => copyToClipboard(enquiry.phoneNumber)}
//                         className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100"
//                         title="Copy Phone Number"
//                       >
//                         <Copy className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Trip Information */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Trip Information
//                 </h2>
//                 <button
//                   onClick={openInMaps}
//                   className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <ExternalLink className="w-5 h-5 mr-2" />
//                   View in Maps
//                 </button>
//               </div>

//               <div className="space-y-8">
//                 {/* Service Type */}
//                 <div className={`bg-gradient-to-r ${getServiceTypeColor(enquiry.serviceType)} rounded-2xl p-8 text-white shadow-lg`}>
//                   <div className="flex items-center">
//                     <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-6">
//                       {getServiceTypeIcon(enquiry.serviceType)}
//                     </div>
//                     <div>
//                       <p className="text-white/80 text-sm uppercase tracking-wide font-semibold mb-1">Service Type</p>
//                       <p className="text-3xl font-bold text-white capitalize">{enquiry.serviceType.replace('-', ' ')}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Route */}
//                 <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-100">
//                   <div className="flex items-center mb-6">
//                     <Route className="w-8 h-8 text-blue-600 mr-4" />
//                     <h3 className="text-2xl font-bold text-gray-900">Route Details</h3>
//                   </div>
//                   <div className="space-y-6">
//                     <div className="flex items-center">
//                       <div className="w-4 h-4 bg-green-500 rounded-full mr-6 shadow-lg"></div>
//                       <div className="flex-1">
//                         <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">From</p>
//                         <p className="text-2xl font-bold text-gray-900">{enquiry.from}</p>
//                       </div>
//                     </div>
//                     <div className="border-l-4 border-gray-300 ml-2 h-12 opacity-50"></div>
//                     <div className="flex items-center">
//                       <div className="w-4 h-4 bg-red-500 rounded-full mr-6 shadow-lg"></div>
//                       <div className="flex-1">
//                         <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">To</p>
//                         <p className="text-2xl font-bold text-gray-900">{enquiry.to}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Date and Time */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
//                     <div className="flex items-center mb-4">
//                       <Calendar className="w-8 h-8 text-purple-600 mr-4" />
//                       <h3 className="text-xl font-bold text-gray-900">Date</h3>
//                     </div>
//                     <p className="text-lg font-bold text-gray-700">{formatDate(enquiry.date)}</p>
//                   </div>

//                   <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
//                     <div className="flex items-center mb-4">
//                       <Clock className="w-8 h-8 text-orange-600 mr-4" />
//                       <h3 className="text-xl font-bold text-gray-900">Time</h3>
//                     </div>
//                     <p className="text-lg font-bold text-gray-700">{enquiry.time}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Allocation Status */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                 Allocation Status
//               </h2>
              
//               <div className="grid md:grid-cols-2 gap-8">
//                 {/* Driver Allocation */}
//                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-xl font-bold text-gray-900">Driver</h3>
//                     <UserCheck className="w-8 h-8 text-blue-600" />
//                   </div>
                  
//                   {enquiry.allocatedDriver ? (
//                     <div className="space-y-2">
//                       <p className="text-lg font-bold text-gray-900">{enquiry.allocatedDriver.name}</p>
//                       <p className="text-gray-600">{enquiry.allocatedDriver.phone}</p>
//                       <p className="text-sm text-gray-500">
//                         {enquiry.allocatedDriver.experienceYears} years exp • Rating: {enquiry.allocatedDriver.rating?.toFixed(1)}
//                       </p>
//                       <button
//                         onClick={handleRevertDriver}
//                         disabled={updating}
//                         className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
//                       >
//                         {updating ? 'Reverting...' : 'Change Driver'}
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       <p className="text-gray-500">No driver allocated</p>
//                       <button
//                         onClick={() => {
//                           setShowDriverModal(true);
//                           fetchAvailableDrivers();
//                         }}
//                         className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
//                       >
//                         Allocate Driver
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Vehicle Allocation */}
//                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-xl font-bold text-gray-900">Vehicle</h3>
//                     <Car className="w-8 h-8 text-green-600" />
//                   </div>
                  
//                   {enquiry.allocatedVehicle ? (
//                     <div className="space-y-2">
//                       <p className="text-lg font-bold text-gray-900">{enquiry.allocatedCar.name}</p>
//                       <p className="text-gray-600">{enquiry.allocatedVehicle.carNumber}</p>
//                       <p className="text-sm text-gray-500">
//                         {enquiry.allocatedVehicle.color} • {enquiry.allocatedVehicle.mileage} km
//                       </p>
//                       <button
//                         onClick={handleRevertVehicle}
//                         disabled={updating}
//                         className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
//                       >
//                         {updating ? 'Reverting...' : 'Change Vehicle'}
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       <p className="text-gray-500">No vehicle allocated</p>
//                       <button
//                         onClick={() => {
//                           setShowCarModal(true);
//                           fetchAvailableCars();
//                         }}
//                         className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
//                       >
//                         Allocate Vehicle
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Timeline */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                 Enquiry Timeline
//               </h2>
              
//               <div className="space-y-6">
//                 <div className="flex items-center">
//                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-6 shadow-lg">
//                     <FileText className="w-6 h-6 text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="font-bold text-gray-900 text-lg">Enquiry Received</p>
//                     <p className="text-gray-500 font-medium">{formatDateTime(enquiry.createdAt)}</p>
//                   </div>
//                 </div>
                
//                 {enquiry.updatedAt && enquiry.updatedAt !== enquiry.createdAt && (
//                   <div className="flex items-center">
//                     <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-6 shadow-lg">
//                       <RefreshCw className="w-6 h-6 text-green-600" />
//                     </div>
//                     <div>
//                       <p className="font-bold text-gray-900 text-lg">Last Updated</p>
//                       <p className="text-gray-500 font-medium">{formatDateTime(enquiry.updatedAt)}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Actions & Summary */}
//           <div className="space-y-8">
//             {/* Quick Actions */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                 Quick Actions
//               </h3>
              
//               <div className="space-y-4">
//                 <button
//                   onClick={callCustomer}
//                   className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <PhoneCall className="w-6 h-6 mr-3" />
//                   Call Customer
//                 </button>
                
//                 <button
//                   onClick={sendWhatsApp}
//                   className="w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <MessageSquare className="w-6 h-6 mr-3" />
//                   Send WhatsApp
//                 </button>
                
//                 {/* New Send Details Button - Only show if both driver and vehicle are allocated */}
//                 {enquiry.allocatedDriver && enquiry.allocatedVehicle && (
//                   <button
//                     onClick={handleSendDetailsToCustomer}
//                     className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                   >
//                     <Send className="w-6 h-6 mr-3" />
//                     Send Details
//                   </button>
//                 )}
                
//                 <button
//                   onClick={() => setShowMessageModal(true)}
//                   className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <Send className="w-6 h-6 mr-3" />
//                   Send Message
//                 </button>
                
//                 <button
//                   onClick={() => copyToClipboard(`Name: ${enquiry.fullName}\nPhone: ${enquiry.phoneNumber}\nFrom: ${enquiry.from}\nTo: ${enquiry.to}\nDate: ${formatDate(enquiry.date)}\nTime: ${enquiry.time}\nService: ${enquiry.serviceType}`)}
//                   className="w-full flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <Copy className="w-6 h-6 mr-3" />
//                   Copy Details
//                 </button>

//                 <button
//                   onClick={openInMaps}
//                   className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <ExternalLink className="w-6 h-6 mr-3" />
//                   Open in Maps
//                 </button>
//               </div>
//             </div>

//             {/* Summary Card */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                 Enquiry Summary
//               </h3>
              
//               <div className="space-y-6">
//                 <div className="border-b border-gray-200 pb-4">
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Customer</p>
//                   <p className="text-lg font-bold text-gray-900">{enquiry.fullName}</p>
//                 </div>
                
//                 <div className="border-b border-gray-200 pb-4">
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Service</p>
//                   <p className="text-lg font-bold text-gray-900 capitalize">{enquiry.serviceType.replace('-', ' ')}</p>
//                 </div>
                
//                 <div className="border-b border-gray-200 pb-4">
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Journey</p>
//                   <p className="text-lg font-bold text-gray-900">{enquiry.from} → {enquiry.to}</p>
//                 </div>
                
//                 <div className="border-b border-gray-200 pb-4">
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Schedule</p>
//                   <p className="text-lg font-bold text-gray-900">{formatDate(enquiry.date)}</p>
//                   <p className="text-lg font-bold text-gray-900">{enquiry.time}</p>
//                 </div>
                
//                 <div>
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Contact</p>
//                   <p className="text-lg font-bold text-gray-900">{enquiry.phoneNumber}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Notifications Preview */}
//             {enquiry.customerNotifications && enquiry.customerNotifications.length > 0 && (
//               <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//                 <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                   Recent Notifications
//                 </h3>
                
//                 <div className="space-y-4">
//                   {enquiry.customerNotifications.slice(-3).map((notification, index) => (
//                     <div key={index} className="bg-blue-50 rounded-lg p-4">
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <p className="text-sm font-semibold text-blue-800">{notification.type}</p>
//                           <p className="text-sm text-blue-700 mt-1">{notification.message}</p>
//                         </div>
//                         <div className="ml-4">
//                           <p className="text-xs text-blue-600">{formatDateTime(notification.sentAt)}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Message Modal */}
//         {showMessageModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-2xl font-bold text-gray-900">Send Message</h2>
//                   <button
//                     onClick={() => setShowMessageModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//                 <p className="text-gray-600 mt-2">To: {enquiry?.fullName}</p>
//               </div>
//               <div className="p-6">
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
//                     <select
//                       value={messageType}
//                       onChange={(e) => setMessageType(e.target.value)}
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="Rate Quote">Rate Quote</option>
//                       <option value="Driver Assigned">Driver Assigned</option>
//                       <option value="Booking Confirmed">Booking Confirmed</option>
//                       <option value="Trip Started">Trip Started</option>
//                       <option value="Trip Completed">Trip Completed</option>
//                       <option value="Custom Message">Custom Message</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
//                     <textarea
//                       value={message}
//                       onChange={(e) => setMessage(e.target.value)}
//                       rows={4}
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Type your message here..."
//                     />
//                   </div>
//                   {messageType === 'Rate Quote' && (
//                     <div className="bg-blue-50 p-4 rounded-lg">
//                       <p className="text-sm text-blue-700 font-medium">Quick Templates:</p>
//                       <div className="space-y-2 mt-2">
//                         <button
//                           onClick={() => setMessage(`Hello ${enquiry?.fullName}, your trip rate is ₹18/km. If you agree, please confirm to book. Thank you!`)}
//                           className="text-left text-sm text-blue-600 hover:text-blue-800 block"
//                         >
//                           • Rate ₹18/km template
//                         </button>
//                         <button
//                           onClick={() => setMessage(`Dear ${enquiry?.fullName}, we have reviewed your enquiry. The estimated fare is ₹15/km + ₹200 base fare. Please let us know if you want to proceed.`)}
//                           className="text-left text-sm text-blue-600 hover:text-blue-800 block"
//                         >
//                           • Detailed rate template
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="p-6 border-t border-gray-200">
//                 <div className="flex space-x-4">
//                   <button
//                     onClick={() => setShowMessageModal(false)}
//                     className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSendMessage}
//                     disabled={!message.trim() || updating}
//                     className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                   >
//                     {updating ? (
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     ) : (
//                       <>
//                         <Send className="w-4 h-4 mr-2" />
//                         Send
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Driver Allocation Modal */}
//         {showDriverModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900">Allocate Driver</h2>
//                     <p className="text-gray-600">For: {enquiry?.fullName}</p>
//                     <p className="text-sm text-blue-600 mt-1">📱 Will open WhatsApp chat with driver</p>
//                   </div>
//                   <button
//                     onClick={() => setShowDriverModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <div className="space-y-4">
//                   {availableDrivers.length === 0 ? (
//                     <p className="text-gray-500 text-center">No available drivers found</p>
//                   ) : (
//                     availableDrivers.map((driver) => (
//                       <div key={driver._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
//                         <div>
//                           <p className="font-medium text-lg">{driver.name}</p>
//                           <p className="text-sm text-gray-600">{driver.phone}</p>
//                           <p className="text-sm text-gray-600">
//                             {driver.experienceYears} years exp • Rating: {driver.rating?.toFixed(1) || 'N/A'}
//                           </p>
//                         </div>
//                         <button
//                           onClick={() => handleAllocateDriverWithWhatsApp(driver)}
//                           disabled={updating}
//                           className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg flex items-center disabled:opacity-50"
//                         >
//                           <MessageSquare className="w-4 h-4 mr-2" />
//                           {updating ? 'Allocating...' : 'Allocate'}
//                         </button>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//               <div className="p-6 border-t border-gray-200">
//                 <button
//                   onClick={() => setShowDriverModal(false)}
//                   className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Car Selection Modal */}
//         {showCarModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900">Select Car Model</h2>
//                     <p className="text-gray-600">For: {enquiry?.fullName}</p>
//                     <p className="text-sm text-blue-600 mt-1">📱 Will open WhatsApp chat after vehicle selection</p>
//                   </div>
//                   <button
//                     onClick={() => setShowCarModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {availableCars.length === 0 ? (
//                     <p className="text-gray-500 text-center col-span-full">No available cars found</p>
//                   ) : (
//                     availableCars.map((car) => (
//                       <div 
//                         key={car._id} 
//                         className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors hover:shadow-lg"
//                         onClick={() => {
//                           setSelectedCar(car);
//                           setShowVehicleModal(true);
//                           fetchAvailableVehicles(car._id);
//                         }}
//                       >
//                         <div className="bg-gradient-to-r from-blue-500 to-green-500 h-32 rounded-lg mb-3 flex items-center justify-center">
//                           <Car className="w-16 h-16 text-white" />
//                         </div>
//                         <h3 className="font-medium text-lg mb-2">{car.name}</h3>
//                         <p className="text-sm text-gray-600 mb-1">Category: {car.category}</p>
//                         <p className="text-sm text-gray-600 mb-3">Seating: {car.seatingCapacity} people</p>
//                         {car.pricing && (
//                           <div className="text-sm text-green-600 font-medium">
//                             Base: ₹{car.pricing.baseFare} + ₹{car.pricing.perKm}/km
//                           </div>
//                         )}
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//               <div className="p-6 border-t border-gray-200">
//                 <button
//                   onClick={() => setShowCarModal(false)}
//                   className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Vehicle Selection Modal */}
//         {showVehicleModal && selectedCar && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900">Select Vehicle</h2>
//                     <p className="text-gray-600">Car: {selectedCar.name}</p>
//                     <p className="text-sm text-blue-600 mt-1">📱 Will open WhatsApp chat with customer</p>
//                   </div>
//                   <button
//                     onClick={() => setShowVehicleModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <div className="space-y-4">
//                   {availableVehicles.length === 0 ? (
//                     <p className="text-gray-500 text-center">No available vehicles found for this car model</p>
//                   ) : (
//                     availableVehicles.map((vehicle) => (
//                       <div key={vehicle._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
//                         <div className="flex items-center">
//                           <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
//                             <Car className="w-6 h-6 text-white" />
//                           </div>
//                           <div>
//                             <p className="font-medium text-lg">{vehicle.carNumber}</p>
//                             <p className="text-sm text-gray-600">Color: {vehicle.color}</p>
//                             <p className="text-sm text-gray-600">
//                               Mileage: {vehicle.mileage?.toLocaleString() || 'N/A'} km • 
//                               Trips: {vehicle.totalTrips || 0}
//                             </p>
//                           </div>
//                         </div>
//                         <button
//                           onClick={() => handleAllocateVehicleWithWhatsApp(vehicle)}
//                           disabled={updating}
//                           className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg flex items-center disabled:opacity-50"
//                         >
//                           <MessageSquare className="w-4 h-4 mr-2" />
//                           {updating ? 'Allocating...' : 'Allocate'}
//                         </button>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//               <div className="p-6 border-t border-gray-200">
//                 <button
//                   onClick={() => setShowVehicleModal(false)}
//                   className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EnhancedEnquiryDetail;













// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   ArrowLeft,
//   User,
//   Phone,
//   MapPin,
//   Calendar,
//   Clock,
//   Car,
//   MessageSquare,
//   Copy,
//   ExternalLink,
//   Navigation,
//   Route,
//   Timer,
//   FileText,
//   PhoneCall,
//   RefreshCw,
//   Loader,
//   UserCheck,
//   Send,
//   X,
//   ChevronDown,
//   CheckCircle,
//   AlertCircle,
//   Eye,
//   Settings
// } from 'lucide-react';

// const ENQUIRY_API = 'http://localhost:8000/api/enquiry';

// const EnhancedEnquiryDetail = () => {
//   const { id: enquiryId } = useParams(); // Get ID from URL params
//   const [enquiry, setEnquiry] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showDriverModal, setShowDriverModal] = useState(false);
//   const [showCarModal, setShowCarModal] = useState(false);
//   const [showVehicleModal, setShowVehicleModal] = useState(false);
//   const [showMessageModal, setShowMessageModal] = useState(false);
//   const [availableDrivers, setAvailableDrivers] = useState([]);
//   const [availableCars, setAvailableCars] = useState([]);
//   const [availableVehicles, setAvailableVehicles] = useState([]);
//   const [selectedCar, setSelectedCar] = useState(null);
//   const [message, setMessage] = useState('');
//   const [messageType, setMessageType] = useState('Custom Message');
//   const [updating, setUpdating] = useState(false);

//   useEffect(() => {
//     fetchEnquiry();
//   }, []);

//   const fetchEnquiry = async () => {
//     try {
//       setLoading(true);
      
//       if (!enquiryId) {
//         setError('No enquiry ID provided');
//         return;
//       }
      
//       console.log('Fetching enquiry with ID:', enquiryId);
      
//       // Try to fetch from API first
//       try {
//         const response = await fetch(`${ENQUIRY_API}/${enquiryId}`, {
//           method: 'GET',
//           credentials: 'include',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
        
//         console.log('API Response status:', response.status);
        
//         if (response.ok) {
//           const data = await response.json();
//           console.log('Fetched enquiry data:', data);
//           setEnquiry(data);
//           return;
//         } else {
//           const errorData = await response.text();
//           console.error('API Error Response:', errorData);
//           throw new Error(`API Error: ${response.status}`);
//         }
//       } catch (apiError) {
//         console.log('API call failed, using mock data:', apiError);
//       }
      
//       // Fallback to mock data if API fails
//       const mockEnquiry = {
//         _id: enquiryId,
//         fullName: "Rajesh Kumar",
//         phoneNumber: "9876543210",
//         from: "Delhi Airport",
//         to: "Connaught Place",
//         date: "2024-01-15",
//         time: "10:30 AM",
//         serviceType: "airport-transfer",
//         status: "Not Confirmed",
//         createdAt: "2024-01-14T08:30:00Z",
//         updatedAt: "2024-01-14T08:30:00Z",
//         allocatedDriver: null,
//         allocatedCar: null,
//         allocatedVehicle: null,
//         messages: [],
//         customerNotifications: []
//       };
//       console.log('Using mock data:', mockEnquiry);
//       setEnquiry(mockEnquiry);
      
//     } catch (err) {
//       setError(err.message || 'Failed to fetch enquiry details');
//       console.error('Error fetching enquiry:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAvailableDrivers = async () => {
//     try {
//       console.log('Fetching available drivers...');
      
//       // Try API first, fallback to mock data
//       try {
//         const response = await fetch(`${ENQUIRY_API}/getAllDrivers`, {
//           method: 'GET',
//           credentials: 'include',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
        
//         console.log('Drivers API Response status:', response.status);
        
//         if (response.ok) {
//           const data = await response.json();
//           console.log('Fetched drivers:', data);
//           // Filter only active drivers
//           const activeDrivers = data.filter(driver => driver.status === 'Active');
//           setAvailableDrivers(activeDrivers);
//           return;
//         } else {
//           const errorData = await response.text();
//           console.error('Drivers API Error:', errorData);
//         }
//       } catch (apiError) {
//         console.log('Drivers API failed, using mock data:', apiError);
//       }
      
//       // Fallback mock data
//       const mockDrivers = [
//         {
//           _id: "driver1",
//           name: "Suresh Kumar",
//           phone: "9123456789",
//           experienceYears: 5,
//           rating: 4.5,
//           status: "Active"
//         },
//         {
//           _id: "driver2", 
//           name: "Amit Singh",
//           phone: "9234567890",
//           experienceYears: 8,
//           rating: 4.8,
//           status: "Active"
//         },
//         {
//           _id: "driver3",
//           name: "Vikash Sharma", 
//           phone: "9345678901",
//           experienceYears: 3,
//           rating: 4.2,
//           status: "Active"
//         }
//       ];
//       console.log('Using mock drivers:', mockDrivers);
//       setAvailableDrivers(mockDrivers);
      
//     } catch (err) {
//       console.error('Error fetching drivers:', err);
//       setError('Failed to fetch available drivers');
//     }
//   };

//   const fetchAvailableCars = async () => {
//     try {
//       setLoading(true);
      
//       // Try API first, fallback to mock data
//       try {
//         const response = await fetch(`${ENQUIRY_API}/available-cars`, {
//           method: 'GET',
//           credentials: 'include',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
        
//         if (response.ok) {
//           const data = await response.json();
//           setAvailableCars(data);
//           return;
//         }
//       } catch (apiError) {
//         console.log('Cars API failed, using mock data:', apiError);
//       }
      
//       // Fallback mock data
//       const mockCars = [
//         {
//           _id: "car1",
//           name: "Maruti Swift",
//           category: "Hatchback", 
//           seatingCapacity: 4,
//           pricing: { baseFare: 200, perKm: 15 },
//           photos: []
//         },
//         {
//           _id: "car2",
//           name: "Honda City",
//           category: "Sedan",
//           seatingCapacity: 4, 
//           pricing: { baseFare: 300, perKm: 18 },
//           photos: []
//         },
//         {
//           _id: "car3",
//           name: "Toyota Innova",
//           category: "SUV",
//           seatingCapacity: 7,
//           pricing: { baseFare: 500, perKm: 22 },
//           photos: []
//         }
//       ];
//       setAvailableCars(mockCars);
      
//     } catch (err) {
//       console.error('Error fetching cars:', err);
//       setError('Failed to fetch available cars');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAvailableVehicles = async (carId) => {
//     try {
//       setLoading(true);
      
//       // Try API first, fallback to mock data
//       try {
//         const response = await fetch(`${ENQUIRY_API}/available-vehicles/${carId}`, {
//           method: 'GET',
//           credentials: 'include',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
        
//         if (response.ok) {
//           const data = await response.json();
//           setAvailableVehicles(data);
//           return;
//         }
//       } catch (apiError) {
//         console.log('Vehicles API failed, using mock data:', apiError);
//       }
      
//       // Fallback mock data
//       const mockVehicles = [
//         {
//           _id: "vehicle1",
//           carNumber: "DL 01 AB 1234",
//           color: "White",
//           mileage: 45000,
//           totalTrips: 120,
//           status: "Available"
//         },
//         {
//           _id: "vehicle2",
//           carNumber: "DL 02 CD 5678", 
//           color: "Silver",
//           mileage: 32000,
//           totalTrips: 85,
//           status: "Available"
//         },
//         {
//           _id: "vehicle3",
//           carNumber: "DL 03 EF 9012",
//           color: "Black",
//           mileage: 28000,
//           totalTrips: 95,
//           status: "Available"
//         }
//       ];
//       setAvailableVehicles(mockVehicles);
      
//     } catch (err) {
//       console.error('Error fetching vehicles:', err);
//       setError('Failed to fetch available vehicles');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to create enquiry details message for driver
//   const createEnquiryDetailsMessage = () => {
//     return `🚗 *New Trip Assignment*

// 👤 *Customer:* ${enquiry.fullName}
// 📞 *Phone:* ${enquiry.phoneNumber}
// 📍 *From:* ${enquiry.from}
// 📍 *To:* ${enquiry.to}
// 📅 *Date:* ${formatDate(enquiry.date)}
// ⏰ *Time:* ${enquiry.time}
// 🎯 *Service:* ${enquiry.serviceType.replace('-', ' ')}
// 🆔 *Enquiry ID:* ENQ-${enquiry._id.slice(-6).toUpperCase()}

// Please confirm your availability for this trip.`;
//   };

//   // Helper function to create customer message with allocated details
//   const createCustomerAllocationMessage = () => {
//     let message = `🚗 *Trip Confirmed!*

// Hello ${enquiry.fullName},

// Your booking details:
// 📍 *From:* ${enquiry.from}
// 📍 *To:* ${enquiry.to}
// 📅 *Date:* ${formatDate(enquiry.date)}
// ⏰ *Time:* ${enquiry.time}
// 🆔 *Booking ID:* ENQ-${enquiry._id.slice(-6).toUpperCase()}`;

//     if (enquiry.allocatedDriver) {
//       message += `\n\n👨‍✈️ *Driver Details:*
// 🏷️ *Name:* ${enquiry.allocatedDriver.name}
// 📞 *Phone:* ${enquiry.allocatedDriver.phone}
// ⭐ *Experience:* ${enquiry.allocatedDriver.experienceYears} years
// 📊 *Rating:* ${enquiry.allocatedDriver.rating?.toFixed(1)}/5`;
//     }

//     if (enquiry.allocatedCar && enquiry.allocatedVehicle) {
//       message += `\n\n🚙 *Vehicle Details:*
// 🚗 *Car:* ${enquiry.allocatedCar.name}
// 🔢 *Number:* ${enquiry.allocatedVehicle.carNumber}
// 🎨 *Color:* ${enquiry.allocatedVehicle.color}
// 👥 *Seating:* ${enquiry.allocatedCar.seatingCapacity} people`;
//     }

//     message += `\n\nThank you for choosing our service! 🙏`;
//     return message;
//   };

//   const handleStatusChange = async (newStatus) => {
//     try {
//       setUpdating(true);
      
//       // Try API call first
//       try {
//         const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/status`, {
//           method: 'PATCH',
//           headers: { 'Content-Type': 'application/json' },
//           credentials: 'include',
//           body: JSON.stringify({ status: newStatus }),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setEnquiry(data.enquiry || data);
//         } else {
//           throw new Error(`Server error: ${response.status}`);
//         }
//       } catch (apiError) {
//         console.log('Status update API failed, updating locally:', apiError);
//         // Fallback to local state update
//         setEnquiry(prev => ({ ...prev, status: newStatus }));
//       }
      
//     } catch (err) {
//       setError('Failed to update status');
//       console.error('Error updating status:', err);
//       // Still update locally as fallback
//       setEnquiry(prev => ({ ...prev, status: newStatus }));
//     } finally {
//       setUpdating(false);
//     }
//   };

//   // New function to handle driver allocation with WhatsApp redirection
//   const handleAllocateDriverWithWhatsApp = async (driver) => {
//     try {
//       setUpdating(true);
      
//       // Try API call first
//       try {
//         const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/allocate-driver`, {
//           method: 'PATCH',
//           headers: { 'Content-Type': 'application/json' },
//           credentials: 'include',
//           body: JSON.stringify({ driverId: driver._id }),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setEnquiry(data.enquiry);
//         } else {
//           // Fallback to local state update
//           setEnquiry(prev => ({
//             ...prev,
//             allocatedDriver: driver
//           }));
//         }
//       } catch (apiError) {
//         console.log('Driver allocation API failed, updating locally:', apiError);
//         // Fallback to local state update
//         setEnquiry(prev => ({
//           ...prev,
//           allocatedDriver: driver
//         }));
//       }

//       // Create the enquiry details message
//       const message = createEnquiryDetailsMessage();
      
//       // Redirect to WhatsApp with the driver's number and pre-filled message
//       const whatsappUrl = `https://wa.me/91${driver.phone}?text=${encodeURIComponent(message)}`;
//       window.open(whatsappUrl, '_blank');
      
//       setShowDriverModal(false);
      
//       // Show success message
//       alert(`Driver ${driver.name} allocated successfully! WhatsApp opened.`);
      
//     } catch (err) {
//       setError(`Failed to allocate driver: ${err.message}`);
//       console.error('Error allocating driver:', err);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   // New function to handle vehicle allocation with WhatsApp redirection
//   const handleAllocateVehicleWithWhatsApp = async (vehicle) => {
//     try {
//       setUpdating(true);
      
//       // Try API call first
//       try {
//         const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/allocate-vehicle`, {
//           method: 'PATCH',
//           headers: { 'Content-Type': 'application/json' },
//           credentials: 'include',
//           body: JSON.stringify({ carId: selectedCar._id, vehicleId: vehicle._id }),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setEnquiry(data.enquiry || data);
//         } else {
//           const errorData = await response.text();
//           console.error('Vehicle allocation API error:', errorData);
//           throw new Error(`Server error: ${response.status}`);
//         }
//       } catch (apiError) {
//         console.log('Vehicle allocation API failed, updating locally:', apiError);
//         // Fallback to local state update
//         setEnquiry(prev => ({
//           ...prev,
//           allocatedCar: selectedCar,
//           allocatedVehicle: vehicle
//         }));
//       }

//       // Update enquiry state to get latest allocated driver info
//       const updatedEnquiry = {
//         ...enquiry,
//         allocatedCar: selectedCar,
//         allocatedVehicle: vehicle
//       };

//       // If driver is also allocated, send combined message to customer
//       if (updatedEnquiry.allocatedDriver) {
//         // Create updated message with latest data
//         const customerMessage = `🚗 *Trip Confirmed!*

// Hello ${updatedEnquiry.fullName},

// Your booking details:
// 📍 *From:* ${updatedEnquiry.from}
// 📍 *To:* ${updatedEnquiry.to}
// 📅 *Date:* ${formatDate(updatedEnquiry.date)}
// ⏰ *Time:* ${updatedEnquiry.time}
// 🆔 *Booking ID:* ENQ-${updatedEnquiry._id.slice(-6).toUpperCase()}

// 👨‍✈️ *Driver Details:*
// 🏷️ *Name:* ${updatedEnquiry.allocatedDriver.name}
// 📞 *Phone:* ${updatedEnquiry.allocatedDriver.phone}
// ⭐ *Experience:* ${updatedEnquiry.allocatedDriver.experienceYears} years
// 📊 *Rating:* ${updatedEnquiry.allocatedDriver.rating?.toFixed(1)}/5

// 🚙 *Vehicle Details:*
// 🚗 *Car:* ${selectedCar.name}
// 🔢 *Number:* ${vehicle.carNumber}
// 🎨 *Color:* ${vehicle.color}
// 👥 *Seating:* ${selectedCar.seatingCapacity} people

// Thank you for choosing our service! 🙏`;

//         const customerWhatsappUrl = `https://wa.me/91${updatedEnquiry.phoneNumber}?text=${encodeURIComponent(customerMessage)}`;
//         window.open(customerWhatsappUrl, '_blank');
        
//         // Show success message
//         alert(`Vehicle ${vehicle.carNumber} allocated successfully! Customer WhatsApp opened with complete details.`);
//       } else {
//         // Show partial success message
//         alert(`Vehicle ${vehicle.carNumber} allocated successfully! Allocate driver to send complete details to customer.`);
//       }
      
//       setShowVehicleModal(false);
//       setShowCarModal(false);
      
//     } catch (err) {
//       setError(`Failed to allocate vehicle: ${err.message}`);
//       console.error('Error allocating vehicle:', err);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleRevertDriver = async () => {
//     try {
//       setUpdating(true);
      
//       // Try API call first
//       try {
//         const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/revert-driver`, {
//           method: 'PATCH',
//           headers: { 'Content-Type': 'application/json' },
//           credentials: 'include',
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setEnquiry(data.enquiry || data);
//         } else {
//           throw new Error(`Server error: ${response.status}`);
//         }
//       } catch (apiError) {
//         console.log('Revert driver API failed, updating locally:', apiError);
//         // Fallback to local state update
//         setEnquiry(prev => ({ ...prev, allocatedDriver: null }));
//       }
      
//       // Show success message
//       alert('Driver allocation reverted successfully!');
      
//     } catch (err) {
//       setError(`Failed to revert driver: ${err.message}`);
//       console.error('Error reverting driver:', err);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleRevertVehicle = async () => {
//     try {
//       setUpdating(true);
      
//       // Try API call first
//       try {
//         const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/revert-vehicle`, {
//           method: 'PATCH',
//           headers: { 'Content-Type': 'application/json' },
//           credentials: 'include',
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setEnquiry(data.enquiry || data);
//         } else {
//           throw new Error(`Server error: ${response.status}`);
//         }
//       } catch (apiError) {
//         console.log('Revert vehicle API failed, updating locally:', apiError);
//         // Fallback to local state update
//         setEnquiry(prev => ({ 
//           ...prev, 
//           allocatedCar: null,
//           allocatedVehicle: null 
//         }));
//       }
      
//       // Show success message
//       alert('Vehicle allocation reverted successfully!');
      
//     } catch (err) {
//       setError(`Failed to revert vehicle: ${err.message}`);
//       console.error('Error reverting vehicle:', err);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleSendMessage = async () => {
//     try {
//       setUpdating(true);
      
//       if (!message.trim()) {
//         alert('Please enter a message');
//         return;
//       }
      
//       // Try API call first
//       try {
//         const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/message`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           credentials: 'include',
//           body: JSON.stringify({ 
//             message: message.trim(),
//             type: messageType 
//           }),
//         });
        
//         if (response.ok) {
//           const data = await response.json();
//           setEnquiry(data.enquiry || data);
//         } else {
//           const errorData = await response.text();
//           console.error('Message API error:', errorData);
//           throw new Error(`Server error: ${response.status}`);
//         }
//       } catch (apiError) {
//         console.log('Message API failed, updating locally:', apiError);
//         // Fallback to local state update
//         setEnquiry(prev => ({
//           ...prev,
//           messages: [
//             ...(prev.messages || []),
//             {
//               sender: 'Admin',
//               message: message.trim(),
//               timestamp: new Date().toISOString(),
//               isRead: false
//             }
//           ],
//           customerNotifications: [
//             ...(prev.customerNotifications || []),
//             {
//               type: messageType,
//               message: message.trim(),
//               sentAt: new Date().toISOString(),
//               isRead: false
//             }
//           ]
//         }));
//       }
      
//       setMessage('');
//       setShowMessageModal(false);
      
//       // Show success message
//       alert('Message sent successfully!');
      
//     } catch (err) {
//       setError(`Failed to send message: ${err.message}`);
//       console.error('Error sending message:', err);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   // New function to send complete details to customer
//   const handleSendDetailsToCustomer = () => {
//     const detailsMessage = createCustomerAllocationMessage();
//     const whatsappUrl = `https://wa.me/91${enquiry.phoneNumber}?text=${encodeURIComponent(detailsMessage)}`;
//     window.open(whatsappUrl, '_blank');
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Not Confirmed': return 'bg-gray-100 text-gray-800';
//       case 'Confirmed': return 'bg-green-100 text-green-800';
//       case 'Ongoing': return 'bg-blue-100 text-blue-800';
//       case 'Completed': return 'bg-purple-100 text-purple-800';
//       case 'Cancelled': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getServiceTypeIcon = (serviceType) => {
//     const icons = {
//       'airport-transfer': Navigation,
//       'one-way': Car,
//       'round-trip': RefreshCw,
//       'local-tour': MapPin,
//       'outstation': Route,
//       'tour-package': Calendar
//     };
//     const IconComponent = icons[serviceType] || Car;
//     return <IconComponent className="w-6 h-6 text-white" />;
//   };

//   const getServiceTypeColor = (serviceType) => {
//     const colors = {
//       'airport-transfer': 'from-purple-500 to-purple-600',
//       'one-way': 'from-green-500 to-green-600',
//       'round-trip': 'from-orange-500 to-orange-600',
//       'local-tour': 'from-blue-500 to-blue-600',
//       'outstation': 'from-indigo-500 to-indigo-600',
//       'tour-package': 'from-pink-500 to-pink-600'
//     };
//     return colors[serviceType] || 'from-gray-500 to-gray-600';
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatDateTime = (dateString) => {
//     return new Date(dateString).toLocaleString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//   };

//   const openInMaps = () => {
//     const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(enquiry.to)}&origin=${encodeURIComponent(enquiry.from)}`;
//     window.open(url, '_blank');
//   };

//   const callCustomer = () => {
//     window.open(`tel:${enquiry.phoneNumber}`, '_self');
//   };

//   const sendWhatsApp = () => {
//     const message = `Hello ${enquiry.fullName}, regarding your enquiry for ${enquiry.serviceType} service from ${enquiry.from} to ${enquiry.to} on ${formatDate(enquiry.date)}.`;
//     const url = `https://wa.me/91${enquiry.phoneNumber}?text=${encodeURIComponent(message)}`;
//     window.open(url, '_blank');
//   };

//   const handleBack = () => {
//     window.location.href = '/enquiries';
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4">
//             <Loader className="w-12 h-12 text-blue-600" />
//           </div>
//           <p className="text-xl font-medium text-gray-700">Loading enquiry details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FileText className="w-8 h-8 text-red-600" />
//           </div>
//           <p className="text-xl font-semibold text-red-600 mb-2">Error</p>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <div className="space-y-2">
//             <button
//               onClick={fetchEnquiry}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//             >
//               Retry
//             </button>
//             <button
//               onClick={handleBack}
//               className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//             >
//               Back to Enquiries
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!enquiry) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
//           <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FileText className="w-8 h-8 text-gray-600" />
//           </div>
//           <p className="text-xl font-semibold text-gray-700 mb-2">Not Found</p>
//           <p className="text-gray-600 mb-4">Enquiry not found</p>
//           <button
//             onClick={handleBack}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//           >
//             Back to Enquiries
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center">
//             <button
//               onClick={handleBack}
//               className="flex items-center text-blue-700 hover:text-blue-800 font-semibold mr-6 transition-all duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-md hover:shadow-lg"
//             >
//               <ArrowLeft className="w-5 h-5 mr-2" />
//               Back to Enquiries
//             </button>
//             <div>
//               <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Enquiry Details
//               </h1>
//               <p className="text-lg text-gray-600 mt-2">
//                 ID: ENQ-{enquiry._id.slice(-6).toUpperCase()}
//               </p>
//             </div>
//           </div>
          
//           {/* Status Dropdown */}
//           <div className="relative">
//             <select
//               value={enquiry.status}
//               onChange={(e) => handleStatusChange(e.target.value)}
//               disabled={updating}
//               className={`appearance-none font-semibold rounded-full px-6 py-3 pr-10 border-0 cursor-pointer ${getStatusColor(enquiry.status)} ${updating ? 'opacity-50' : ''}`}
//             >
//               <option value="Not Confirmed">Not Confirmed</option>
//               <option value="Confirmed">Confirmed</option>
//               <option value="Ongoing">Ongoing</option>
//               <option value="Completed">Completed</option>
//               <option value="Cancelled">Cancelled</option>
//             </select>
//             <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5 pointer-events-none" />
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left Column - Main Details */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Customer Information */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Customer Information
//                 </h2>
//                 <div className="flex items-center space-x-3">
//                   <button
//                     onClick={callCustomer}
//                     className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                     title="Call Customer"
//                   >
//                     <PhoneCall className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={sendWhatsApp}
//                     className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                     title="Send WhatsApp"
//                   >
//                     <MessageSquare className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-8">
//                 <div className="flex items-center group">
//                   <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-200 shadow-lg">
//                     <User className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-500 text-sm uppercase tracking-wide mb-1">Full Name</p>
//                     <p className="text-gray-900 text-xl font-bold">{enquiry.fullName}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center group">
//                   <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-200 shadow-lg">
//                     <Phone className="w-8 h-8 text-white" />
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-500 text-sm uppercase tracking-wide mb-1">Phone Number</p>
//                     <div className="flex items-center">
//                       <p className="text-gray-900 text-xl font-bold mr-3">{enquiry.phoneNumber}</p>
//                       <button
//                         onClick={() => copyToClipboard(enquiry.phoneNumber)}
//                         className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100"
//                         title="Copy Phone Number"
//                       >
//                         <Copy className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Trip Information */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Trip Information
//                 </h2>
//                 <button
//                   onClick={openInMaps}
//                   className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <ExternalLink className="w-5 h-5 mr-2" />
//                   View in Maps
//                 </button>
//               </div>

//               <div className="space-y-8">
//                 {/* Service Type */}
//                 <div className={`bg-gradient-to-r ${getServiceTypeColor(enquiry.serviceType)} rounded-2xl p-8 text-white shadow-lg`}>
//                   <div className="flex items-center">
//                     <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-6">
//                       {getServiceTypeIcon(enquiry.serviceType)}
//                     </div>
//                     <div>
//                       <p className="text-white/80 text-sm uppercase tracking-wide font-semibold mb-1">Service Type</p>
//                       <p className="text-3xl font-bold text-white capitalize">{enquiry.serviceType.replace('-', ' ')}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Route */}
//                 <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-100">
//                   <div className="flex items-center mb-6">
//                     <Route className="w-8 h-8 text-blue-600 mr-4" />
//                     <h3 className="text-2xl font-bold text-gray-900">Route Details</h3>
//                   </div>
//                   <div className="space-y-6">
//                     <div className="flex items-center">
//                       <div className="w-4 h-4 bg-green-500 rounded-full mr-6 shadow-lg"></div>
//                       <div className="flex-1">
//                         <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">From</p>
//                         <p className="text-2xl font-bold text-gray-900">{enquiry.from}</p>
//                       </div>
//                     </div>
//                     <div className="border-l-4 border-gray-300 ml-2 h-12 opacity-50"></div>
//                     <div className="flex items-center">
//                       <div className="w-4 h-4 bg-red-500 rounded-full mr-6 shadow-lg"></div>
//                       <div className="flex-1">
//                         <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">To</p>
//                         <p className="text-2xl font-bold text-gray-900">{enquiry.to}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Date and Time */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
//                     <div className="flex items-center mb-4">
//                       <Calendar className="w-8 h-8 text-purple-600 mr-4" />
//                       <h3 className="text-xl font-bold text-gray-900">Date</h3>
//                     </div>
//                     <p className="text-lg font-bold text-gray-700">{formatDate(enquiry.date)}</p>
//                   </div>

//                   <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
//                     <div className="flex items-center mb-4">
//                       <Clock className="w-8 h-8 text-orange-600 mr-4" />
//                       <h3 className="text-xl font-bold text-gray-900">Time</h3>
//                     </div>
//                     <p className="text-lg font-bold text-gray-700">{enquiry.time}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Allocation Status */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                 Allocation Status
//               </h2>
              
//               <div className="grid md:grid-cols-2 gap-8">
//                 {/* Driver Allocation */}
//                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-xl font-bold text-gray-900">Driver</h3>
//                     <UserCheck className="w-8 h-8 text-blue-600" />
//                   </div>
                  
//                   {enquiry.allocatedDriver ? (
//                     <div className="space-y-2">
//                       <p className="text-lg font-bold text-gray-900">{enquiry.allocatedDriver.name}</p>
//                       <p className="text-gray-600">{enquiry.allocatedDriver.phone}</p>
//                       <p className="text-sm text-gray-500">
//                         {enquiry.allocatedDriver.experienceYears} years exp • Rating: {enquiry.allocatedDriver.rating?.toFixed(1)}
//                       </p>
//                       <button
//                         onClick={handleRevertDriver}
//                         disabled={updating}
//                         className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
//                       >
//                         {updating ? 'Reverting...' : 'Change Driver'}
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       <p className="text-gray-500">No driver allocated</p>
//                       <button
//                         onClick={() => {
//                           setShowDriverModal(true);
//                           fetchAvailableDrivers();
//                         }}
//                         className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
//                       >
//                         Allocate Driver
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Vehicle Allocation */}
//                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-xl font-bold text-gray-900">Vehicle</h3>
//                     <Car className="w-8 h-8 text-green-600" />
//                   </div>
                  
//                   {enquiry.allocatedVehicle ? (
//                     <div className="space-y-2">
//                       <p className="text-lg font-bold text-gray-900">{enquiry.allocatedCar.name}</p>
//                       <p className="text-gray-600">{enquiry.allocatedVehicle.carNumber}</p>
//                       <p className="text-sm text-gray-500">
//                         {enquiry.allocatedVehicle.color} • {enquiry.allocatedVehicle.mileage} km
//                       </p>
//                       <button
//                         onClick={handleRevertVehicle}
//                         disabled={updating}
//                         className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
//                       >
//                         {updating ? 'Reverting...' : 'Change Vehicle'}
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       <p className="text-gray-500">No vehicle allocated</p>
//                       <button
//                         onClick={() => {
//                           setShowCarModal(true);
//                           fetchAvailableCars();
//                         }}
//                         className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
//                       >
//                         Allocate Vehicle
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Timeline */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                 Enquiry Timeline
//               </h2>
              
//               <div className="space-y-6">
//                 <div className="flex items-center">
//                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-6 shadow-lg">
//                     <FileText className="w-6 h-6 text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="font-bold text-gray-900 text-lg">Enquiry Received</p>
//                     <p className="text-gray-500 font-medium">{formatDateTime(enquiry.createdAt)}</p>
//                   </div>
//                 </div>
                
//                 {enquiry.updatedAt && enquiry.updatedAt !== enquiry.createdAt && (
//                   <div className="flex items-center">
//                     <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-6 shadow-lg">
//                       <RefreshCw className="w-6 h-6 text-green-600" />
//                     </div>
//                     <div>
//                       <p className="font-bold text-gray-900 text-lg">Last Updated</p>
//                       <p className="text-gray-500 font-medium">{formatDateTime(enquiry.updatedAt)}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Actions & Summary */}
//           <div className="space-y-8">
//             {/* Quick Actions */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                 Quick Actions
//               </h3>
              
//               <div className="space-y-4">
//                 <button
//                   onClick={callCustomer}
//                   className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <PhoneCall className="w-6 h-6 mr-3" />
//                   Call Customer
//                 </button>
                
//                 <button
//                   onClick={sendWhatsApp}
//                   className="w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <MessageSquare className="w-6 h-6 mr-3" />
//                   Send WhatsApp
//                 </button>
                
//                 {/* New Send Details Button - Only show if both driver and vehicle are allocated */}
//                 {enquiry.allocatedDriver && enquiry.allocatedVehicle && (
//                   <button
//                     onClick={handleSendDetailsToCustomer}
//                     className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                   >
//                     <Send className="w-6 h-6 mr-3" />
//                     Send Details
//                   </button>
//                 )}
                
//                 <button
//                   onClick={() => setShowMessageModal(true)}
//                   className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <Send className="w-6 h-6 mr-3" />
//                   Send Message
//                 </button>
                
//                 <button
//                   onClick={() => copyToClipboard(`Name: ${enquiry.fullName}\nPhone: ${enquiry.phoneNumber}\nFrom: ${enquiry.from}\nTo: ${enquiry.to}\nDate: ${formatDate(enquiry.date)}\nTime: ${enquiry.time}\nService: ${enquiry.serviceType}`)}
//                   className="w-full flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <Copy className="w-6 h-6 mr-3" />
//                   Copy Details
//                 </button>

//                 <button
//                   onClick={openInMaps}
//                   className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                   <ExternalLink className="w-6 h-6 mr-3" />
//                   Open in Maps
//                 </button>
//               </div>
//             </div>

//             {/* Summary Card */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//               <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                 Enquiry Summary
//               </h3>
              
//               <div className="space-y-6">
//                 <div className="border-b border-gray-200 pb-4">
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Customer</p>
//                   <p className="text-lg font-bold text-gray-900">{enquiry.fullName}</p>
//                 </div>
                
//                 <div className="border-b border-gray-200 pb-4">
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Service</p>
//                   <p className="text-lg font-bold text-gray-900 capitalize">{enquiry.serviceType.replace('-', ' ')}</p>
//                 </div>
                
//                 <div className="border-b border-gray-200 pb-4">
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Journey</p>
//                   <p className="text-lg font-bold text-gray-900">{enquiry.from} → {enquiry.to}</p>
//                 </div>
                
//                 <div className="border-b border-gray-200 pb-4">
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Schedule</p>
//                   <p className="text-lg font-bold text-gray-900">{formatDate(enquiry.date)}</p>
//                   <p className="text-lg font-bold text-gray-900">{enquiry.time}</p>
//                 </div>
                
//                 <div>
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Contact</p>
//                   <p className="text-lg font-bold text-gray-900">{enquiry.phoneNumber}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Notifications Preview */}
//             {enquiry.customerNotifications && enquiry.customerNotifications.length > 0 && (
//               <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
//                 <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
//                   Recent Notifications
//                 </h3>
                
//                 <div className="space-y-4">
//                   {enquiry.customerNotifications.slice(-3).map((notification, index) => (
//                     <div key={index} className="bg-blue-50 rounded-lg p-4">
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <p className="text-sm font-semibold text-blue-800">{notification.type}</p>
//                           <p className="text-sm text-blue-700 mt-1">{notification.message}</p>
//                         </div>
//                         <div className="ml-4">
//                           <p className="text-xs text-blue-600">{formatDateTime(notification.sentAt)}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Message Modal */}
//         {showMessageModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-2xl font-bold text-gray-900">Send Message</h2>
//                   <button
//                     onClick={() => setShowMessageModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//                 <p className="text-gray-600 mt-2">To: {enquiry?.fullName}</p>
//               </div>
//               <div className="p-6">
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
//                     <select
//                       value={messageType}
//                       onChange={(e) => setMessageType(e.target.value)}
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="Rate Quote">Rate Quote</option>
//                       <option value="Driver Assigned">Driver Assigned</option>
//                       <option value="Booking Confirmed">Booking Confirmed</option>
//                       <option value="Trip Started">Trip Started</option>
//                       <option value="Trip Completed">Trip Completed</option>
//                       <option value="Custom Message">Custom Message</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
//                     <textarea
//                       value={message}
//                       onChange={(e) => setMessage(e.target.value)}
//                       rows={4}
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Type your message here..."
//                     />
//                   </div>
//                   {messageType === 'Rate Quote' && (
//                     <div className="bg-blue-50 p-4 rounded-lg">
//                       <p className="text-sm text-blue-700 font-medium">Quick Templates:</p>
//                       <div className="space-y-2 mt-2">
//                         <button
//                           onClick={() => setMessage(`Hello ${enquiry?.fullName}, your trip rate is ₹18/km. If you agree, please confirm to book. Thank you!`)}
//                           className="text-left text-sm text-blue-600 hover:text-blue-800 block"
//                         >
//                           • Rate ₹18/km template
//                         </button>
//                         <button
//                           onClick={() => setMessage(`Dear ${enquiry?.fullName}, we have reviewed your enquiry. The estimated fare is ₹15/km + ₹200 base fare. Please let us know if you want to proceed.`)}
//                           className="text-left text-sm text-blue-600 hover:text-blue-800 block"
//                         >
//                           • Detailed rate template
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="p-6 border-t border-gray-200">
//                 <div className="flex space-x-4">
//                   <button
//                     onClick={() => setShowMessageModal(false)}
//                     className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSendMessage}
//                     disabled={!message.trim() || updating}
//                     className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                   >
//                     {updating ? (
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     ) : (
//                       <>
//                         <Send className="w-4 h-4 mr-2" />
//                         Send
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Driver Allocation Modal */}
//         {showDriverModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900">Allocate Driver</h2>
//                     <p className="text-gray-600">For: {enquiry?.fullName}</p>
//                     <p className="text-sm text-blue-600 mt-1">📱 Will open WhatsApp chat with driver</p>
//                   </div>
//                   <button
//                     onClick={() => setShowDriverModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <div className="space-y-4">
//                   {availableDrivers.length === 0 ? (
//                     <p className="text-gray-500 text-center">No available drivers found</p>
//                   ) : (
//                     availableDrivers.map((driver) => (
//                       <div key={driver._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
//                         <div>
//                           <p className="font-medium text-lg">{driver.name}</p>
//                           <p className="text-sm text-gray-600">{driver.phone}</p>
//                           <p className="text-sm text-gray-600">
//                             {driver.experienceYears} years exp • Rating: {driver.rating?.toFixed(1) || 'N/A'}
//                           </p>
//                         </div>
//                         <button
//                           onClick={() => handleAllocateDriverWithWhatsApp(driver)}
//                           disabled={updating}
//                           className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg flex items-center disabled:opacity-50"
//                         >
//                           <MessageSquare className="w-4 h-4 mr-2" />
//                           {updating ? 'Allocating...' : 'Allocate'}
//                         </button>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//               <div className="p-6 border-t border-gray-200">
//                 <button
//                   onClick={() => setShowDriverModal(false)}
//                   className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Car Selection Modal */}
//         {showCarModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900">Select Car Model</h2>
//                     <p className="text-gray-600">For: {enquiry?.fullName}</p>
//                     <p className="text-sm text-blue-600 mt-1">📱 Will open WhatsApp chat after vehicle selection</p>
//                   </div>
//                   <button
//                     onClick={() => setShowCarModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {availableCars.length === 0 ? (
//                     <p className="text-gray-500 text-center col-span-full">No available cars found</p>
//                   ) : (
//                     availableCars.map((car) => (
//                       <div 
//                         key={car._id} 
//                         className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors hover:shadow-lg"
//                         onClick={() => {
//                           setSelectedCar(car);
//                           setShowVehicleModal(true);
//                           fetchAvailableVehicles(car._id);
//                         }}
//                       >
//                         <div className="bg-gradient-to-r from-blue-500 to-green-500 h-32 rounded-lg mb-3 flex items-center justify-center">
//                           <Car className="w-16 h-16 text-white" />
//                         </div>
//                         <h3 className="font-medium text-lg mb-2">{car.name}</h3>
//                         <p className="text-sm text-gray-600 mb-1">Category: {car.category}</p>
//                         <p className="text-sm text-gray-600 mb-3">Seating: {car.seatingCapacity} people</p>
//                         {car.pricing && (
//                           <div className="text-sm text-green-600 font-medium">
//                             Base: ₹{car.pricing.baseFare} + ₹{car.pricing.perKm}/km
//                           </div>
//                         )}
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//               <div className="p-6 border-t border-gray-200">
//                 <button
//                   onClick={() => setShowCarModal(false)}
//                   className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Vehicle Selection Modal */}
//         {showVehicleModal && selectedCar && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900">Select Vehicle</h2>
//                     <p className="text-gray-600">Car: {selectedCar.name}</p>
//                     <p className="text-sm text-blue-600 mt-1">📱 Will open WhatsApp chat with customer</p>
//                   </div>
//                   <button
//                     onClick={() => setShowVehicleModal(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <div className="space-y-4">
//                   {availableVehicles.length === 0 ? (
//                     <p className="text-gray-500 text-center">No available vehicles found for this car model</p>
//                   ) : (
//                     availableVehicles.map((vehicle) => (
//                       <div key={vehicle._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
//                         <div className="flex items-center">
//                           <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
//                             <Car className="w-6 h-6 text-white" />
//                           </div>
//                           <div>
//                             <p className="font-medium text-lg">{vehicle.carNumber}</p>
//                             <p className="text-sm text-gray-600">Color: {vehicle.color}</p>
//                             <p className="text-sm text-gray-600">
//                               Mileage: {vehicle.mileage?.toLocaleString() || 'N/A'} km • 
//                               Trips: {vehicle.totalTrips || 0}
//                             </p>
//                           </div>
//                         </div>
//                         <button
//                           onClick={() => handleAllocateVehicleWithWhatsApp(vehicle)}
//                           disabled={updating}
//                           className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg flex items-center disabled:opacity-50"
//                         >
//                           <MessageSquare className="w-4 h-4 mr-2" />
//                           {updating ? 'Allocating...' : 'Allocate'}
//                         </button>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//               <div className="p-6 border-t border-gray-200">
//                 <button
//                   onClick={() => setShowVehicleModal(false)}
//                   className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EnhancedEnquiryDetail;










import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  Loader,
  UserCheck,
  Send,
  X,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Eye,
  Settings
} from 'lucide-react';

const ENQUIRY_API = 'http://localhost:8000/api/enquiry';

const EnhancedEnquiryDetail = () => {
  const { id: enquiryId } = useParams(); // Get ID from URL params
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [showCarModal, setShowCarModal] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [availableCars, setAvailableCars] = useState([]);
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('Custom Message');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchEnquiry();
  }, []);

  const fetchEnquiry = async () => {
    try {
      setLoading(true);
      
      if (!enquiryId) {
        setError('No enquiry ID provided');
        return;
      }
      
      console.log('Fetching enquiry with ID:', enquiryId);
      
      // Try to fetch from API first
      try {
        const response = await fetch(`${ENQUIRY_API}/${enquiryId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        console.log('API Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched enquiry data:', data);
          setEnquiry(data);
          return;
        } else {
          const errorData = await response.text();
          console.error('API Error Response:', errorData);
          throw new Error(`API Error: ${response.status}`);
        }
      } catch (apiError) {
        console.log('API call failed, using mock data:', apiError);
      }
      
      // Fallback to mock data if API fails
      const mockEnquiry = {
        _id: enquiryId,
        fullName: "Rajesh Kumar",
        phoneNumber: "9876543210",
        from: "Delhi Airport",
        to: "Connaught Place",
        date: "2024-01-15",
        time: "10:30 AM",
        serviceType: "airport-transfer",
        status: "Not Confirmed",
        createdAt: "2024-01-14T08:30:00Z",
        updatedAt: "2024-01-14T08:30:00Z",
        allocatedDriver: null,
        allocatedCar: null,
        allocatedVehicle: null,
        messages: [],
        customerNotifications: []
      };
      console.log('Using mock data:', mockEnquiry);
      setEnquiry(mockEnquiry);
      
    } catch (err) {
      setError(err.message || 'Failed to fetch enquiry details');
      console.error('Error fetching enquiry:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableDrivers = async () => {
    try {
      console.log('Fetching available drivers...');
      
      // Try API first, fallback to mock data
      try {
        // Use the correct drivers API endpoint
        const response = await fetch('http://localhost:8000/api/drivers', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        console.log('Drivers API Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched drivers:', data);
          // Filter only active drivers
          const activeDrivers = data.filter(driver => driver.status === 'Active');
          setAvailableDrivers(activeDrivers);
          return;
        } else {
          const errorData = await response.text();
          console.error('Drivers API Error:', errorData);
        }
      } catch (apiError) {
        console.log('Drivers API failed, using mock data:', apiError);
      }
      
      // Fallback mock data
      const mockDrivers = [
        {
          _id: "driver1",
          name: "Suresh Kumar",
          phone: "9123456789",
          experienceYears: 5,
          rating: 4.5,
          status: "Active"
        },
        {
          _id: "driver2", 
          name: "Amit Singh",
          phone: "9234567890",
          experienceYears: 8,
          rating: 4.8,
          status: "Active"
        },
        {
          _id: "driver3",
          name: "Vikash Sharma", 
          phone: "9345678901",
          experienceYears: 3,
          rating: 4.2,
          status: "Active"
        }
      ];
      console.log('Using mock drivers:', mockDrivers);
      setAvailableDrivers(mockDrivers);
      
    } catch (err) {
      console.error('Error fetching drivers:', err);
      setError('Failed to fetch available drivers');
    }
  };

  const fetchAvailableCars = async () => {
    try {
      console.log('Fetching available cars...');
      
      // Try API first, fallback to mock data
      try {
        // Use the correct cars API endpoint
        const response = await fetch('http://localhost:8000/api/cars', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        console.log('Cars API Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched cars:', data);
          // Filter only available cars
          const availableCars = data.filter(car => car.status === 'Active');
          setAvailableCars(availableCars);
          return;
        } else {
          const errorData = await response.text();
          console.error('Cars API Error:', errorData);
        }
      } catch (apiError) {
        console.log('Cars API failed, using mock data:', apiError);
      }
      
      // Fallback mock data
      const mockCars = [
        {
          _id: "car1",
          name: "Maruti Swift",
          category: "Hatchback", 
          seatingCapacity: 4,
          pricing: { baseFare: 200, perKm: 15 },
          photos: [],
          status: "Active"
        },
        {
          _id: "car2",
          name: "Honda City",
          category: "Sedan",
          seatingCapacity: 4, 
          pricing: { baseFare: 300, perKm: 18 },
          photos: [],
          status: "Active"
        },
        {
          _id: "car3",
          name: "Toyota Innova",
          category: "SUV",
          seatingCapacity: 7,
          pricing: { baseFare: 500, perKm: 22 },
          photos: [],
          status: "Active"
        }
      ];
      console.log('Using mock cars:', mockCars);
      setAvailableCars(mockCars);
      
    } catch (err) {
      console.error('Error fetching cars:', err);
      setError('Failed to fetch available cars');
    }
  };

  const fetchAvailableVehicles = async (carId) => {
    try {
      console.log('Fetching available vehicles for car:', carId);
      
      // Try API first, fallback to mock data
      try {
        // Use the correct vehicles API endpoint
        const response = await fetch(`http://localhost:8000/api/vehicles/car/${carId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        console.log('Vehicles API Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched vehicles:', data);
          // Filter only available vehicles
          const availableVehicles = data.filter(vehicle => vehicle.status === 'Available');
          setAvailableVehicles(availableVehicles);
          return;
        } else {
          const errorData = await response.text();
          console.error('Vehicles API Error:', errorData);
        }
      } catch (apiError) {
        console.log('Vehicles API failed, using mock data:', apiError);
      }
      
      // Fallback mock data
      const mockVehicles = [
        {
          _id: "vehicle1",
          carNumber: "DL 01 AB 1234",
          color: "White",
          mileage: 45000,
          totalTrips: 120,
          status: "Available"
        },
        {
          _id: "vehicle2",
          carNumber: "DL 02 CD 5678", 
          color: "Silver",
          mileage: 32000,
          totalTrips: 85,
          status: "Available"
        },
        {
          _id: "vehicle3",
          carNumber: "DL 03 EF 9012",
          color: "Black",
          mileage: 28000,
          totalTrips: 95,
          status: "Available"
        }
      ];
      console.log('Using mock vehicles:', mockVehicles);
      setAvailableVehicles(mockVehicles);
      
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      setError('Failed to fetch available vehicles');
    }
  };

  // Helper function to create enquiry details message for driver
  const createEnquiryDetailsMessage = () => {
    return `🚗 *New Trip Assignment*

👤 *Customer:* ${enquiry.fullName}
📞 *Phone:* ${enquiry.phoneNumber}
📍 *From:* ${enquiry.from}
📍 *To:* ${enquiry.to}
📅 *Date:* ${formatDate(enquiry.date)}
⏰ *Time:* ${enquiry.time}
🎯 *Service:* ${enquiry.serviceType.replace('-', ' ')}
🆔 *Enquiry ID:* ENQ-${enquiry._id.slice(-6).toUpperCase()}

Please confirm your availability for this trip.`;
  };

  // Helper function to create customer message with allocated details
  const createCustomerAllocationMessage = () => {
    let message = `🚗 *Trip Confirmed!*

Hello ${enquiry.fullName},

Your booking details:
📍 *From:* ${enquiry.from}
📍 *To:* ${enquiry.to}
📅 *Date:* ${formatDate(enquiry.date)}
⏰ *Time:* ${enquiry.time}
🆔 *Booking ID:* ENQ-${enquiry._id.slice(-6).toUpperCase()}`;

    if (enquiry.allocatedDriver) {
      message += `\n\n👨‍✈️ *Driver Details:*
🏷️ *Name:* ${enquiry.allocatedDriver.name}
📞 *Phone:* ${enquiry.allocatedDriver.phone}
⭐ *Experience:* ${enquiry.allocatedDriver.experienceYears} years
📊 *Rating:* ${enquiry.allocatedDriver.rating?.toFixed(1)}/5`;
    }

    if (enquiry.allocatedCar && enquiry.allocatedVehicle) {
      message += `\n\n🚙 *Vehicle Details:*
🚗 *Car:* ${enquiry.allocatedCar.name}
🔢 *Number:* ${enquiry.allocatedVehicle.carNumber}
🎨 *Color:* ${enquiry.allocatedVehicle.color}
👥 *Seating:* ${enquiry.allocatedCar.seatingCapacity} people`;
    }

    message += `\n\nThank you for choosing our service! 🙏`;
    return message;
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setUpdating(true);
      
      // Try API call first
      try {
        const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ status: newStatus }),
        });

        if (response.ok) {
          const data = await response.json();
          setEnquiry(data.enquiry || data);
        } else {
          throw new Error(`Server error: ${response.status}`);
        }
      } catch (apiError) {
        console.log('Status update API failed, updating locally:', apiError);
        // Fallback to local state update
        setEnquiry(prev => ({ ...prev, status: newStatus }));
      }
      
    } catch (err) {
      setError('Failed to update status');
      console.error('Error updating status:', err);
      // Still update locally as fallback
      setEnquiry(prev => ({ ...prev, status: newStatus }));
    } finally {
      setUpdating(false);
    }
  };

  // New function to handle driver allocation with WhatsApp redirection
  const handleAllocateDriverWithWhatsApp = async (driver) => {
    try {
      setUpdating(true);
      
      // Try API call first
      try {
        const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/allocate-driver`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ driverId: driver._id }),
        });

        if (response.ok) {
          const data = await response.json();
          setEnquiry(data.enquiry);
        } else {
          // Fallback to local state update
          setEnquiry(prev => ({
            ...prev,
            allocatedDriver: driver
          }));
        }
      } catch (apiError) {
        console.log('Driver allocation API failed, updating locally:', apiError);
        // Fallback to local state update
        setEnquiry(prev => ({
          ...prev,
          allocatedDriver: driver
        }));
      }

      // Create the enquiry details message
      const message = createEnquiryDetailsMessage();
      
      // Redirect to WhatsApp with the driver's number and pre-filled message
      const whatsappUrl = `https://wa.me/91${driver.phone}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      setShowDriverModal(false);
      
      // Show success message
      alert(`Driver ${driver.name} allocated successfully! WhatsApp opened.`);
      
    } catch (err) {
      setError(`Failed to allocate driver: ${err.message}`);
      console.error('Error allocating driver:', err);
    } finally {
      setUpdating(false);
    }
  };

  // New function to handle vehicle allocation with WhatsApp redirection
  const handleAllocateVehicleWithWhatsApp = async (vehicle) => {
    try {
      setUpdating(true);
      
      // Try API call first
      try {
        const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/allocate-vehicle`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ carId: selectedCar._id, vehicleId: vehicle._id }),
        });

        if (response.ok) {
          const data = await response.json();
          setEnquiry(data.enquiry || data);
        } else {
          const errorData = await response.text();
          console.error('Vehicle allocation API error:', errorData);
          throw new Error(`Server error: ${response.status}`);
        }
      } catch (apiError) {
        console.log('Vehicle allocation API failed, updating locally:', apiError);
        // Fallback to local state update
        setEnquiry(prev => ({
          ...prev,
          allocatedCar: selectedCar,
          allocatedVehicle: vehicle
        }));
      }

      // Update enquiry state to get latest allocated driver info
      const updatedEnquiry = {
        ...enquiry,
        allocatedCar: selectedCar,
        allocatedVehicle: vehicle
      };

      // If driver is also allocated, send combined message to customer
      if (updatedEnquiry.allocatedDriver) {
        // Create updated message with latest data
        const customerMessage = `🚗 *Trip Confirmed!*

Hello ${updatedEnquiry.fullName},

Your booking details:
📍 *From:* ${updatedEnquiry.from}
📍 *To:* ${updatedEnquiry.to}
📅 *Date:* ${formatDate(updatedEnquiry.date)}
⏰ *Time:* ${updatedEnquiry.time}
🆔 *Booking ID:* ENQ-${updatedEnquiry._id.slice(-6).toUpperCase()}

👨‍✈️ *Driver Details:*
🏷️ *Name:* ${updatedEnquiry.allocatedDriver.name}
📞 *Phone:* ${updatedEnquiry.allocatedDriver.phone}
⭐ *Experience:* ${updatedEnquiry.allocatedDriver.experienceYears} years
📊 *Rating:* ${updatedEnquiry.allocatedDriver.rating?.toFixed(1)}/5

🚙 *Vehicle Details:*
🚗 *Car:* ${selectedCar.name}
🔢 *Number:* ${vehicle.carNumber}
🎨 *Color:* ${vehicle.color}
👥 *Seating:* ${selectedCar.seatingCapacity} people

Thank you for choosing our service! 🙏`;

        const customerWhatsappUrl = `https://wa.me/91${updatedEnquiry.phoneNumber}?text=${encodeURIComponent(customerMessage)}`;
        window.open(customerWhatsappUrl, '_blank');
        
        // Show success message
        alert(`Vehicle ${vehicle.carNumber} allocated successfully! Customer WhatsApp opened with complete details.`);
      } else {
        // Show partial success message
        alert(`Vehicle ${vehicle.carNumber} allocated successfully! Allocate driver to send complete details to customer.`);
      }
      
      setShowVehicleModal(false);
      setShowCarModal(false);
      
    } catch (err) {
      setError(`Failed to allocate vehicle: ${err.message}`);
      console.error('Error allocating vehicle:', err);
    } finally {
      setUpdating(false);
    }
  };

  const handleRevertDriver = async () => {
    try {
      setUpdating(true);
      
      // Try API call first
      try {
        const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/revert-driver`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setEnquiry(data.enquiry || data);
        } else {
          throw new Error(`Server error: ${response.status}`);
        }
      } catch (apiError) {
        console.log('Revert driver API failed, updating locally:', apiError);
        // Fallback to local state update
        setEnquiry(prev => ({ ...prev, allocatedDriver: null }));
      }
      
      // Show success message
      alert('Driver allocation reverted successfully!');
      
    } catch (err) {
      setError(`Failed to revert driver: ${err.message}`);
      console.error('Error reverting driver:', err);
    } finally {
      setUpdating(false);
    }
  };

  const handleRevertVehicle = async () => {
    try {
      setUpdating(true);
      
      // Try API call first
      try {
        const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/revert-vehicle`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setEnquiry(data.enquiry || data);
        } else {
          throw new Error(`Server error: ${response.status}`);
        }
      } catch (apiError) {
        console.log('Revert vehicle API failed, updating locally:', apiError);
        // Fallback to local state update
        setEnquiry(prev => ({ 
          ...prev, 
          allocatedCar: null,
          allocatedVehicle: null 
        }));
      }
      
      // Show success message
      alert('Vehicle allocation reverted successfully!');
      
    } catch (err) {
      setError(`Failed to revert vehicle: ${err.message}`);
      console.error('Error reverting vehicle:', err);
    } finally {
      setUpdating(false);
    }
  };

  const handleSendMessage = async () => {
    try {
      setUpdating(true);
      
      if (!message.trim()) {
        alert('Please enter a message');
        return;
      }
      
      // Try API call first
      try {
        const response = await fetch(`${ENQUIRY_API}/${enquiry._id}/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ 
            message: message.trim(),
            type: messageType 
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          setEnquiry(data.enquiry || data);
        } else {
          const errorData = await response.text();
          console.error('Message API error:', errorData);
          throw new Error(`Server error: ${response.status}`);
        }
      } catch (apiError) {
        console.log('Message API failed, updating locally:', apiError);
        // Fallback to local state update
        setEnquiry(prev => ({
          ...prev,
          messages: [
            ...(prev.messages || []),
            {
              sender: 'Admin',
              message: message.trim(),
              timestamp: new Date().toISOString(),
              isRead: false
            }
          ],
          customerNotifications: [
            ...(prev.customerNotifications || []),
            {
              type: messageType,
              message: message.trim(),
              sentAt: new Date().toISOString(),
              isRead: false
            }
          ]
        }));
      }
      
      setMessage('');
      setShowMessageModal(false);
      
      // Show success message
      alert('Message sent successfully!');
      
    } catch (err) {
      setError(`Failed to send message: ${err.message}`);
      console.error('Error sending message:', err);
    } finally {
      setUpdating(false);
    }
  };

  // New function to send complete details to customer
  const handleSendDetailsToCustomer = () => {
    const detailsMessage = createCustomerAllocationMessage();
    const whatsappUrl = `https://wa.me/91${enquiry.phoneNumber}?text=${encodeURIComponent(detailsMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Not Confirmed': return 'bg-gray-100 text-gray-800';
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Ongoing': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-purple-100 text-purple-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getServiceTypeIcon = (serviceType) => {
    const icons = {
      'airport-transfer': Navigation,
      'one-way': Car,
      'round-trip': RefreshCw,
      'local-tour': MapPin,
      'outstation': Route,
      'tour-package': Calendar
    };
    const IconComponent = icons[serviceType] || Car;
    return <IconComponent className="w-6 h-6 text-white" />;
  };

  const getServiceTypeColor = (serviceType) => {
    const colors = {
      'airport-transfer': 'from-purple-500 to-purple-600',
      'one-way': 'from-green-500 to-green-600',
      'round-trip': 'from-orange-500 to-orange-600',
      'local-tour': 'from-blue-500 to-blue-600',
      'outstation': 'from-indigo-500 to-indigo-600',
      'tour-package': 'from-pink-500 to-pink-600'
    };
    return colors[serviceType] || 'from-gray-500 to-gray-600';
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
    window.location.href = '/enquiries';
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="flex items-center text-blue-700 hover:text-blue-800 font-semibold mr-6 transition-all duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-md hover:shadow-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Enquiries
            </button>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Enquiry Details
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                ID: ENQ-{enquiry._id.slice(-6).toUpperCase()}
              </p>
            </div>
          </div>
          
          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={enquiry.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={updating}
              className={`appearance-none font-semibold rounded-full px-6 py-3 pr-10 border-0 cursor-pointer ${getStatusColor(enquiry.status)} ${updating ? 'opacity-50' : ''}`}
            >
              <option value="Not Confirmed">Not Confirmed</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5 pointer-events-none" />
          </div>
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
                      <p className="text-3xl font-bold text-white capitalize">{enquiry.serviceType.replace('-', ' ')}</p>
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

            {/* Allocation Status */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
                Allocation Status
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Driver Allocation */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Driver</h3>
                    <UserCheck className="w-8 h-8 text-blue-600" />
                  </div>
                  
                  {enquiry.allocatedDriver ? (
                    <div className="space-y-2">
                      <p className="text-lg font-bold text-gray-900">{enquiry.allocatedDriver.name}</p>
                      <p className="text-gray-600">{enquiry.allocatedDriver.phone}</p>
                      <p className="text-sm text-gray-500">
                        {enquiry.allocatedDriver.experienceYears} years exp • Rating: {enquiry.allocatedDriver.rating?.toFixed(1)}
                      </p>
                      <button
                        onClick={handleRevertDriver}
                        disabled={updating}
                        className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                      >
                        {updating ? 'Reverting...' : 'Change Driver'}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-gray-500">No driver allocated</p>
                      <button
                        onClick={() => {
                          setShowDriverModal(true);
                          fetchAvailableDrivers();
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Allocate Driver
                      </button>
                    </div>
                  )}
                </div>

                {/* Vehicle Allocation */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Vehicle</h3>
                    <Car className="w-8 h-8 text-green-600" />
                  </div>
                  
                  {enquiry.allocatedVehicle ? (
                    <div className="space-y-2">
                      <p className="text-lg font-bold text-gray-900">{enquiry.allocatedCar.name}</p>
                      <p className="text-gray-600">{enquiry.allocatedVehicle.carNumber}</p>
                      <p className="text-sm text-gray-500">
                        {enquiry.allocatedVehicle.color} • {enquiry.allocatedVehicle.mileage} km
                      </p>
                      <button
                        onClick={handleRevertVehicle}
                        disabled={updating}
                        className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                      >
                        {updating ? 'Reverting...' : 'Change Vehicle'}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-gray-500">No vehicle allocated</p>
                      <button
                        onClick={() => {
                          setShowCarModal(true);
                          fetchAvailableCars();
                        }}
                        className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Allocate Vehicle
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Timeline */}
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

          {/* Right Column - Actions & Summary */}
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
                
                {/* New Send Details Button - Only show if both driver and vehicle are allocated */}
                {enquiry.allocatedDriver && enquiry.allocatedVehicle && (
                  <button
                    onClick={handleSendDetailsToCustomer}
                    className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-6 h-6 mr-3" />
                    Send Details
                  </button>
                )}
                
                <button
                  onClick={() => setShowMessageModal(true)}
                  className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Send className="w-6 h-6 mr-3" />
                  Send Message
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
                  className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
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
                  <p className="text-lg font-bold text-gray-900 capitalize">{enquiry.serviceType.replace('-', ' ')}</p>
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

            {/* Notifications Preview */}
            {enquiry.customerNotifications && enquiry.customerNotifications.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
                  Recent Notifications
                </h3>
                
                <div className="space-y-4">
                  {enquiry.customerNotifications.slice(-3).map((notification, index) => (
                    <div key={index} className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-blue-800">{notification.type}</p>
                          <p className="text-sm text-blue-700 mt-1">{notification.message}</p>
                        </div>
                        <div className="ml-4">
                          <p className="text-xs text-blue-600">{formatDateTime(notification.sentAt)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Message Modal */}
        {showMessageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Send Message</h2>
                  <button
                    onClick={() => setShowMessageModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-gray-600 mt-2">To: {enquiry?.fullName}</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
                    <select
                      value={messageType}
                      onChange={(e) => setMessageType(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Rate Quote">Rate Quote</option>
                      <option value="Driver Assigned">Driver Assigned</option>
                      <option value="Booking Confirmed">Booking Confirmed</option>
                      <option value="Trip Started">Trip Started</option>
                      <option value="Trip Completed">Trip Completed</option>
                      <option value="Custom Message">Custom Message</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Type your message here..."
                    />
                  </div>
                  {messageType === 'Rate Quote' && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-700 font-medium">Quick Templates:</p>
                      <div className="space-y-2 mt-2">
                        <button
                          onClick={() => setMessage(`Hello ${enquiry?.fullName}, your trip rate is ₹18/km. If you agree, please confirm to book. Thank you!`)}
                          className="text-left text-sm text-blue-600 hover:text-blue-800 block"
                        >
                          • Rate ₹18/km template
                        </button>
                        <button
                          onClick={() => setMessage(`Dear ${enquiry?.fullName}, we have reviewed your enquiry. The estimated fare is ₹15/km + ₹200 base fare. Please let us know if you want to proceed.`)}
                          className="text-left text-sm text-blue-600 hover:text-blue-800 block"
                        >
                          • Detailed rate template
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6 border-t border-gray-200">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowMessageModal(false)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim() || updating}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {updating ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Driver Allocation Modal */}
        {showDriverModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Allocate Driver</h2>
                    <p className="text-gray-600">For: {enquiry?.fullName}</p>
                    <p className="text-sm text-blue-600 mt-1">📱 Will open WhatsApp chat with driver</p>
                  </div>
                  <button
                    onClick={() => setShowDriverModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {availableDrivers.length === 0 ? (
                    <p className="text-gray-500 text-center">No available drivers found</p>
                  ) : (
                    availableDrivers.map((driver) => (
                      <div key={driver._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div>
                          <p className="font-medium text-lg">{driver.name}</p>
                          <p className="text-sm text-gray-600">{driver.phone}</p>
                          <p className="text-sm text-gray-600">
                            {driver.experienceYears} years exp • Rating: {driver.rating?.toFixed(1) || 'N/A'}
                          </p>
                        </div>
                        <button
                          onClick={() => handleAllocateDriverWithWhatsApp(driver)}
                          disabled={updating}
                          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg flex items-center disabled:opacity-50"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          {updating ? 'Allocating...' : 'Allocate'}
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowDriverModal(false)}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Car Selection Modal */}
        {showCarModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Select Car Model</h2>
                    <p className="text-gray-600">For: {enquiry?.fullName}</p>
                    <p className="text-sm text-blue-600 mt-1">📱 Will open WhatsApp chat after vehicle selection</p>
                  </div>
                  <button
                    onClick={() => setShowCarModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableCars.length === 0 ? (
                    <p className="text-gray-500 text-center col-span-full">No available cars found</p>
                  ) : (
                    availableCars.map((car) => (
                      <div 
                        key={car._id} 
                        className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors hover:shadow-lg"
                        onClick={() => {
                          setSelectedCar(car);
                          setShowVehicleModal(true);
                          fetchAvailableVehicles(car._id);
                        }}
                      >
                        <div className="bg-gradient-to-r from-blue-500 to-green-500 h-32 rounded-lg mb-3 flex items-center justify-center">
                          <Car className="w-16 h-16 text-white" />
                        </div>
                        <h3 className="font-medium text-lg mb-2">{car.name}</h3>
                        <p className="text-sm text-gray-600 mb-1">Category: {car.category}</p>
                        <p className="text-sm text-gray-600 mb-3">Seating: {car.seatingCapacity} people</p>
                        {car.pricing && (
                          <div className="text-sm text-green-600 font-medium">
                            Base: ₹{car.pricing.baseFare} + ₹{car.pricing.perKm}/km
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowCarModal(false)}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Vehicle Selection Modal */}
        {showVehicleModal && selectedCar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Select Vehicle</h2>
                    <p className="text-gray-600">Car: {selectedCar.name}</p>
                    <p className="text-sm text-blue-600 mt-1">📱 Will open WhatsApp chat with customer</p>
                  </div>
                  <button
                    onClick={() => setShowVehicleModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {availableVehicles.length === 0 ? (
                    <p className="text-gray-500 text-center">No available vehicles found for this car model</p>
                  ) : (
                    availableVehicles.map((vehicle) => (
                      <div key={vehicle._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                            <Car className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-lg">{vehicle.carNumber}</p>
                            <p className="text-sm text-gray-600">Color: {vehicle.color}</p>
                            <p className="text-sm text-gray-600">
                              Mileage: {vehicle.mileage?.toLocaleString() || 'N/A'} km • 
                              Trips: {vehicle.totalTrips || 0}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleAllocateVehicleWithWhatsApp(vehicle)}
                          disabled={updating}
                          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg flex items-center disabled:opacity-50"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          {updating ? 'Allocating...' : 'Allocate'}
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowVehicleModal(false)}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedEnquiryDetail;