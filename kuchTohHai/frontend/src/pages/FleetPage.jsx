import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExploreFleet from '../components/ExploreFleet';

const FleetPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleVehicleClick = (vehicleId) => {
    navigate(`/vehicle/${vehicleId}`);
  };

  return (
    <ExploreFleet onBack={handleBack} onVehicleClick={handleVehicleClick} />
  );
};

export default FleetPage;