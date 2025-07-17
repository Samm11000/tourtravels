// import React from 'react';
// import { Award, CheckCircle, Shield } from 'lucide-react';
// import { useLanguage } from '../contexts/LanguageContext';

// const CertificationSection = () => {
//   const { t } = useLanguage();

//   const certifications = [
//     {
//       id: 1,
//       name: "Government Recognition Certificate",
//       certifiedBy: "Department of Tourism, Government of Uttar Pradesh",
//       category: "Travel Agency - Category-1B (Experienced)",
//       registrationNo: "MAT/TT0001/2024",
//       validFor: "5 years",
//       date: "09-07-2024",
//       image: "/api/placeholder/600/800", // Replace with actual image path
//       description: "Certified as an experienced travel agency by the Department of Tourism, Government of Uttar Pradesh"
//     },
//     {
//       id: 2,
//       name: "ISO 9001:2015 Quality Management System",
//       certifiedBy: "IAB Accreditation",
//       category: "Quality Management System",
//       certificateNo: "US-MYTS-24-0411061",
//       scope: "Tour & Travel Services, Taxi Services and General Order Supplier",
//       date: "04th July 2024",
//       validUntil: "03rd July 2027",
//       image: "/api/placeholder/600/800", // Replace with actual image path
//       description: "Independently assessed by IAB accreditation and is compliance with the requirement of the ISO 9001:2015 standard"
//     }
//   ];

//   return (
//     <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <div className="flex items-center justify-center mb-4">
//             <Award className="w-8 h-8 text-red-600 mr-3" />
//             <h2 className="text-4xl font-bold text-gray-900">
//               {t('certifications') || 'Our Certifications'}
//             </h2>
//           </div>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             {t('certificationsDescription') || 'Trusted and certified by government authorities and international standards, ensuring quality and reliability in our services.'}
//           </p>
//         </div>

//         {/* Certifications Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {certifications.map((cert) => (
//             <div key={cert.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
//               {/* Certificate Image */}
//               <div className="relative h-96 overflow-hidden">
//                 <img 
//                   src={cert.image} 
//                   alt={cert.name}
//                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                 />
//                 <div className="absolute top-4 right-4">
//                   <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
//                     <CheckCircle className="w-4 h-4 mr-1" />
//                     Verified
//                   </div>
//                 </div>
//               </div>

//               {/* Certificate Details */}
//               <div className="p-8">
//                 <div className="flex items-start mb-4">
//                   <Shield className="w-6 h-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-2">
//                       {cert.name}
//                     </h3>
//                     <p className="text-gray-600 mb-4">
//                       {cert.description}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Certification Details */}
//                 <div className="space-y-3">
//                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
//                     <span className="text-gray-600 font-medium">Certified by:</span>
//                     <span className="text-gray-900 font-semibold text-right max-w-xs">
//                       {cert.certifiedBy}
//                     </span>
//                   </div>

//                   {cert.category && (
//                     <div className="flex justify-between items-center py-2 border-b border-gray-100">
//                       <span className="text-gray-600 font-medium">Category:</span>
//                       <span className="text-gray-900 font-semibold">
//                         {cert.category}
//                       </span>
//                     </div>
//                   )}

//                   {cert.registrationNo && (
//                     <div className="flex justify-between items-center py-2 border-b border-gray-100">
//                       <span className="text-gray-600 font-medium">Registration No:</span>
//                       <span className="text-gray-900 font-semibold">
//                         {cert.registrationNo}
//                       </span>
//                     </div>
//                   )}

//                   {cert.certificateNo && (
//                     <div className="flex justify-between items-center py-2 border-b border-gray-100">
//                       <span className="text-gray-600 font-medium">Certificate No:</span>
//                       <span className="text-gray-900 font-semibold">
//                         {cert.certificateNo}
//                       </span>
//                     </div>
//                   )}

//                   {cert.scope && (
//                     <div className="flex justify-between items-start py-2 border-b border-gray-100">
//                       <span className="text-gray-600 font-medium">Scope:</span>
//                       <span className="text-gray-900 font-semibold text-right max-w-xs">
//                         {cert.scope}
//                       </span>
//                     </div>
//                   )}

//                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
//                     <span className="text-gray-600 font-medium">Issue Date:</span>
//                     <span className="text-gray-900 font-semibold">
//                       {cert.date}
//                     </span>
//                   </div>

//                   {cert.validFor && (
//                     <div className="flex justify-between items-center py-2">
//                       <span className="text-gray-600 font-medium">Valid For:</span>
//                       <span className="text-green-600 font-semibold">
//                         {cert.validFor}
//                       </span>
//                     </div>
//                   )}

