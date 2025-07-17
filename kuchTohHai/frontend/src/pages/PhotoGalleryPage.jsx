import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, MapPin, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const PhotoGalleryPage = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample gallery data - replace with your actual images
  const galleryImages = [
    {
      id: 1,
      url: '/api/placeholder/400/300',
      title: 'Luxury Car Fleet',
      category: 'vehicles',
      location: 'Mathura',
      date: '2024'
    },
    {
      id: 2,
      url: '/api/placeholder/400/300',
      title: 'Golden Triangle Tour',
      category: 'tours',
      location: 'Delhi-Agra-Jaipur',
      date: '2024'
    },
    {
      id: 3,
      url: '/api/placeholder/400/300',
      title: 'Tempo Traveller',
      category: 'vehicles',
      location: 'Mathura',
      date: '2024'
    },
    {
      id: 4,
      url: '/api/placeholder/400/300',
      title: 'Taj Mahal Visit',
      category: 'tours',
      location: 'Agra',
      date: '2024'
    },
    {
      id: 5,
      url: '/api/placeholder/400/300',
      title: 'SUV Collection',
      category: 'vehicles',
      location: 'Mathura',
      date: '2024'
    },
    {
      id: 6,
      url: '/api/placeholder/400/300',
      title: 'Vrindavan Darshan',
      category: 'tours',
      location: 'Vrindavan',
      date: '2024'
    },
    {
      id: 7,
      url: '/api/placeholder/400/300',
      title: 'Premium Sedan',
      category: 'vehicles',
      location: 'Mathura',
      date: '2024'
    },
    {
      id: 8,
      url: '/api/placeholder/400/300',
      title: 'Mathura Krishna Janmabhoomi',
      category: 'tours',
      location: 'Mathura',
      date: '2024'
    },
    {
      id: 9,
      url: '/api/placeholder/400/300',
      title: 'Mini Bus',
      category: 'vehicles',
      location: 'Mathura',
      date: '2024'
    },
    {
      id: 10,
      url: '/api/placeholder/400/300',
      title: 'Rajasthan Tour',
      category: 'tours',
      location: 'Rajasthan',
      date: '2024'
    },
    {
      id: 11,
      url: '/api/placeholder/400/300',
      title: 'Customer Service',
      category: 'service',
      location: 'Mathura Office',
      date: '2024'
    },
    {
      id: 12,
      url: '/api/placeholder/400/300',
      title: 'Happy Customers',
      category: 'service',
      location: 'Various Locations',
      date: '2024'
    }
  ];

  const categories = [
    { id: 'all', name: t('all') || 'All', count: galleryImages.length },
    { id: 'vehicles', name: t('vehicles') || 'Vehicles', count: galleryImages.filter(img => img.category === 'vehicles').length },
    { id: 'tours', name: t('tours') || 'Tours', count: galleryImages.filter(img => img.category === 'tours').length },
    { id: 'service', name: t('service') || 'Service', count: galleryImages.filter(img => img.category === 'service').length }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Camera className="w-8 h-8 text-red-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">
              {t('photoGallery') || 'Photo Gallery'}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('galleryDescription') || 'Explore our collection of vehicles, tour destinations, and memorable moments with our satisfied customers.'}
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 shadow-md'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Image Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
              onClick={() => openModal(image)}
            >
              <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{image.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {image.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  {image.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image */}
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-full object-contain"
            />

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <h3 className="text-xl font-bold text-white mb-2">{selectedImage.title}</h3>
              <div className="flex items-center text-gray-300 mb-1">
                <MapPin className="w-4 h-4 mr-2" />
                {selectedImage.location}
              </div>
              <div className="flex items-center text-gray-300">
                <Calendar className="w-4 h-4 mr-2" />
                {selectedImage.date}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGalleryPage;