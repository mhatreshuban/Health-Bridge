import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./css/DoctorDashboard.css";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/signin");
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-circle">
            <img src="\logo.png" alt="Logo" className="logo-img" />
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>

        <nav className="menu">
          <Link to="/dashboard" className="menu-item">Home</Link>
          <Link to="/dashboard/about" className="menu-item">Doctor</Link>
          <Link to="/dashboard/schedule" className="menu-item">Schedule</Link>
          <Link to="/dashboard/appointment" className="menu-item">Appointment</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-section">
        <h1 className="title">Appointment Booking</h1>

        <div className="doctor-card">
          <img
            src="\doctor.jpg"
            alt="Doctor Illustration"
            className="doctor-image"
          />
        </div>

        <div className="btn-group">
          <button
            className="primary-btn"
            onClick={() => navigate("/dashboard/appointment")}
          >
            Book Appointment
          </button>
          <button
            className="primary-btn"
            onClick={() => navigate("/dashboard/schedule")}
          >
            Appointment Available
          </button>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
