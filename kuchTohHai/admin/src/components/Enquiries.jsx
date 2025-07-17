

// import React, { useState, useEffect } from 'react';
// import { Navigation } from 'lucide-react';
// import {
//   Search,
//   Filter,
//   Calendar,
//   Clock,
//   MapPin,
//   Phone,
//   User,
//   Car,
//   ArrowRight,
//   RefreshCw,
//   FileText,
//   Eye,
//   ChevronDown,
//   Download,
//   Mail,
//   ArrowLeft
// } from 'lucide-react';
// import axios from 'axios';
// import { ENQUIRY_API } from './utils/constants';
// import { useNavigate } from 'react-router-dom';

// const Enquiries = () => {
//   const [enquiries, setEnquiries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedService, setSelectedService] = useState('all');
//   const [dateRange, setDateRange] = useState({ from: '', to: '' });

//   useEffect(() => {
//     fetchEnquiries();
//   }, []);

//   const fetchEnquiries = async () => {
//   try {
//     setLoading(true);
    
//     const response = await axios.get(`${ENQUIRY_API}/all`, {
//       withCredentials: true, // Send cookies with the request
//     });

//     setEnquiries(response.data);
//   } catch (err) {
//     setError(err.response?.data?.message || err.message || 'Failed to fetch enquiries');
//   } finally {
//     setLoading(false);
//   }
// };
//   const handleRefresh = () => {
//     fetchEnquiries();
//   };
//    const backHandler = () => {
//     navigate("/dashboard");
//   };

//   const navigate = useNavigate();

//   const onSelectEnquiry = (enquiry) => {
//     navigate(`/enquiry/${enquiry._id}`);
//   };

//   const getServiceTypeColor = (serviceType) => {
//     const colors = {
//       'local': 'bg-blue-100 text-blue-800',
//       'outstation': 'bg-green-100 text-green-800',
//       'airport': 'bg-purple-100 text-purple-800',
//       'rental': 'bg-orange-100 text-orange-800',
//       'wedding': 'bg-pink-100 text-pink-800',
//       'corporate': 'bg-gray-100 text-gray-800',
//       'default': 'bg-gray-100 text-gray-800'
//     };
//     return colors[serviceType.toLowerCase()] || colors.default;
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const formatTime = (timeString) => {
//     return timeString;
//   };

//   const getTimeAgo = (dateString) => {
//     const now = new Date();
//     const enquiryDate = new Date(dateString);
//     const diffTime = Math.abs(now - enquiryDate);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
//     if (diffDays === 1) return 'Today';
//     if (diffDays === 2) return 'Yesterday';
//     if (diffDays <= 7) return `${diffDays} days ago`;
//     return formatDate(dateString);
//   };

//   // Filter enquiries
//   const filteredEnquiries = enquiries
//     .filter(enquiry => {
//       const matchesSearch = 
//         enquiry.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         enquiry.phoneNumber.includes(searchTerm) ||
//         enquiry.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         enquiry.to.toLowerCase().includes(searchTerm.toLowerCase());
      
//       const matchesService = selectedService === 'all' || 
//         enquiry.serviceType.toLowerCase() === selectedService.toLowerCase();
      
//       const matchesDateRange = !dateRange.from || !dateRange.to ||
//         (new Date(enquiry.date) >= new Date(dateRange.from) && 
//          new Date(enquiry.date) <= new Date(dateRange.to));
      
//       return matchesSearch && matchesService && matchesDateRange;
//     });

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentEnquiries = filteredEnquiries.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);

//   const exportEnquiries = () => {
//     const csvContent = [
//       ['Name', 'Phone', 'From', 'To', 'Date', 'Time', 'Service Type', 'Created At'],
//       ...filteredEnquiries.map(enquiry => [
//         enquiry.fullName,
//         enquiry.phoneNumber,
//         enquiry.from,
//         enquiry.to,
//         formatDate(enquiry.date),
//         enquiry.time,
//         enquiry.serviceType,
//         new Date(enquiry.createdAt).toLocaleString()
//       ])
//     ].map(row => row.join(',')).join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `enquiries_${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
//           <p className="text-xl font-medium text-gray-700">Loading enquiries...</p>
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
//           <button
//             onClick={handleRefresh}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//             <button
//               onClick={backHandler}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
//             >
//               <ArrowLeft size={18} />
//               <span>Back to Dashboard</span>
//             </button>
//           <div>
//             <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Customer Enquiries
//             </h1>
//             <p className="text-gray-600 mt-2">
//               Manage and track all customer enquiries
//             </p>
//           </div>
//           <div className="flex items-center space-x-4 mt-4 md:mt-0">
//             <button
//               onClick={exportEnquiries}
//               className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
//             >
//               <Download className="w-4 h-4 mr-2" />
//               Export
//             </button>
//             <button
//               onClick={handleRefresh}
//               className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
//             >
//               <RefreshCw className="w-4 h-4 mr-2" />
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 lg:gap-6 mb-8">
//           {/* Total Enquiries */}
//           {/* <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs lg:text-sm font-medium text-gray-600">Total Enquiries</p>
//                 <p className="text-xl lg:text-3xl font-bold text-gray-900">{enquiries.length}</p>
//               </div>
//               <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
//                 <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
//               </div>
//             </div>
//           </div> */}

//           {/* Airport Transfer */}
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs lg:text-sm font-medium text-gray-600">Airport Transfer</p>
//                 <p className="text-xl lg:text-3xl font-bold text-gray-900">
//                   {enquiries.filter(e => e.serviceType.toLowerCase() === 'airport-transfer').length}
//                 </p>
//               </div>
//               <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
//                 <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
//               </div>
//             </div>
//           </div>

//           {/* One Way Trip */}
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs lg:text-sm font-medium text-gray-600">One Way Trip</p>
//                 <p className="text-xl lg:text-3xl font-bold text-gray-900">
//                   {enquiries.filter(e => e.serviceType.toLowerCase() === 'one-way').length}
//                 </p>
//               </div>
//               <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
//                 <Car className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
//               </div>
//             </div>
//           </div>

//           {/* Round Trip */}
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs lg:text-sm font-medium text-gray-600">Round Trip</p>
//                 <p className="text-xl lg:text-3xl font-bold text-gray-900">
//                   {enquiries.filter(e => e.serviceType.toLowerCase() === 'round-trip').length}
//                 </p>
//               </div>
//               <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
//                 <RefreshCw className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
//               </div>
//             </div>
//           </div>

//           {/* Local Tour */}
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs lg:text-sm font-medium text-gray-600">Local Tour</p>
//                 <p className="text-xl lg:text-3xl font-bold text-gray-900">
//                   {enquiries.filter(e => e.serviceType.toLowerCase() === 'local-tour').length}
//                 </p>
//               </div>
//               <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
//                 <MapPin className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
//               </div>
//             </div>
//           </div>

//           {/* Outstation Trip */}
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs lg:text-sm font-medium text-gray-600">Outstation Trip</p>
//                 <p className="text-xl lg:text-3xl font-bold text-gray-900">
//                   {enquiries.filter(e => e.serviceType.toLowerCase() === 'outstation').length}
//                 </p>
//               </div>
//               <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
//                 <Navigation className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
//               </div>
//             </div>
//           </div>

//           {/* Tour Package */}
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs lg:text-sm font-medium text-gray-600">Tour Package</p>
//                 <p className="text-xl lg:text-3xl font-bold text-gray-900">
//                   {enquiries.filter(e => e.serviceType.toLowerCase() === 'tour-package').length}
//                 </p>
//               </div>
//               <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
//                 <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Filters and Search */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
//           <div className="flex flex-col md:flex-row gap-4">
//             {/* Search */}
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search by name, phone, or location..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>

//             {/* Service Filter */}
//             <div className="relative">
//               <select
//                 value={selectedService}
//                 onChange={(e) => setSelectedService(e.target.value)}
//                 className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="all">All Services</option>
//                 <option value="airport-transfer">Airport Transfer</option>
//                 <option value="one-way">One Way Trip</option>
//                 <option value="round-trip">Round Trip</option>
//                 <option value="local-tour">Local Tour</option>
//                 <option value="outstation">Outstation Trip</option>
//                 <option value="tour-package">Tour Package</option>
//               </select>
//               <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             </div>

