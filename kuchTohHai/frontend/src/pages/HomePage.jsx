import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import FleetSection from '../components/FleetSection';
import ServicesSection from '../components/ServicesSection';
import TourPackagesSection from '../components/TourPackagesSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigateToFleetExplore = () => {
    navigate('/fleet');
  };

  const handleNavigateToPackagesExplore = () => {
    navigate('/packages');
  };

  const handleVehicleClick = (vehicleId) => {
    navigate(`/vehicle/${vehicleId}`);
  };

  const handlePackageClick = (packageId) => {
    navigate(`/package/${packageId}`);
  };

  return (
    <>
      <HeroSection />
      <FleetSection onViewMore={handleNavigateToFleetExplore} onVehicleClick={handleVehicleClick} />
      <ServicesSection />
      <TourPackagesSection onViewMore={handleNavigateToPackagesExplore} onPackageClick={handlePackageClick} />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
};

export default HomePage;