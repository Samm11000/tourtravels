// import React from 'react';
// import { Shield, Headphones, DollarSign, Heart, Users, Clock } from 'lucide-react';
// import { useLanguage } from '../contexts/LanguageContext';

// const WhyChooseUsSection = () => {
//   const { t } = useLanguage();

//   const features = [
//     {
//       icon: Shield,
//       title: t('safeSecure'),
//       description: t('safeSecureDesc'),
//       color: 'bg-blue-100 text-blue-700'
//     },
//     {
//       icon: Headphones,
//       title: t('support24x7'),
//       description: t('support24x7Desc'),
//       color: 'bg-emerald-100 text-emerald-700'
//     },
//     {
//       icon: DollarSign,
//       title: t('bestRates'),
//       description: t('bestRatesDesc'),
//       color: 'bg-purple-100 text-purple-700'
//     },
//     {
//       icon: Heart,
//       title: t('customerFirst'),
//       description: t('customerFirstDesc'),
//       color: 'bg-red-100 text-red-700'
//     },
//     {
//       icon: Users,
//       title: t('expertDrivers'),
//       description: t('expertDriversDesc'),
//       color: 'bg-orange-100 text-orange-700'
//     },
//     {
//       icon: Clock,
//       title: t('quickBooking'),
//       description: t('quickBookingDesc'),
//       color: 'bg-indigo-100 text-indigo-700'
//     }
//   ];

//   return (
//     <section id="why-choose-us" className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('whyChooseUs')}</h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             {t('whyChooseUsSubtitle')}
//           </p>
//         </div>
        
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 p-8 group">
//               <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
//                 <feature.icon className="w-8 h-8" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
//               <p className="text-gray-600 leading-relaxed">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUsSection;




import React from 'react';
import { Shield, Headphones, DollarSign, Heart, Users, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WhyChooseUsSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: t('safeSecure'),
      description: t('safeSecureDesc'),
      color: 'bg-blue-100 text-blue-700'
    },
    {
      icon: Headphones,
      title: t('support24x7'),
      description: t('support24x7Desc'),
      color: 'bg-emerald-100 text-emerald-700'
    },
    {
      icon: DollarSign,
      title: t('bestRates'),
      description: t('bestRatesDesc'),
      color: 'bg-purple-100 text-purple-700'
    },
    {
      icon: Heart,
      title: t('customerFirst'),
      description: t('customerFirstDesc'),
      color: 'bg-red-100 text-red-700'
    },
    {
      icon: Users,
      title: t('expertDrivers'),
      description: t('expertDriversDesc'),
      color: 'bg-orange-100 text-orange-700'
    },
    {
      icon: Clock,
      title: t('quickBooking'),
      description: t('quickBookingDesc'),
      color: 'bg-indigo-100 text-indigo-700'
    }
  ];

  return (
    <section 
      id="why-choose-us" 
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: 'url(https://prettyhome.co.in/wp-content/uploads/2023/05/peacock-feather-bamboo-flute-colourful-background-scaled.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Light overlay for better text readability */}
      <div className="absolute inset-0 bg-white bg-opacity-85"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('whyChooseUs')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('whyChooseUsSubtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 p-8 group">
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;