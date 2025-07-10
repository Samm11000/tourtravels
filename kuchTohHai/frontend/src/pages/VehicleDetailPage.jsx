import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VehicleDetail from '../components/VehicleDetail';

const VehicleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/fleet');
  };

  const vehicleId = id ? parseInt(id, 10) : 0;

  return (
    <VehicleDetail vehicleId={vehicleId} onBack={handleBack} />
  );
};

export default VehicleDetailPage;