//                   {cert.validUntil && (
//                     <div className="flex justify-between items-center py-2">
//                       <span className="text-gray-600 font-medium">Valid Until:</span>
//                       <span className="text-green-600 font-semibold">
//                         {cert.validUntil}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Trust Badges */}
//         <div className="mt-16 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8">
//           <div className="text-center">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">
//               Why Our Certifications Matter
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div className="flex flex-col items-center">
//                 <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
//                   <Shield className="w-8 h-8 text-red-600" />
//                 </div>
//                 <h4 className="font-semibold text-gray-900 mb-2">Government Approved</h4>
//                 <p className="text-gray-600 text-center">
//                   Officially recognized by Uttar Pradesh Tourism Department
//                 </p>
//               </div>
//               <div className="flex flex-col items-center">
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
//                   <Award className="w-8 h-8 text-green-600" />
//                 </div>
//                 <h4 className="font-semibold text-gray-900 mb-2">ISO Certified</h4>
//                 <p className="text-gray-600 text-center">
//                   International quality standards for service excellence
//                 </p>
//               </div>
//               <div className="flex flex-col items-center">
//                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
//                   <CheckCircle className="w-8 h-8 text-blue-600" />
//                 </div>
//                 <h4 className="font-semibold text-gray-900 mb-2">Trusted Service</h4>
//                 <p className="text-gray-600 text-center">
//                   Verified compliance with industry standards
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CertificationSection;



import React from 'react';
import { Award, CheckCircle, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import c1 from "./photos/c1maya.png";
import c2 from "./photos/c2maya.png";

const CertificationSection = () => {
  const { t } = useLanguage();

  const certifications = [
    {
      id: 1,
      name: "Government Recognition Certificate",
      certifiedBy: "Department of Tourism, Government of Uttar Pradesh",
      category: "Travel Agency - Category-1B (Experienced)",
      registrationNo: "MAT/TT0001/2024",
      validFor: "5 years",
      date: "09-07-2024",
      image: c1,
      description: "Certified as an experienced travel agency by the Department of Tourism, Government of Uttar Pradesh"
    },
    {
      id: 2,
      name: "ISO 9001:2015 Quality Management System",
      certifiedBy: "IAB Accreditation",
      category: "Quality Management System",
      certificateNo: "US-MYTS-24-0411061",
      scope: "Tour & Travel Services, Taxi Services and General Order Supplier",
      date: "04th July 2024",
      validUntil: "03rd July 2027",
      image: c2,
      description: "Independently assessed by IAB accreditation and is compliance with the requirement of the ISO 9001:2015 standard"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-8 h-8 text-red-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">
              {t('Certifications') || 'Our Certifications'}
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('') || 'Trusted and certified by government authorities and international standards, ensuring quality and reliability in our services.'}
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {certifications.map((cert) => (
            <div key={cert.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              {/* Certificate Image */}
              <div className="relative h-96 overflow-hidden">
                <img 
                  src={cert.image} 
                  alt={cert.name}
                  className="w-full h-full object-contain bg-gray-50 hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/600/800';
                    e.target.className = "w-full h-full object-cover hover:scale-105 transition-transform duration-500";
                  }}
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified
                  </div>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-8">
                <div className="flex items-start mb-4">
                  <Shield className="w-6 h-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {cert.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {cert.description}
                    </p>
                  </div>
                </div>

                {/* Certification Details */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Certified by:</span>
                    <span className="text-gray-900 font-semibold text-right max-w-xs">
                      {cert.certifiedBy}
                    </span>
                  </div>

                  {cert.category && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Category:</span>
                      <span className="text-gray-900 font-semibold">
                        {cert.category}
                      </span>
                    </div>
                  )}

                  {cert.registrationNo && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Registration No:</span>
                      <span className="text-gray-900 font-semibold">
                        {cert.registrationNo}
                      </span>
                    </div>
                  )}

                  {cert.certificateNo && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Certificate No:</span>
                      <span className="text-gray-900 font-semibold">
                        {cert.certificateNo}
                      </span>
                    </div>
                  )}

                  {cert.scope && (
                    <div className="flex justify-between items-start py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Scope:</span>
                      <span className="text-gray-900 font-semibold text-right max-w-xs">
                        {cert.scope}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Issue Date:</span>
                    <span className="text-gray-900 font-semibold">
                      {cert.date}
                    </span>
                  </div>

                  {cert.validFor && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 font-medium">Valid For:</span>
                      <span className="text-green-600 font-semibold">
                        {cert.validFor}
                      </span>
                    </div>
                  )}

                  {cert.validUntil && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 font-medium">Valid Until:</span>
                      <span className="text-green-600 font-semibold">
                        {cert.validUntil}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why Our Certifications Matter
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Government Approved</h4>
                <p className="text-gray-600 text-center">
                  Officially recognized by Uttar Pradesh Tourism Department
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">ISO Certified</h4>
                <p className="text-gray-600 text-center">
                  International quality standards for service excellence
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Trusted Service</h4>
                <p className="text-gray-600 text-center">
                  Verified compliance with industry standards
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationSection;