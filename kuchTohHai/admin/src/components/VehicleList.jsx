// // import React, { useState, useEffect } from 'react';
// // import {
// //   ArrowLeft,
// //   Plus,
// //   Search,
// //   Filter,
// //   Edit,
// //   Trash2,
// //   Car,
// //   Calendar,
// //   Palette,
// //   FileText,
// //   Camera,
// //   AlertCircle,
// //   CheckCircle,
// //   Clock,
// //   Wrench,
// //   XCircle,
// //   User,
// //   Star,
// //   TrendingUp,
// //   DollarSign,
// //   Gauge,
// //   Shield,
// //   RefreshCw,
// //   Eye
// // } from 'lucide-react';

// // const VehicleList = ({ carId }) => {
// //   const [carData, setCarData] = useState(null);
// //   const [vehicles, setVehicles] = useState([]);
// //   const [stats, setStats] = useState({});
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [showAddForm, setShowAddForm] = useState(false);
// //   const [editingVehicle, setEditingVehicle] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [statusFilter, setStatusFilter] = useState('all');

// //   // Form state
// //   const [formData, setFormData] = useState({
// //     carNumber: '',
// //     color: '',
// //     buyingDate: '',
// //     mileage: '',
// //     lastServiceDate: '',
// //     nextServiceDate: '',
// //     insuranceExpiry: '',
// //     pucExpiry: '',
// //     fitnessExpiry: '',
// //     notes: '',
// //     assignedDriver: '',
// //     photo: null,
// //     rcPhoto: null,
// //   });

// //   useEffect(() => {
// //     if (carId) {
// //       fetchVehicleData();
// //     }
// //   }, [carId]);

// //   const fetchVehicleData = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await fetch(`http://localhost:8000/api/vehicles/car/${carId}`);
// //       if (!response.ok) throw new Error('Failed to fetch vehicle data');
      
// //       const data = await response.json();
// //       setCarData(data.car);
// //       setVehicles(data.vehicles);
// //       setStats(data.stats);
// //     } catch (err) {
// //       setError('Failed to fetch vehicle data');
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const handleFileChange = (e) => {
// //     const { name, files } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: files[0]
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     const formDataToSend = new FormData();
// //     formDataToSend.append('carId', carId);
    
// //     Object.keys(formData).forEach(key => {
// //       if (formData[key] !== null && formData[key] !== '') {
// //         formDataToSend.append(key, formData[key]);
// //       }
// //     });

// //     try {
// //       const url = editingVehicle 
// //         ? `http://localhost:8000/api/vehicles/${editingVehicle._id}` 
// //         : 'http://localhost:8000/api/vehicles';
// //       const method = editingVehicle ? 'PUT' : 'POST';
      
// //       const response = await fetch(url, {
// //         method,
// //         body: formDataToSend
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.message || 'Failed to save vehicle');
// //       }
      
// //       resetForm();
// //       fetchVehicleData();
// //     } catch (err) {
// //       setError(err.message || 'Failed to save vehicle');
// //     }
// //   };

// //   const resetForm = () => {
// //     setFormData({
// //       carNumber: '',
// //       color: '',
// //       buyingDate: '',
// //       mileage: '',
// //       lastServiceDate: '',
// //       nextServiceDate: '',
// //       insuranceExpiry: '',
// //       pucExpiry: '',
// //       fitnessExpiry: '',
// //       notes: '',
// //       assignedDriver: '',
// //       photo: null,
// //       rcPhoto: null,
// //     });
// //     setShowAddForm(false);
// //     setEditingVehicle(null);
// //   };

// //   const handleEdit = (vehicle) => {
// //     setEditingVehicle(vehicle);
// //     setFormData({
// //       carNumber: vehicle.carNumber || '',
// //       color: vehicle.color || '',
// //       buyingDate: vehicle.buyingDate?.split('T')[0] || '',
// //       mileage: vehicle.mileage || '',
// //       lastServiceDate: vehicle.lastServiceDate?.split('T')[0] || '',
// //       nextServiceDate: vehicle.nextServiceDate?.split('T')[0] || '',
// //       insuranceExpiry: vehicle.insuranceExpiry?.split('T')[0] || '',
// //       pucExpiry: vehicle.pucExpiry?.split('T')[0] || '',
// //       fitnessExpiry: vehicle.fitnessExpiry?.split('T')[0] || '',
// //       notes: vehicle.notes || '',
// //       assignedDriver: vehicle.assignedDriver?._id || '',
// //       photo: null,
// //       rcPhoto: null,
// //     });
// //     setShowAddForm(true);
// //   };

// //   const handleDelete = async (id) => {
// //     if (window.confirm('Are you sure you want to delete this vehicle?')) {
// //       try {
// //         const response = await fetch(`http://localhost:8000/api/vehicles/${id}`, {
// //           method: 'DELETE'
// //         });
        
// //         if (!response.ok) throw new Error('Failed to delete vehicle');
        
// //         fetchVehicleData();
// //       } catch (err) {
// //         setError('Failed to delete vehicle');
// //       }
// //     }
// //   };

// //   const handleStatusChange = async (id, newStatus) => {
// //     try {
// //       const response = await fetch(`http://localhost:8000/api/vehicles/${id}/status`, {
// //         method: 'PATCH',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ status: newStatus })
// //       });

// //       if (!response.ok) throw new Error('Failed to update status');
      
// //       fetchVehicleData();
// //     } catch (err) {
// //       setError('Failed to update vehicle status');
// //     }
// //   };

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case 'Available': return 'bg-green-100 text-green-800';
// //       case 'Booked': return 'bg-blue-100 text-blue-800';
// //       case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
// //       case 'Out of Service': return 'bg-red-100 text-red-800';
// //       default: return 'bg-gray-100 text-gray-800';
// //     }
// //   };

// //   const getStatusIcon = (status) => {
// //     switch (status) {
// //       case 'Available': return <CheckCircle className="w-4 h-4" />;
// //       case 'Booked': return <Car className="w-4 h-4" />;
// //       case 'Maintenance': return <Wrench className="w-4 h-4" />;
// //       case 'Out of Service': return <XCircle className="w-4 h-4" />;
// //       default: return <AlertCircle className="w-4 h-4" />;
// //     }
// //   };

// //   const filteredVehicles = vehicles.filter(vehicle => {
// //     const matchesSearch = vehicle.carNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                          vehicle.color.toLowerCase().includes(searchTerm.toLowerCase());
// //     const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
// //     return matchesSearch && matchesStatus;
// //   });

// //   const backToCars = () => {
// //     window.location.href = '/cars';
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
// //           <p className="text-xl font-medium text-gray-700">Loading vehicles...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
// //         {/* Header */}
// //         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
// //           <div className="flex items-center space-x-4">
// //             <button
// //               onClick={backToCars}
// //               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
// //             >
// //               <ArrowLeft size={18} />
// //               <span>Back to Cars</span>
// //             </button>
// //             <div>
// //               <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// //                 {carData?.name} Vehicles
// //               </h1>
// //               <p className="text-gray-600 mt-2">Manage individual vehicles of this model</p>
// //             </div>
// //           </div>
// //           <div className="flex items-center space-x-4 mt-4 md:mt-0">
// //             <button
// //               onClick={() => setShowAddForm(true)}
// //               className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
// //             >
// //               <Plus size={18} />
// //               <span>Add Vehicle</span>
// //             </button>
// //             <button
// //               onClick={fetchVehicleData}
// //               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
// //             >
// //               <RefreshCw size={18} />
// //               <span>Refresh</span>
// //             </button>
// //           </div>
// //         </div>

// //         {/* Car Info Card */}
// //         {carData && (
// //           <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
// //               <div className="flex items-center space-x-3">
// //                 <Car className="w-8 h-8 text-blue-600" />
// //                 <div>
// //                   <p className="text-sm text-gray-600">Model</p>
// //                   <p className="font-semibold">{carData.name}</p>
// //                 </div>
// //               </div>
// //               <div className="flex items-center space-x-3">
// //                 <User className="w-8 h-8 text-green-600" />
// //                 <div>
// //                   <p className="text-sm text-gray-600">Category</p>
// //                   <p className="font-semibold">{carData.category}</p>
// //                 </div>
// //               </div>
// //               <div className="flex items-center space-x-3">
// //                 <Gauge className="w-8 h-8 text-purple-600" />
// //                 <div>
// //                   <p className="text-sm text-gray-600">Seating</p>
// //                   <p className="font-semibold">{carData.seatingCapacity}</p>
// //                 </div>
// //               </div>
// //               <div className="flex items-center space-x-3">
// //                 <Star className="w-8 h-8 text-yellow-600" />
// //                 <div>
// //                   <p className="text-sm text-gray-600">Rating</p>
// //                   <p className="font-semibold">{carData.rating || 'N/A'}</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Stats Cards */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
// //           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
// //                 <p className="text-3xl font-bold text-gray-900">{stats.totalVehicles || 0}</p>
// //               </div>
// //               <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
// //                 <Car className="w-6 h-6 text-white" />
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-sm font-medium text-gray-600">Available</p>
// //                 <p className="text-3xl font-bold text-green-600">{stats.availableVehicles || 0}</p>
// //               </div>
// //               <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
// //                 <CheckCircle className="w-6 h-6 text-white" />
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-sm font-medium text-gray-600">Booked</p>
// //                 <p className="text-3xl font-bold text-blue-600">{stats.bookedVehicles || 0}</p>
// //               </div>
// //               <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
// //                 <Car className="w-6 h-6 text-white" />
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-sm font-medium text-gray-600">Maintenance</p>
// //                 <p className="text-3xl font-bold text-yellow-600">{stats.maintenanceVehicles || 0}</p>
// //               </div>
// //               <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
// //                 <Wrench className="w-6 h-6 text-white" />
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-sm font-medium text-gray-600">Total Revenue</p>
// //                 <p className="text-3xl font-bold text-purple-600">₹{stats.totalRevenue || 0}</p>
// //               </div>
// //               <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
// //                 <DollarSign className="w-6 h-6 text-white" />
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Error Alert */}
// //         {error && (
// //           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
// //             <div className="flex items-center">
// //               <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
// //               <p className="text-red-700">{error}</p>
// //               <button
// //                 onClick={() => setError(null)}
// //                 className="ml-auto text-red-500 hover:text-red-700"
// //               >
// //                 <XCircle className="w-5 h-5" />
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {/* Add/Edit Vehicle Form */}
// //         {showAddForm && (
// //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //             <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
// //               <div className="p-6 border-b border-gray-200">
// //                 <h2 className="text-2xl font-bold text-gray-900">
// //                   {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
// //                 </h2>
// //               </div>
              
