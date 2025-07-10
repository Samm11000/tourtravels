import React from 'react';
import { Plane, ArrowRight, RotateCcw, MapPin, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Plane,
      title: t('airportTransfers'),
      description: t('airportTransfersDesc'),
      color: 'bg-blue-100 text-blue-700'
    },
    {
      icon: ArrowRight,
      title: t('oneWayTrips'),
      description: t('oneWayTripsDesc'),
      color: 'bg-emerald-100 text-emerald-700'
    },
    {
      icon: RotateCcw,
      title: t('roundTripService'),
      description: t('roundTripDesc'),
      color: 'bg-purple-100 text-purple-700'
    },
    {
      icon: MapPin,
      title: t('localOutstation'),
      description: t('localOutstationDesc'),
      color: 'bg-orange-100 text-orange-700'
    },
    {
      icon: Heart,
      title: 'Wedding Transportation',
      description: 'Special Bus Bookings for Weddings',
      color: 'bg-pink-100 text-pink-700'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('ourServices')}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('servicesSubtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 p-8 text-center group">
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;