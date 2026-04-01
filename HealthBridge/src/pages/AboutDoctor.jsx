import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./css/AboutDoctor.css";

const AboutDoctor = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .limit(1)
      .single();

    if (!error) {
      setDoctor(data);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="about-page">
        <div className="about-loading">Loading doctor profile...</div>
      </div>
    );
  }

  return (
    <div className="about-page">
      <div className="about-container">
        <header className="about-header">About Doctor</header>

        <div className="about-content">
          <div className="about-image-card">
            <div className="about-image-wrapper">
              <img src={doctor?.image_url || "/doctor.jpg"} alt="Doctor" />
            </div>

            <div className="about-quick-info">
              <div className="quick-info-box">
                <span className="quick-info-label">Specialization</span>
                <span className="quick-info-value">
                  {doctor?.specialization || doctor?.specialty || "Not added"}
                </span>
              </div>
            </div>
          </div>

          <div className="about-details-card">
            <div className="about-text">
              <span className="doctor-tag">Doctor Profile</span>

              <h2>{doctor?.full_name || "Doctor Name"}</h2>

              <p className="about-specialization">
                <strong>Specialization:</strong>{" "}
                {doctor?.specialization || doctor?.specialty || "Not added"}
              </p>

              <div className="about-bio-card">
                <h3 className="about-bio-title">About</h3>
                <p className="about-bio-text">
                  {doctor?.bio || "Doctor description has not been added yet."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDoctor;