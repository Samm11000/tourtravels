import React, { useState } from 'react';
import { Clock, Star, ArrowLeft, Filter, Search, MapPin } from 'lucide-react';

const ExplorePackages = ({ onBack, onPackageClick }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const allPackages = [
    {
      id: 1,
      title: "Golden Triangle Tour",
      duration: "6 Days / 5 Nights",
      price: "₹25,000",
      originalPrice: "₹30,000",
      image: "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=400",
      highlights: ["Delhi", "Agra", "Jaipur", "Taj Mahal"],
      rating: 4.8,
      category: "heritage",
      description: "Explore India's most iconic destinations in this classic tour covering Delhi, Agra, and Jaipur."
    },
    {
      id: 2,
      title: "Kerala Backwaters",
      duration: "5 Days / 4 Nights",
      price: "₹18,000",
      originalPrice: "₹22,000",
      image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=400",
      highlights: ["Alleppey", "Kumarakom", "Houseboat", "Spice Gardens"],
      rating: 4.9,
      category: "nature",
      description: "Experience the serene backwaters of Kerala with houseboat stays and spice plantation visits."
    },
    {
      id: 3,
      title: "Goa Beach Holiday",
      duration: "4 Days / 3 Nights",
      price: "₹15,000",
      originalPrice: "₹18,000",
      image: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=400",
      highlights: ["North Goa", "South Goa", "Water Sports", "Nightlife"],
      rating: 4.7,
      category: "beach",
      description: "Relax on pristine beaches and enjoy water sports in India's premier beach destination."
    },
    {
      id: 4,
      title: "Rajasthan Heritage",
      duration: "8 Days / 7 Nights",
      price: "₹35,000",
      originalPrice: "₹42,000",
      image: "https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=400",
      highlights: ["Udaipur", "Jodhpur", "Jaisalmer", "Desert Safari"],
      rating: 4.9,
      category: "heritage",
      description: "Discover the royal heritage of Rajasthan with palace stays and desert adventures."
    },
    {
      id: 5,
      title: "Himachal Adventure",
      duration: "7 Days / 6 Nights",
      price: "₹22,000",
      originalPrice: "₹28,000",
      image: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400",
      highlights: ["Manali", "Shimla", "Rohtang Pass", "Adventure Sports"],
      rating: 4.6,
      category: "adventure",
      description: "Experience thrilling adventures in the beautiful mountains of Himachal Pradesh."
    },
    {
      id: 6,
      title: "Kashmir Paradise",
      duration: "6 Days / 5 Nights",
      price: "₹28,000",
      originalPrice: "₹35,000",
      image: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400",
      highlights: ["Srinagar", "Gulmarg", "Pahalgam", "Dal Lake"],
      rating: 4.8,
      category: "nature",
      description: "Explore the breathtaking beauty of Kashmir, often called 'Paradise on Earth'."
    },
    {
      id: 7,
      title: "South India Temple Tour",
      duration: "9 Days / 8 Nights",
      price: "₹32,000",
      originalPrice: "₹38,000",
      image: "https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=400",
      highlights: ["Chennai", "Madurai", "Thanjavur", "Kanchipuram"],
      rating: 4.7,
      category: "heritage",
      description: "Discover the rich temple architecture and cultural heritage of South India."
    },
    {
      id: 8,
      title: "Andaman Islands",
      duration: "5 Days / 4 Nights",
      price: "₹35,000",
      originalPrice: "₹42,000",
      image: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=400",
      highlights: ["Port Blair", "Havelock", "Neil Island", "Scuba Diving"],
      rating: 4.9,
      category: "beach",
      description: "Experience pristine beaches and underwater adventures in the Andaman Islands."
    },
    {
      id: 9,
      title: "Ladakh Expedition",
      duration: "8 Days / 7 Nights",
      price: "₹45,000",
      originalPrice: "₹55,000",
      image: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400",
      highlights: ["Leh", "Nubra Valley", "Pangong Lake", "Monasteries"],
      rating: 4.8,
      category: "adventure",
      description: "Embark on an epic journey to the high-altitude desert of Ladakh."
    }
  ];

  const categories = [
    { id: 'all', name: 'All Packages' },
    { id: 'heritage', name: 'Heritage' },
    { id: 'nature', name: 'Nature' },
    { id: 'beach', name: 'Beach' },
    { id: 'adventure', name: 'Adventure' }
  ];

  const filteredPackages = allPackages.filter(pkg => {
    const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.highlights.some(highlight => highlight.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Explore Tour Packages</h1>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search packages or destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-blue-700 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Package Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map(pkg => (
            <div key={pkg.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {pkg.price}
                </div>
                <div className="absolute top-4 left-4 bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                  <span className="line-through text-gray-500">{pkg.originalPrice}</span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center bg-white bg-opacity-90 px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                  <span className="text-sm font-medium">{pkg.rating}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.title}</h3>
                <p className="text-gray-600 mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {pkg.duration}
                </p>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pkg.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {pkg.highlights.map((highlight, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {highlight}
                    </span>
                  ))}
                </div>
                
                <button 
                  onClick={() => onPackageClick(pkg.id)}
                  className="w-full bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800 transition-colors font-semibold"
                >
                  View Details & Book
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No packages found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePackages;