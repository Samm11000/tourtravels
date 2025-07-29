
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_API } from "./utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setAuthUser } from './redux/authSlice';
import useGetAllCars from "./hooks/useGetAllCars";
import { DRIVER_API } from "./utils/constants";
// const DRIVER_API = 'http://localhost:8000/api/drivers';

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [driverStats, setDriverStats] = useState({});

  const { cars } = useSelector((store) => store.car);
  const { loading, error } = useGetAllCars();

  useEffect(() => {
    fetchDriverStats();
  }, []);

  const fetchDriverStats = async () => {
    try {
      const response = await axios.get(`${DRIVER_API}/stats`);
      setDriverStats(response.data);
    } catch (error) {
      console.error('Failed to fetch driver stats:', error);
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));

      await axios.post(`${AUTH_API}/logout`);

      dispatch(setAuthUser(null)); // Clear user from Redux
      dispatch(setLoading(false));

      navigate('/login');
    } catch (error) {
      dispatch(setLoading(false));
      console.error('Logout failed:', error);
      alert('Logout failed. Try again.');
    }
  };

  const dashboardItems = [
    {
      title: "Cars",
      description: "Manage vehicle inventory and listings",
      icon: "🚗",
      route: "/cars",
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
      stats: `${cars.length} Active`,
    },
    {
      title: "Drivers",
      description: "Manage driver workforce and assignments",
      icon: "👨‍✈️",
      route: "/drivers",
      color: "from-emerald-500 to-emerald-600",
      hoverColor: "hover:from-emerald-600 hover:to-emerald-700",
      stats: `${driverStats.activeDrivers || 0} Active`,
    },
    {
      title: "Enquiries",
      description: "View and manage customer inquiries",
      icon: "📋",
      route: "/enquiry",
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700",
      stats: "12 New",
    },
    {
      title: "Packages",
      description: "Configure service packages and pricing",
      icon: "📦",
      route: "/packages",
      color: "from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700",
      stats: "8 Available",
    },
  ];

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your business operations
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                System Online
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-2">Welcome back, Admin!</h2>
            <p className="text-blue-100">
              Here's what's happening with your business today.
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$24,580</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <span className="text-green-600 text-xl">💰</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Drivers</p>
                <p className="text-2xl font-bold text-gray-900">{driverStats.activeDrivers || 0}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <span className="text-blue-600 text-xl">👨‍✈️</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Trips</p>
                <p className="text-2xl font-bold text-gray-900">{driverStats.totalTrips || 0}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <span className="text-purple-600 text-xl">🚗</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">94.2%</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <span className="text-yellow-600 text-xl">📈</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.route)}
                className={`bg-gradient-to-r ${item.color} ${item.hoverColor} text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-left group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 group-hover:bg-white/30 transition-colors">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-sm font-medium">{item.stats}</span>
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-white/80 text-sm">{item.description}</p>
                <div className="mt-4 flex items-center text-sm font-medium">
                  <span>Manage {item.title.toLowerCase()}</span>
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">
                  New driver added to fleet
                </p>
                <p className="text-gray-600 text-sm">
                  Rajesh Kumar - License verified - 3 minutes ago
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">
                  Trip completed successfully
                </p>
                <p className="text-gray-600 text-sm">
                  Airport pickup - 4.8 star rating - 8 minutes ago
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">
                  New car listing added
                </p>
                <p className="text-gray-600 text-sm">
                  Toyota Camry 2024 - 12 minutes ago
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">
                  Customer inquiry received
                </p>
                <p className="text-gray-600 text-sm">
                  Outstation trip inquiry - 15 minutes ago
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">
                  Driver status updated
                </p>
                <p className="text-gray-600 text-sm">
                  Amit Singh - Status changed to Active - 20 minutes ago
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">
                  Package pricing updated
                </p>
                <p className="text-gray-600 text-sm">
                  Premium tour package - New rates applied - 25 minutes ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;