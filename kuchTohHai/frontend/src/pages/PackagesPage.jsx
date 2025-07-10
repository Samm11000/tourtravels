import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExplorePackages from '../components/ExplorePackages';

const PackagesPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handlePackageClick = (packageId) => {
    navigate(`/package/${packageId}`);
  };

  return (
    <ExplorePackages onBack={handleBack} onPackageClick={handlePackageClick} />
  );
};

export default PackagesPage;