//             {/* Filters Toggle */}
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
//             >
//               <Filter className="w-4 h-4 mr-2" />
//               Filters
//             </button>
//           </div>

//           {/* Extended Filters */}
//           {showFilters && (
//             <div className="mt-4 pt-4 border-t border-gray-200">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Date From</label>
//                   <input
//                     type="date"
//                     value={dateRange.from}
//                     onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Date To</label>
//                   <input
//                     type="date"
//                     value={dateRange.to}
//                     onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//                 <div className="flex items-end">
//                   <button
//                     onClick={() => {
//                       setDateRange({from: '', to: ''});
//                       setSelectedService('all');
//                       setSearchTerm('');
//                     }}
//                     className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
//                   >
//                     Clear Filters
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Enquiries Table */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Customer
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Contact
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Trip Details
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Date & Time
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Service
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Received
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {currentEnquiries.map((enquiry) => (
//                   <tr key={enquiry._id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
//                           <User className="w-5 h-5 text-white" />
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">{enquiry.fullName}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center text-sm text-gray-900">
//                         <Phone className="w-4 h-4 mr-2 text-gray-400" />
//                         {enquiry.phoneNumber}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="text-sm text-gray-900">
//                         <div className="flex items-center mb-1">
//                           <MapPin className="w-4 h-4 mr-1 text-green-500" />
//                           <span className="font-medium">From:</span>
//                           <span className="ml-1">{enquiry.from}</span>
//                         </div>
//                         <div className="flex items-center">
//                           <MapPin className="w-4 h-4 mr-1 text-red-500" />
//                           <span className="font-medium">To:</span>
//                           <span className="ml-1">{enquiry.to}</span>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         <div className="flex items-center mb-1">
//                           <Calendar className="w-4 h-4 mr-2 text-blue-500" />
//                           {formatDate(enquiry.date)}
//                         </div>
//                         <div className="flex items-center">
//                           <Clock className="w-4 h-4 mr-2 text-purple-500" />
//                           {formatTime(enquiry.time)}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getServiceTypeColor(enquiry.serviceType)}`}>
//                         {enquiry.serviceType}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {getTimeAgo(enquiry.createdAt)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <button
//                         onClick={() => onSelectEnquiry(enquiry)}
//                         className="flex items-center text-blue-600 hover:text-blue-900 transition-colors"
//                       >
//                         <Eye className="w-4 h-4 mr-1" />
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
//               <div className="flex-1 flex justify-between sm:hidden">
//                 <button
//                   onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                   className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                   disabled={currentPage === totalPages}
//                   className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Next
//                 </button>
//               </div>
//               <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                 <div>
//                   <p className="text-sm text-gray-700">
//                     Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
//                     <span className="font-medium">{Math.min(indexOfLastItem, filteredEnquiries.length)}</span> of{' '}
//                     <span className="font-medium">{filteredEnquiries.length}</span> results
//                   </p>
//                 </div>
//                 <div>
//                   <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
//                     <button
//                       onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                       disabled={currentPage === 1}
//                       className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       Previous
//                     </button>
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                       <button
//                         key={page}
//                         onClick={() => setCurrentPage(page)}
//                         className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
//                           currentPage === page
//                             ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
//                             : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
//                         }`}
//                       >
//                         {page}
//                       </button>
//                     ))}
//                     <button
//                       onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                       disabled={currentPage === totalPages}
//                       className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       Next
//                     </button>
//                   </nav>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Empty State */}
//         {filteredEnquiries.length === 0 && !loading && (
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-12 text-center">
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <FileText className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No enquiries found</h3>
//             <p className="text-gray-600">
//               {searchTerm || selectedService !== 'all' || dateRange.from || dateRange.to
//                 ? 'Try adjusting your filters to see more results.'
//                 : 'No enquiries have been submitted yet.'}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Enquiries;



import React, { useState, useEffect } from 'react';
import { Navigation } from 'lucide-react';
import {
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  Car,
  ArrowRight,
  RefreshCw,
  FileText,
  Eye,
  ChevronDown,
  Download,
  ArrowLeft,
  UserCheck,
  MessageCircle,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ENQUIRY_API = 'http://localhost:8000/api/enquiry';

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedService, setSelectedService] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const navigate = useNavigate();

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${ENQUIRY_API}/all`, {
        withCredentials: true,
      });
      setEnquiries(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch enquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchEnquiries();
  };

  const backHandler = () => {
    navigate("/dashboard");
  };

  const onSelectEnquiry = (enquiry) => {
    navigate(`/enquiry/${enquiry._id}`);
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

  const getServiceTypeColor = (serviceType) => {
    const colors = {
      'airport-transfer': 'bg-purple-100 text-purple-800',
      'one-way': 'bg-green-100 text-green-800',
      'round-trip': 'bg-orange-100 text-orange-800',
      'local-tour': 'bg-blue-100 text-blue-800',
      'outstation': 'bg-indigo-100 text-indigo-800',
      'tour-package': 'bg-pink-100 text-pink-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    return colors[serviceType?.toLowerCase()] || colors.default;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const enquiryDate = new Date(dateString);
    const diffTime = Math.abs(now - enquiryDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return formatDate(dateString);
  };

  // Filter enquiries
  const filteredEnquiries = enquiries
    .filter(enquiry => {
      const matchesSearch = 
        enquiry.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.phoneNumber?.includes(searchTerm) ||
        enquiry.from?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.to?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesService = selectedService === 'all' || 
        enquiry.serviceType?.toLowerCase() === selectedService.toLowerCase();
      
      const matchesStatus = selectedStatus === 'all' || 
        (enquiry.status || 'Not Confirmed') === selectedStatus;
      
      const matchesDateRange = !dateRange.from || !dateRange.to ||
        (new Date(enquiry.date) >= new Date(dateRange.from) && 
         new Date(enquiry.date) <= new Date(dateRange.to));
      
      return matchesSearch && matchesService && matchesStatus && matchesDateRange;
    });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEnquiries = filteredEnquiries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);

  const exportEnquiries = () => {
    const csvContent = [
      ['ID', 'Name', 'Phone', 'From', 'To', 'Date', 'Time', 'Service Type', 'Status', 'Driver', 'Vehicle', 'Created At'],
      ...filteredEnquiries.map(enquiry => [
        `ENQ-${enquiry._id?.slice(-6).toUpperCase()}`,
        enquiry.fullName,
        enquiry.phoneNumber,
        enquiry.from,
        enquiry.to,
        formatDate(enquiry.date),
        enquiry.time,
        enquiry.serviceType,
        enquiry.status || 'Not Confirmed',
        enquiry.allocatedDriver?.name || 'Not Allocated',
        enquiry.allocatedVehicle?.carNumber || 'Not Allocated',
        new Date(enquiry.createdAt).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enquiries_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-xl font-medium text-gray-700">Loading enquiries...</p>
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
          <button
            onClick={handleRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={backHandler}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <ArrowLeft size={18} />
              <span>Back to Dashboard</span>
            </button>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Customer Enquiries
              </h1>
              <p className="text-gray-600 mt-2">
                Manage and track all customer enquiries with status tracking
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button
              onClick={exportEnquiries}
              className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button
              onClick={handleRefresh}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {['Not Confirmed', 'Confirmed', 'Ongoing', 'Completed', 'Cancelled'].map((status) => (
            <div key={status} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{status}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {enquiries.filter(e => (e.status || 'Not Confirmed') === status).length}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(status)}`}>
                  {status === 'Confirmed' && <CheckCircle className="w-6 h-6" />}
                  {status === 'Ongoing' && <Navigation className="w-6 h-6" />}
                  {status === 'Completed' && <CheckCircle className="w-6 h-6" />}
                  {status === 'Cancelled' && <X className="w-6 h-6" />}
                  {status === 'Not Confirmed' && <AlertCircle className="w-6 h-6" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Service Type Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6 mb-8">
          {/* Airport Transfer */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Airport Transfer</p>
                <p className="text-xl lg:text-3xl font-bold text-gray-900">
                  {enquiries.filter(e => e.serviceType?.toLowerCase() === 'airport-transfer').length}
                </p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
          </div>

          {/* One Way Trip */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">One Way Trip</p>
                <p className="text-xl lg:text-3xl font-bold text-gray-900">
                  {enquiries.filter(e => e.serviceType?.toLowerCase() === 'one-way').length}
                </p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <Car className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Round Trip */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Round Trip</p>
                <p className="text-xl lg:text-3xl font-bold text-gray-900">
                  {enquiries.filter(e => e.serviceType?.toLowerCase() === 'round-trip').length}
                </p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <RefreshCw className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Local Tour */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Local Tour</p>
                <p className="text-xl lg:text-3xl font-bold text-gray-900">
                  {enquiries.filter(e => e.serviceType?.toLowerCase() === 'local-tour').length}
                </p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <MapPin className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Outstation Trip */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Outstation Trip</p>
                <p className="text-xl lg:text-3xl font-bold text-gray-900">
                  {enquiries.filter(e => e.serviceType?.toLowerCase() === 'outstation').length}
                </p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <Navigation className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Tour Package */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Tour Package</p>
                <p className="text-xl lg:text-3xl font-bold text-gray-900">
                  {enquiries.filter(e => e.serviceType?.toLowerCase() === 'tour-package').length}
                </p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, phone, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Service Filter */}
            <div className="relative">
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Services</option>
                <option value="airport-transfer">Airport Transfer</option>
                <option value="one-way">One Way Trip</option>
                <option value="round-trip">Round Trip</option>
                <option value="local-tour">Local Tour</option>
                <option value="outstation">Outstation Trip</option>
                <option value="tour-package">Tour Package</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="Not Confirmed">Not Confirmed</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date From</label>
                  <input
                    type="date"
                    value={dateRange.from}
                    onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date To</label>
                  <input
                    type="date"
                    value={dateRange.to}
                    onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setDateRange({from: '', to: ''});
                      setSelectedService('all');
                      setSelectedStatus('all');
                      setSearchTerm('');
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enquiries Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID & Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trip Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service & Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Allocations
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Received
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentEnquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{enquiry.fullName}</div>
                          <div className="text-sm text-gray-500">
                            ID: ENQ-{enquiry._id?.slice(-6).toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {enquiry.phoneNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center mb-1">
                          <MapPin className="w-4 h-4 mr-1 text-green-500" />
                          <span className="font-medium">From:</span>
                          <span className="ml-1">{enquiry.from}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-red-500" />
                          <span className="font-medium">To:</span>
                          <span className="ml-1">{enquiry.to}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center mb-1">
                          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                          {formatDate(enquiry.date)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-purple-500" />
                          {formatTime(enquiry.time)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getServiceTypeColor(enquiry.serviceType)}`}>
                          {enquiry.serviceType}
                        </span>
                        <div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(enquiry.status || 'Not Confirmed')}`}>
                            {enquiry.status || 'Not Confirmed'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        {enquiry.allocatedDriver ? (
                          <div className="text-sm text-green-600 flex items-center">
                            <UserCheck className="w-4 h-4 mr-1" />
                            {enquiry.allocatedDriver.name}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400 flex items-center">
                            <UserCheck className="w-4 h-4 mr-1" />
                            No Driver
                          </div>
                        )}
                        {enquiry.allocatedVehicle ? (
                          <div className="text-sm text-green-600 flex items-center">
                            <Car className="w-4 h-4 mr-1" />
                            {enquiry.allocatedVehicle.carNumber}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400 flex items-center">
                            <Car className="w-4 h-4 mr-1" />
                            No Vehicle
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getTimeAgo(enquiry.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onSelectEnquiry(enquiry)}
                          className="flex items-center text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                        {enquiry.customerNotifications && enquiry.customerNotifications.length > 0 && (
                          <div className="flex items-center text-green-600">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            <span className="text-xs">{enquiry.customerNotifications.length}</span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(indexOfLastItem, filteredEnquiries.length)}</span> of{' '}
                    <span className="font-medium">{filteredEnquiries.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === page
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredEnquiries.length === 0 && !loading && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No enquiries found</h3>
            <p className="text-gray-600">
              {searchTerm || selectedService !== 'all' || selectedStatus !== 'all' || dateRange.from || dateRange.to
                ? 'Try adjusting your filters to see more results.'
                : 'No enquiries have been submitted yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enquiries;