// //               <form onSubmit={handleSubmit} className="p-6 space-y-6">
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   {/* Basic Information */}
// //                   <div className="space-y-4">
// //                     <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                    
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">Car Number *</label>
// //                       <input
// //                         type="text"
// //                         name="carNumber"
// //                         value={formData.carNumber}
// //                         onChange={handleInputChange}
// //                         required
// //                         placeholder="e.g., UP16AB1234"
// //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                       />
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">Color *</label>
// //                       <input
// //                         type="text"
// //                         name="color"
// //                         value={formData.color}
// //                         onChange={handleInputChange}
// //                         required
// //                         placeholder="e.g., White, Black, Silver"
// //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                       />
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">Buying Date *</label>
// //                       <input
// //                         type="date"
// //                         name="buyingDate"
// //                         value={formData.buyingDate}
// //                         onChange={handleInputChange}
// //                         required
// //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                       />
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">Current Mileage (km)</label>
// //                       <input
// //                         type="number"
// //                         name="mileage"
// //                         value={formData.mileage}
// //                         onChange={handleInputChange}
// //                         min="0"
// //                         placeholder="e.g., 15000"
// //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                       />
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Photo</label>
// //                       <input
// //                         type="file"
// //                         name="photo"
// //                         onChange={handleFileChange}
// //                         accept="image/*"
// //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                       />
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">RC Photo</label>
// //                       <input
// //                         type="file"
// //                         name="rcPhoto"
// //                         onChange={handleFileChange}
// //                         accept="image/*"
// //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* Service & Documents */}
// //                   <div className="space-y-4">
// //                     <h3 className="text-lg font-semibold text-gray-900">Service & Documents</h3>
                    
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">Last Service Date</label>
// //                       <input
// //                         type="date"
// //                         name="lastServiceDate"
// //                         value={formData.lastServiceDate}
// //                         onChange={handleInputChange}
// //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                       />
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">Next Service Date</label>
// //                       <input
// //                         type="date"
// //                         name="nextServiceDate"
// //                         value={formData.nextServiceDate}
// //                         onChange={handleInputChange}
// //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                       />
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Expiry</label>
// //                       <input
// //                         type="date"
// //                         name="insuranceExpiry"
// //                         value={formData.insuranceExpiry}
// //                         onChange={handleInputChange}
// //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                       />
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">PUC Expiry</label>
// //                       <input
// //                         type="date"
// //                         name="pucExpiry"
// //                         value={formData.pucExpiry}
// //                         onChange={handleInputChange}
// //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                       />
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">Fitness Expiry</label>
// //                       <input
// //                         type="date"
// //                         name="fitnessExpiry"
// //                         value={formData.fitnessExpiry}
// //                         onChange={handleInputChange}
// //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                       />
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
// //                       <textarea
// //                         name="notes"
// //                         value={formData.notes}
// //                         onChange={handleInputChange}
// //                         rows="3"
// //                         placeholder="Any additional notes about the vehicle..."
// //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Form Actions */}
// //                 <div className="flex justify-end space-x-4 pt-6 border-t">
// //                   <button
// //                     type="button"
// //                     onClick={resetForm}
// //                     className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button
// //                     type="submit"
// //                     className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
// //                   >
// //                     {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
// //                   </button>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>
// //         )}

// //         {/* Search and Filter */}
// //         <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
// //           <div className="flex flex-col md:flex-row gap-4">
// //             <div className="flex-1 relative">
// //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //               <input
// //                 type="text"
// //                 placeholder="Search by car number or color..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //               />
// //             </div>
// //             <div className="relative">
// //               <select
// //                 value={statusFilter}
// //                 onChange={(e) => setStatusFilter(e.target.value)}
// //                 className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //               >
// //                 <option value="all">All Status</option>
// //                 <option value="Available">Available</option>
// //                 <option value="Booked">Booked</option>
// //                 <option value="Maintenance">Maintenance</option>
// //                 <option value="Out of Service">Out of Service</option>
// //               </select>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Vehicles Grid */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {filteredVehicles.map((vehicle) => (
// //             <div key={vehicle._id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-shadow">
// //               {/* Vehicle Image */}
// //               {vehicle.photo && (
// //                 <div className="h-48 w-full overflow-hidden">
// //                   <img 
// //                     src={vehicle.photo} 
// //                     alt={vehicle.carNumber}
// //                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
// //                   />
// //                 </div>
// //               )}

