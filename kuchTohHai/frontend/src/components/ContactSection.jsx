// import React, { useState } from 'react';
// import { Phone, Mail, MapPin, MessageCircle, ArrowRight, Clock, Send } from 'lucide-react';
// import { useLanguage } from '../contexts/LanguageContext';
// import BookingForm from './BookingForm';

// const ContactSection = () => {
//   const { t } = useLanguage();

//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     service: '',
//     message: ''
//   });

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Contact form submitted:', formData);
//   };

//   return (
//     <section id="contact" className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('contactUs')}</h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             {t('contactSubtitle')}
//           </p>
//         </div>
        
//         <div className="grid lg:grid-cols-2 gap-12">
//           {/* Contact Information */}
//           <div className="space-y-8">
//             <div className="bg-white rounded-2xl shadow-lg p-8">
//               <h3 className="text-2xl font-semibold text-gray-900 mb-6">{t('getInTouch')}</h3>
//               <div className="space-y-6">
//                 <div className="flex items-start">
//                   <div className="bg-blue-100 p-3 rounded-full mr-4">
//                     <Phone className="w-6 h-6 text-blue-700" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">{t('phone')}</p>
//                     <p className="text-gray-600">+91 98765 43210</p>
//                     <p className="text-sm text-gray-500">{t('available24x7')}</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start">
//                   <div className="bg-emerald-100 p-3 rounded-full mr-4">
//                     <MessageCircle className="w-6 h-6 text-emerald-600" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">{t('whatsapp')}</p>
//                     <p className="text-gray-600">+91 98765 43210</p>
//                     <p className="text-sm text-gray-500">{t('quickResponses')}</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start">
//                   <div className="bg-purple-100 p-3 rounded-full mr-4">
//                     <Mail className="w-6 h-6 text-purple-600" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">{t('email')}</p>
//                     <p className="text-gray-600">info@mayatours.com</p>
//                     <p className="text-sm text-gray-500">{t('replyWithin2Hours')}</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start">
//                   <div className="bg-red-100 p-3 rounded-full mr-4">
//                     <MapPin className="w-6 h-6 text-red-600" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">{t('address')}</p>
//                     <p className="text-gray-600">
//                       123 Travel Street, Tourism District<br />
//                       New Delhi, India - 110001
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start">
//                   <div className="bg-amber-100 p-3 rounded-full mr-4">
//                     <Clock className="w-6 h-6 text-amber-600" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">{t('businessHours')}</p>
//                     <p className="text-gray-600">{t('serviceAvailable24x7')}</p>
//                     <p className="text-sm text-gray-500">{t('officeHours')}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl shadow-lg p-8 text-white">
//               <h3 className="text-xl font-semibold mb-4">{t('quickContact')}</h3>
//               <p className="mb-6 text-blue-100">{t('needImmediateAssistance')}</p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <a 
//                   href="tel:+919368084778" 
//                   className="bg-white text-blue-700 px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center font-semibold"
//                 >
//                   <Phone className="w-5 h-5 mr-2" />
//                   {t('callNow')}
//                 </a>
//                 <a 
//                   href="https://wa.me/919368084778?text=Hello%20Maya%20Tours%20and%20Travel
// " 
//                   className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center font-semibold"
//                 >
//                   <MessageCircle className="w-5 h-5 mr-2" />
//                   {t('whatsapp')}
//                 </a>
//               </div>
//             </div>
//           </div>

//           <BookingForm/>
          
//           {/* Contact Form */}
//           {/* <div className="bg-white rounded-2xl shadow-lg p-8">
//             <h3 className="text-2xl font-semibold text-gray-900 mb-6">{t('sendMessage')}</h3>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">{t('fullName')} *</label>
//                   <input 
//                     type="text" 
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
//                     placeholder={t('fullName')}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">{t('phoneNumber')} *</label>
//                   <input 
//                     type="tel" 
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
//                     placeholder="+91 98765 43210"
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">{t('emailAddress')}</label>
//                 <input 
//                   type="email" 
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
//                   placeholder="your@email.com"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">{t('serviceRequired')}</label>
//                 <select 
//                   name="service"
//                   value={formData.service}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">{t('selectAService')}</option>
//                   <option value="airport-transfer">{t('airportTransfer')}</option>
//                   <option value="tour-package">{t('tourPackage')}</option>
//                   <option value="car-rental">{t('carRental')}</option>
//                   <option value="custom-trip">{t('customTrip')}</option>
//                   <option value="corporate-travel">{t('corporateTravel')}</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">{t('message')}</label>
//                 <textarea 
//                   rows={4} 
//                   name="message"
//                   value={formData.message}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
//                   placeholder={t('tellUsAboutRequirements')}
//                 ></textarea>
//               </div>
              
//               <button 
//                 type="submit" 
//                 className="w-full bg-gradient-to-r from-blue-700 to-blue-800 text-white py-4 rounded-xl hover:from-blue-800 hover:to-blue-900 transition-all font-semibold flex items-center justify-center group shadow-lg"
//               >
//                 <Send className="w-5 h-5 mr-2" />
//                 {t('sendMessageBtn')}
//                 <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
//               </button>
//             </form>
//           </div> */}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactSection;


import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, ArrowRight, Clock, User, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const MeetTheOwner = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-lg p-8 border-2 border-amber-200">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Meet The Owner</h3>
      
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Owner Photo */}
        <div className="relative">
          <img 
            src="https://mayatourandtravels.com/images/gallery/maya-tours-and-travels-mathura-4.jpg" 
            alt="Mr. Anuj Agrawal"
            className="w-32 h-32 rounded-full object-cover border-4 border-amber-300 shadow-xl"
          />
          <div className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full p-2">
            <Star className="w-4 h-4 fill-current" />
          </div>
        </div>
        
        {/* Owner Details */}
        <div className="space-y-3">
          <h4 className="text-xl font-bold text-gray-900">Mr. Anuj Agrawal</h4>
          <p className="text-amber-700 font-semibold">Founder & CEO</p>
          <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
            "With over 15+ years of experience in travel industry, I personally ensure 
            every journey with Maya Tours is memorable and hassle-free. Your satisfaction is our priority."
          </p>
        </div>
        
        {/* Contact Details */}
        <div className="w-full space-y-4 pt-4 border-t border-amber-200">
          <div className="flex items-center justify-center space-x-2 text-gray-700">
            <Phone className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium">Direct Contact:</span>
          </div>
          
          <div className="space-y-2">
            <a 
              href="tel:+919897011103" 
              className="block bg-amber-100 text-amber-800 py-2 px-4 rounded-lg hover:bg-amber-200 transition-colors font-semibold text-sm"
            >
              📞 +91-9897011103
            </a>
            <a 
              href="tel:+919897138727" 
              className="block bg-amber-100 text-amber-800 py-2 px-4 rounded-lg hover:bg-amber-200 transition-colors font-semibold text-sm"
            >
              📞 +91-9897138727
            </a>
            <a 
              href="mailto:anuj.agarwal7588@gmail.com" 
              className="block bg-yellow-100 text-yellow-800 py-2 px-4 rounded-lg hover:bg-yellow-200 transition-colors font-semibold text-sm"
            >
              ✉️ anuj.agarwal7588@gmail.com
            </a>
          </div>
        </div>
        
        {/* CTA Button */}
        <a 
          href="https://wa.me/919897011103?text=Hello%20Maya%20Tours%20and%20Travel%2C%20I%20want%20to%20speak%20with%20owner"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-3 rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all font-semibold flex items-center justify-center group shadow-lg"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Chat with Owner
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-yellow-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('contactUs')}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('contactSubtitle')}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-100">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">{t('getInTouch')}</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-amber-100 p-3 rounded-full mr-4">
                    <Phone className="w-6 h-6 text-amber-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t('phone')}</p>
                    <p className="text-gray-600">+91-9897011103</p>
                    <p className="text-gray-600">+91-9897138727</p>
                    <p className="text-sm text-gray-500">{t('available24x7')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-emerald-100 p-3 rounded-full mr-4">
                    <MessageCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t('whatsapp')}</p>
                    <p className="text-gray-600">+91-9897011103</p>
                    <p className="text-sm text-gray-500">{t('quickResponses')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4">
                    <Mail className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t('email')}</p>
                    <p className="text-gray-600">anuj.agarwal7588@gmail.com</p>
                    <p className="text-sm text-gray-500">{t('replyWithin2Hours')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-orange-100 p-3 rounded-full mr-4">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t('address')}</p>
                    <p className="text-gray-600">
                      Office: Brij Nagar, 166/144,<br />
                      Parikrama Marg, Sonkh, Adda,<br />
                      Mathura, Uttar Pradesh 281001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-amber-100 p-3 rounded-full mr-4">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t('businessHours')}</p>
                    <p className="text-gray-600">{t('serviceAvailable24x7')}</p>
                    <p className="text-sm text-gray-500">Office: 9:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-amber-600 to-yellow-600 rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-xl font-semibold mb-4">{t('quickContact')}</h3>
              <p className="mb-6 text-amber-100">{t('needImmediateAssistance')}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="tel:+919897011103" 
                  className="bg-white text-amber-700 px-6 py-3 rounded-xl hover:bg-amber-50 transition-colors flex items-center justify-center font-semibold"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {t('callNow')}
                </a>
                <a 
                  href="https://wa.me/919897011103?text=Hello%20Maya%20Tours%20and%20Travel" 
                  className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t('whatsapp')}
                </a>
              </div>
            </div>
          </div>

          {/* Meet The Owner Component */}
          <MeetTheOwner />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;