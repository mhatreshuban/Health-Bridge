import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Signin from "./pages/Signin";

import DoctorDashboard from "./pages/DoctorDashboard";
import AboutDoctor from "./pages/AboutDoctor";
import AppointmentForm from "./pages/AppointmentForm";
import DoctorSchedule from "./pages/DoctorSchedule";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./component/AdminRoute";
import DoctorRegister from "./pages/DoctorRegister";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/doctor-register" element={<DoctorRegister />} />

        {/* Doctor Dashboard */}
        <Route path="/dashboard" element={<DoctorDashboard />} />
        <Route path="/about-doctor" element={<AboutDoctor />} />
        <Route path="/appointment" element={<AppointmentForm />} />
        <Route path="/schedule" element={<DoctorSchedule />} />

        {/* Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;