// //               <div className="p-6">
// //                 {/* Header */}
// //                 <div className="flex items-center justify-between mb-4">
// //                   <h3 className="text-lg font-bold text-gray-900">{vehicle.carNumber}</h3>
// //                   <select
// //                     value={vehicle.status}
// //                     onChange={(e) => handleStatusChange(vehicle._id, e.target.value)}
// //                     className={`text-xs font-semibold rounded-full px-3 py-1 border-0 ${getStatusColor(vehicle.status)}`}
// //                   >
// //                     <option value="Available">Available</option>
// //                     <option value="Booked">Booked</option>
// //                     <option value="Maintenance">Maintenance</option>
// //                     <option value="Out of Service">Out of Service</option>
// //                   </select>
// //                 </div>

// //                 {/* Vehicle Details */}
// //                 <div className="space-y-2 mb-4">
// //                   <div className="flex items-center justify-between text-sm">
// //                     <span className="text-gray-600 flex items-center">
// //                       <Palette className="w-4 h-4 mr-1" />
// //                       Color:
// //                     </span>
// //                     <span className="font-medium">{vehicle.color}</span>
// //                   </div>
// //                   <div className="flex items-center justify-between text-sm">
// //                     <span className="text-gray-600 flex items-center">
// //                       <Calendar className="w-4 h-4 mr-1" />
// //                       Bought:
// //                     </span>
// //                     <span className="font-medium">{new Date(vehicle.buyingDate).toLocaleDateString()}</span>
// //                   </div>
// //                   <div className="flex items-center justify-between text-sm">
// //                     <span className="text-gray-600 flex items-center">
// //                       <Gauge className="w-4 h-4 mr-1" />
// //                       Mileage:
// //                     </span>
// //                     <span className="font-medium">{vehicle.mileage} km</span>
// //                   </div>
// //                   <div className="flex items-center justify-between text-sm">
// //                     <span className="text-gray-600 flex items-center">
// //                       <TrendingUp className="w-4 h-4 mr-1" />
// //                       Trips:
// //                     </span>
// //                     <span className="font-medium">{vehicle.totalTrips}</span>
// //                   </div>
// //                 </div>

// //                 {/* Driver Assignment */}
// //                 {vehicle.assignedDriver && (
// //                   <div className="bg-blue-50 rounded-lg p-3 mb-4">
// //                     <p className="text-sm text-blue-700 font-medium">
// //                       Assigned to: {vehicle.assignedDriver.name}
// //                     </p>
// //                   </div>
// //                 )}

// //                 {/* Actions */}
// //                 <div className="flex space-x-2">
// //                   <button
// //                     onClick={() => handleEdit(vehicle)}
// //                     className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
// //                   >
// //                     <Edit className="w-4 h-4 mr-1" />
// //                     Edit
// //                   </button>
// //                   <button
// //                     onClick={() => handleDelete(vehicle._id)}
// //                     className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
// //                   >
// //                     <Trash2 className="w-4 h-4 mr-1" />
// //                     Delete
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Empty State */}
// //         {filteredVehicles.length === 0 && !loading && (
// //           <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-12 text-center">
// //             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //               <Car className="w-8 h-8 text-gray-400" />
// //             </div>
// //             <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles found</h3>
// //             <p className="text-gray-600 mb-4">
// //               {searchTerm || statusFilter !== 'all'
// //                 ? 'Try adjusting your filters to see more results.'
// //                 : 'Get started by adding your first vehicle.'}
// //             </p>
// //             <button
// //               onClick={() => setShowAddForm(true)}
// //               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
// //             >
// //               Add Vehicle
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default VehicleList;



// import React, { useState, useEffect } from 'react';
// import {
//   ArrowLeft,
//   Plus,
//   Search,
//   Filter,
//   Edit,
//   Trash2,
//   Car,
//   Calendar,
//   Palette,
//   FileText,
//   Camera,
//   AlertCircle,
//   CheckCircle,
//   Clock,
//   Wrench,
//   XCircle,
//   User,
//   Star,
//   TrendingUp,
//   DollarSign,
//   Gauge,
//   Shield,
//   RefreshCw,
//   Eye
// } from 'lucide-react';

// const VehicleList = ({ carId: propCarId }) => {
//   // Extract carId from URL if not provided as prop
//   const getCarIdFromUrl = () => {
//     const path = window.location.pathname;
//     const parts = path.split('/');
//     return parts[parts.length - 1]; // Get the last part of the URL
//   };

//   const carId = propCarId || getCarIdFromUrl();
  
//   const [carData, setCarData] = useState(null);
//   const [vehicles, setVehicles] = useState([]);
//   const [stats, setStats] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [editingVehicle, setEditingVehicle] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');

//   // Form state
//   const [formData, setFormData] = useState({
//     carNumber: '',
//     color: '',
//     buyingDate: '',
//     mileage: '',
//     lastServiceDate: '',
//     nextServiceDate: '',
//     insuranceExpiry: '',
//     pucExpiry: '',
//     fitnessExpiry: '',
//     notes: '',
//     assignedDriver: '',
//     photo: null,
//     rcPhoto: null,
//   });

//   useEffect(() => {
//     if (carId) {
//       fetchVehicleData();
//     } else {
//       setError('No car ID found in URL');
//       setLoading(false);
//     }
//   }, [carId]);

//   const fetchVehicleData = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`http://localhost:8000/api/vehicles/car/${carId}`);
//       if (!response.ok) throw new Error('Failed to fetch vehicle data');
      
//       const data = await response.json();
//       setCarData(data.car);
//       setVehicles(data.vehicles);
//       setStats(data.stats);
//     } catch (err) {
//       setError('Failed to fetch vehicle data');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: files[0]
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const formDataToSend = new FormData();
//     formDataToSend.append('carId', carId);
    
//     Object.keys(formData).forEach(key => {
//       if (formData[key] !== null && formData[key] !== '') {
//         formDataToSend.append(key, formData[key]);
//       }
//     });

//     try {
//       const url = editingVehicle 
//         ? `http://localhost:8000/api/vehicles/${editingVehicle._id}` 
//         : 'http://localhost:8000/api/vehicles';
//       const method = editingVehicle ? 'PUT' : 'POST';
      
//       const response = await fetch(url, {
//         method,
//         body: formDataToSend
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to save vehicle');
//       }
      
//       resetForm();
//       fetchVehicleData();
//     } catch (err) {
//       setError(err.message || 'Failed to save vehicle');
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       carNumber: '',
//       color: '',
//       buyingDate: '',
//       mileage: '',
//       lastServiceDate: '',
//       nextServiceDate: '',
//       insuranceExpiry: '',
//       pucExpiry: '',
//       fitnessExpiry: '',
//       notes: '',
//       assignedDriver: '',
//       photo: null,
//       rcPhoto: null,
//     });
//     setShowAddForm(false);
//     setEditingVehicle(null);
//   };

//   const handleEdit = (vehicle) => {
//     setEditingVehicle(vehicle);
//     setFormData({
//       carNumber: vehicle.carNumber || '',
//       color: vehicle.color || '',
//       buyingDate: vehicle.buyingDate?.split('T')[0] || '',
//       mileage: vehicle.mileage || '',
//       lastServiceDate: vehicle.lastServiceDate?.split('T')[0] || '',
//       nextServiceDate: vehicle.nextServiceDate?.split('T')[0] || '',
//       insuranceExpiry: vehicle.insuranceExpiry?.split('T')[0] || '',
//       pucExpiry: vehicle.pucExpiry?.split('T')[0] || '',
//       fitnessExpiry: vehicle.fitnessExpiry?.split('T')[0] || '',
//       notes: vehicle.notes || '',
//       assignedDriver: vehicle.assignedDriver?._id || '',
//       photo: null,
//       rcPhoto: null,
//     });
//     setShowAddForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this vehicle?')) {
//       try {
//         const response = await fetch(`http://localhost:8000/api/vehicles/${id}`, {
//           method: 'DELETE'
//         });
        
//         if (!response.ok) throw new Error('Failed to delete vehicle');
        
//         fetchVehicleData();
//       } catch (err) {
//         setError('Failed to delete vehicle');
//       }
//     }
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       const response = await fetch(`http://localhost:8000/api/vehicles/${id}/status`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status: newStatus })
//       });

//       if (!response.ok) throw new Error('Failed to update status');
      
//       fetchVehicleData();
//     } catch (err) {
//       setError('Failed to update vehicle status');
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Available': return 'bg-green-100 text-green-800';
//       case 'Booked': return 'bg-blue-100 text-blue-800';
//       case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
//       case 'Out of Service': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'Available': return <CheckCircle className="w-4 h-4" />;
//       case 'Booked': return <Car className="w-4 h-4" />;
//       case 'Maintenance': return <Wrench className="w-4 h-4" />;
//       case 'Out of Service': return <XCircle className="w-4 h-4" />;
//       default: return <AlertCircle className="w-4 h-4" />;
//     }
//   };

//   const filteredVehicles = vehicles.filter(vehicle => {
//     const matchesSearch = vehicle.carNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          vehicle.color.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const backToCars = () => {
//     window.location.href = '/cars';
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
//           <p className="text-xl font-medium text-gray-700">Loading vehicles...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={backToCars}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
//             >
//               <ArrowLeft size={18} />
//               <span>Back to Cars</span>
//             </button>
//             <div>
//               <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 {carData?.name} Vehicles
//               </h1>
//               <p className="text-gray-600 mt-2">Manage individual vehicles of this model</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4 mt-4 md:mt-0">
//             <button
//               onClick={() => setShowAddForm(true)}
//               className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
//             >
//               <Plus size={18} />
//               <span>Add Vehicle</span>
//             </button>
//             <button
//               onClick={fetchVehicleData}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
//             >
//               <RefreshCw size={18} />
//               <span>Refresh</span>
//             </button>
//           </div>
//         </div>

//         {/* Car Info Card */}
//         {carData && (
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               <div className="flex items-center space-x-3">
//                 <Car className="w-8 h-8 text-blue-600" />
//                 <div>
//                   <p className="text-sm text-gray-600">Model</p>
//                   <p className="font-semibold">{carData.name}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <User className="w-8 h-8 text-green-600" />
//                 <div>
//                   <p className="text-sm text-gray-600">Category</p>
//                   <p className="font-semibold">{carData.category}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Gauge className="w-8 h-8 text-purple-600" />
//                 <div>
//                   <p className="text-sm text-gray-600">Seating</p>
//                   <p className="font-semibold">{carData.seatingCapacity}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Star className="w-8 h-8 text-yellow-600" />
//                 <div>
//                   <p className="text-sm text-gray-600">Rating</p>
//                   <p className="font-semibold">{carData.rating || 'N/A'}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
//                 <p className="text-3xl font-bold text-gray-900">{stats.totalVehicles || 0}</p>
//               </div>
//               <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
//                 <Car className="w-6 h-6 text-white" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Available</p>
//                 <p className="text-3xl font-bold text-green-600">{stats.availableVehicles || 0}</p>
//               </div>
//               <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
//                 <CheckCircle className="w-6 h-6 text-white" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Booked</p>
//                 <p className="text-3xl font-bold text-blue-600">{stats.bookedVehicles || 0}</p>
//               </div>
//               <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
//                 <Car className="w-6 h-6 text-white" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Maintenance</p>
//                 <p className="text-3xl font-bold text-yellow-600">{stats.maintenanceVehicles || 0}</p>
//               </div>
//               <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
//                 <Wrench className="w-6 h-6 text-white" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Revenue</p>
//                 <p className="text-3xl font-bold text-purple-600">₹{stats.totalRevenue || 0}</p>
//               </div>
//               <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
//                 <DollarSign className="w-6 h-6 text-white" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Error Alert */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//             <div className="flex items-center">
//               <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
//               <p className="text-red-700">{error}</p>
//               <button
//                 onClick={() => setError(null)}
//                 className="ml-auto text-red-500 hover:text-red-700"
//               >
//                 <XCircle className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Add/Edit Vehicle Form */}
//         {showAddForm && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200">
//                 <h2 className="text-2xl font-bold text-gray-900">
//                   {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
//                 </h2>
//               </div>
              
//               <form onSubmit={handleSubmit} className="p-6 space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Basic Information */}
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Car Number *</label>
//                       <input
//                         type="text"
//                         name="carNumber"
//                         value={formData.carNumber}
//                         onChange={handleInputChange}
//                         required
//                         placeholder="e.g., UP16AB1234"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Color *</label>
//                       <input
//                         type="text"
//                         name="color"
//                         value={formData.color}
//                         onChange={handleInputChange}
//                         required
//                         placeholder="e.g., White, Black, Silver"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Buying Date *</label>
//                       <input
//                         type="date"
//                         name="buyingDate"
//                         value={formData.buyingDate}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Current Mileage (km)</label>
//                       <input
//                         type="number"
//                         name="mileage"
//                         value={formData.mileage}
//                         onChange={handleInputChange}
//                         min="0"
//                         placeholder="e.g., 15000"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Photo</label>
//                       <input
//                         type="file"
//                         name="photo"
//                         onChange={handleFileChange}
//                         accept="image/*"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">RC Photo</label>
//                       <input
//                         type="file"
//                         name="rcPhoto"
//                         onChange={handleFileChange}
//                         accept="image/*"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     </div>
//                   </div>

//                   {/* Service & Documents */}
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-semibold text-gray-900">Service & Documents</h3>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Last Service Date</label>
//                       <input
//                         type="date"
//                         name="lastServiceDate"
//                         value={formData.lastServiceDate}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Next Service Date</label>
//                       <input
//                         type="date"
//                         name="nextServiceDate"
//                         value={formData.nextServiceDate}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Expiry</label>
//                       <input
//                         type="date"
//                         name="insuranceExpiry"
//                         value={formData.insuranceExpiry}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">PUC Expiry</label>
//                       <input
//                         type="date"
//                         name="pucExpiry"
//                         value={formData.pucExpiry}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Fitness Expiry</label>
//                       <input
//                         type="date"
//                         name="fitnessExpiry"
//                         value={formData.fitnessExpiry}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
//                       <textarea
//                         name="notes"
//                         value={formData.notes}
//                         onChange={handleInputChange}
//                         rows="3"
//                         placeholder="Any additional notes about the vehicle..."
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Form Actions */}
//                 <div className="flex justify-end space-x-4 pt-6 border-t">
//                   <button
//                     type="button"
//                     onClick={resetForm}
//                     className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Search and Filter */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search by car number or color..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//             <div className="relative">
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="all">All Status</option>
//                 <option value="Available">Available</option>
//                 <option value="Booked">Booked</option>
//                 <option value="Maintenance">Maintenance</option>
//                 <option value="Out of Service">Out of Service</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Vehicles Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredVehicles.map((vehicle) => (
//             <div key={vehicle._id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-shadow">
//               {/* Vehicle Image */}
//               {vehicle.photo && (
//                 <div className="h-48 w-full overflow-hidden">
//                   <img 
//                     src={vehicle.photo} 
//                     alt={vehicle.carNumber}
//                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
//                   />
//                 </div>
//               )}

