import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import FleetPage from './pages/FleetPage';
import PackagesPage from './pages/PackagesPage.jsx';
import VehicleDetailPage from './pages/VehicleDetailPage';
import PackageDetailPage from './pages/PackageDetailPage.jsx';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/vehicle/:id" element={<VehicleDetailPage />} />
          <Route path="/package/:id" element={<PackageDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  );
}

export default App;