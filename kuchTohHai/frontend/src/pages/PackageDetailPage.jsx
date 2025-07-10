import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PackageDetail from '../components/PackageDetail';

const PackageDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/packages');
  };

  const packageId = id ? parseInt(id, 10) : 0;

  return (
    <PackageDetail packageId={packageId} onBack={handleBack} />
  );
};

export default PackageDetailPage;