//               <div className="p-6">
//                 {/* Header */}
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-lg font-bold text-gray-900">{vehicle.carNumber}</h3>
//                   <select
//                     value={vehicle.status}
//                     onChange={(e) => handleStatusChange(vehicle._id, e.target.value)}
//                     className={`text-xs font-semibold rounded-full px-3 py-1 border-0 ${getStatusColor(vehicle.status)}`}
//                   >
//                     <option value="Available">Available</option>
//                     <option value="Booked">Booked</option>
//                     <option value="Maintenance">Maintenance</option>
//                     <option value="Out of Service">Out of Service</option>
//                   </select>
//                 </div>

//                 {/* Vehicle Details */}
//                 <div className="space-y-2 mb-4">
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-gray-600 flex items-center">
//                       <Palette className="w-4 h-4 mr-1" />
//                       Color:
//                     </span>
//                     <span className="font-medium">{vehicle.color}</span>
//                   </div>
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-gray-600 flex items-center">
//                       <Calendar className="w-4 h-4 mr-1" />
//                       Bought:
//                     </span>
//                     <span className="font-medium">{new Date(vehicle.buyingDate).toLocaleDateString()}</span>
//                   </div>
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-gray-600 flex items-center">
//                       <Gauge className="w-4 h-4 mr-1" />
//                       Mileage:
//                     </span>
//                     <span className="font-medium">{vehicle.mileage} km</span>
//                   </div>
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-gray-600 flex items-center">
//                       <TrendingUp className="w-4 h-4 mr-1" />
//                       Trips:
//                     </span>
//                     <span className="font-medium">{vehicle.totalTrips}</span>
//                   </div>
//                 </div>

//                 {/* Driver Assignment */}
//                 {vehicle.assignedDriver && (
//                   <div className="bg-blue-50 rounded-lg p-3 mb-4">
//                     <p className="text-sm text-blue-700 font-medium">
//                       Assigned to: {vehicle.assignedDriver.name}
//                     </p>
//                   </div>
//                 )}

//                 {/* Actions */}
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => handleEdit(vehicle)}
//                     className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
//                   >
//                     <Edit className="w-4 h-4 mr-1" />
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(vehicle._id)}
//                     className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
//                   >
//                     <Trash2 className="w-4 h-4 mr-1" />
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredVehicles.length === 0 && !loading && (
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-12 text-center">
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Car className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles found</h3>
//             <p className="text-gray-600 mb-4">
//               {searchTerm || statusFilter !== 'all'
//                 ? 'Try adjusting your filters to see more results.'
//                 : 'Get started by adding your first vehicle.'}
//             </p>
//             <button
//               onClick={() => setShowAddForm(true)}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//             >
//               Add Vehicle
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VehicleList;



import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Plus,
  Search,
  Edit,
  Trash2,
  Car,
  Calendar,
  Palette,
  AlertCircle,
  CheckCircle,
  Clock,
  Wrench,
  XCircle,
  User,
  Star,
  TrendingUp,
  DollarSign,
  Gauge,
  RefreshCw
} from 'lucide-react';

const VehicleList = () => {
  // Extract carId from URL
  const getCarIdFromUrl = () => {
    const path = window.location.pathname;
    const parts = path.split('/');
    return parts[parts.length - 1]; // Get the last part of the URL
  };

  const carId = getCarIdFromUrl();
  
  const [carData, setCarData] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Form state
  const [formData, setFormData] = useState({
    carNumber: '',
    color: '',
    buyingDate: '',
    mileage: '',
    lastServiceDate: '',
    nextServiceDate: '',
    insuranceExpiry: '',
    pucExpiry: '',
    fitnessExpiry: '',
    notes: '',
    assignedDriver: '',
    photo: null,
    rcPhoto: null,
  });

  useEffect(() => {
    console.log('Car ID from URL:', carId);
    if (carId && carId !== 'vehicles') {
      fetchVehicleData();
    } else {
      setError('Invalid car ID in URL');
      setLoading(false);
    }
  }, [carId]);

  const fetchVehicleData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching data for car ID:', carId);
      const response = await fetch(`http://localhost:8000/api/vehicles/car/${carId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched data:', data);
      
      setCarData(data.car);
      setVehicles(data.vehicles || []);
      setStats(data.stats || {});
    } catch (err) {
      console.error('Error fetching vehicle data:', err);
      setError('Failed to fetch vehicle data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('carId', carId);
    
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== '') {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const url = editingVehicle 
        ? `http://localhost:8000/api/vehicles/${editingVehicle._id}` 
        : 'http://localhost:8000/api/vehicles';
      const method = editingVehicle ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        body: formDataToSend
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save vehicle');
      }
      
      resetForm();
      fetchVehicleData();
    } catch (err) {
      setError(err.message || 'Failed to save vehicle');
    }
  };

  const resetForm = () => {
    setFormData({
      carNumber: '',
      color: '',
      buyingDate: '',
      mileage: '',
      lastServiceDate: '',
      nextServiceDate: '',
      insuranceExpiry: '',
      pucExpiry: '',
      fitnessExpiry: '',
      notes: '',
      assignedDriver: '',
      photo: null,
      rcPhoto: null,
    });
    setShowAddForm(false);
    setEditingVehicle(null);
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      carNumber: vehicle.carNumber || '',
      color: vehicle.color || '',
      buyingDate: vehicle.buyingDate?.split('T')[0] || '',
      mileage: vehicle.mileage || '',
      lastServiceDate: vehicle.lastServiceDate?.split('T')[0] || '',
      nextServiceDate: vehicle.nextServiceDate?.split('T')[0] || '',
      insuranceExpiry: vehicle.insuranceExpiry?.split('T')[0] || '',
      pucExpiry: vehicle.pucExpiry?.split('T')[0] || '',
      fitnessExpiry: vehicle.fitnessExpiry?.split('T')[0] || '',
      notes: vehicle.notes || '',
      assignedDriver: vehicle.assignedDriver?._id || '',
      photo: null,
      rcPhoto: null,
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        const response = await fetch(`http://localhost:8000/api/vehicles/${id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Failed to delete vehicle');
        
        fetchVehicleData();
      } catch (err) {
        setError('Failed to delete vehicle');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8000/api/vehicles/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error('Failed to update status');
      
      fetchVehicleData();
    } catch (err) {
      setError('Failed to update vehicle status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Booked': return 'bg-blue-100 text-blue-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Service': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.carNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.color.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const backToCars = () => {
    window.location.href = '/cars';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-xl font-medium text-gray-700">Loading vehicles...</p>
          <p className="text-sm text-gray-500 mt-2">Car ID: {carId}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-xl font-semibold text-red-600 mb-2">Error</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500 mb-4">Car ID: {carId}</p>
          <button
            onClick={fetchVehicleData}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors mr-2"
          >
            Retry
          </button>
          <button
            onClick={backToCars}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Back to Cars
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
              onClick={backToCars}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <ArrowLeft size={18} />
              <span>Back to Cars</span>
            </button>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {carData?.name || 'Vehicle'} Fleet
              </h1>
              <p className="text-gray-600 mt-2">Manage individual vehicles of this model</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Plus size={18} />
              <span>Add Vehicle</span>
            </button>
            <button
              onClick={fetchVehicleData}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <RefreshCw size={18} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Car Info Card */}
        {carData && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <Car className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Model</p>
                  <p className="font-semibold">{carData.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <User className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-semibold">{carData.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Gauge className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Seating</p>
                  <p className="font-semibold">{carData.seatingCapacity}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-8 h-8 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="font-semibold">{carData.rating || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalVehicles || 0}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-3xl font-bold text-green-600">{stats.availableVehicles || 0}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Booked</p>
                <p className="text-3xl font-bold text-blue-600">{stats.bookedVehicles || 0}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Maintenance</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.maintenanceVehicles || 0}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <Wrench className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-purple-600">₹{stats.totalRevenue || 0}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by car number or color..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Out of Service">Out of Service</option>
              </select>
            </div>
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle._id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-shadow">
              {/* Vehicle Image */}
              {vehicle.photo && (
                <div className="h-48 w-full overflow-hidden">
                  <img 
                    src={vehicle.photo} 
                    alt={vehicle.carNumber}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  />
                </div>
              )}

              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{vehicle.carNumber}</h3>
                  <select
                    value={vehicle.status}
                    onChange={(e) => handleStatusChange(vehicle._id, e.target.value)}
                    className={`text-xs font-semibold rounded-full px-3 py-1 border-0 ${getStatusColor(vehicle.status)}`}
                  >
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Out of Service">Out of Service</option>
                  </select>
                </div>

                {/* Vehicle Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Palette className="w-4 h-4 mr-1" />
                      Color:
                    </span>
                    <span className="font-medium">{vehicle.color}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Bought:
                    </span>
                    <span className="font-medium">{new Date(vehicle.buyingDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Gauge className="w-4 h-4 mr-1" />
                      Mileage:
                    </span>
                    <span className="font-medium">{vehicle.mileage} km</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Trips:
                    </span>
                    <span className="font-medium">{vehicle.totalTrips}</span>
                  </div>
                </div>

                {/* Driver Assignment */}
                {vehicle.assignedDriver && (
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-blue-700 font-medium">
                      Assigned to: {vehicle.assignedDriver.name}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(vehicle)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(vehicle._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Vehicle Form (simplified for space) */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Car Number *</label>
                    <input
                      type="text"
                      name="carNumber"
                      value={formData.carNumber}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., UP16AB1234"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color *</label>
                    <input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., White, Black, Silver"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Buying Date *</label>
                    <input
                      type="date"
                      name="buyingDate"
                      value={formData.buyingDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Mileage (km)</label>
                    <input
                      type="number"
                      name="mileage"
                      value={formData.mileage}
                      onChange={handleInputChange}
                      min="0"
                      placeholder="e.g., 15000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Photo</label>
                    <input
                      type="file"
                      name="photo"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">RC Photo</label>
                    <input
                      type="file"
                      name="rcPhoto"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Any additional notes about the vehicle..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredVehicles.length === 0 && !loading && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your filters to see more results.'
                : 'Get started by adding your first vehicle.'}
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Add Vehicle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleList;