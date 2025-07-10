import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Provider } from "react-redux";
import store from "./components/redux/store";
import { Toaster } from "react-hot-toast";
import "./App.css";
import CarsPage from "./components/CarsPage";
import PublicRoute from "./components/PublicRoute";
import EditCar from "./components/EditCar";
import Enquiries from "./components/Enquiries";
import EnquiryDetail from "./components/EnquiryDetail";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cars"
            element={
              <ProtectedRoute>
                <CarsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/enquiry"
            element={
              <ProtectedRoute>
                <Enquiries />
              </ProtectedRoute>
            }
          />
          <Route
            path="/enquiry/:id"
            element={
              <ProtectedRoute>
                <EnquiryDetail />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/updatecar/:id"
            element={
              <ProtectedRoute>
                <EditCar />
              </ProtectedRoute>
            }
          />
          {/* default redirect */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
