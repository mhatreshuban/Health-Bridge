import React from "react";
import "./css/AboutDoctor.css";

const AboutDoctor = () => (
  <div className="about-page">
    <header className="about-header">ABOUT DOCTOR</header>

    <div className="about-content">
      <div className="about-image">
        <img
          src="/doctor-photo.png"  // replace with your actual image name in /public folder
          alt="Doctor Image"
        />
      </div>

      <div className="about-text">
        <p>
          <strong>Dr. John Doe</strong> is a trusted Pediatrician with more than
          10 years of experience in child healthcare. He provides comprehensive
          care for infants, children, and adolescents, focusing on growth
          monitoring, vaccinations, nutrition guidance, and treatment of common
          childhood illnesses.
        </p>
        <p>
          Known for his friendly and approachable nature, Dr. Doe ensures that
          both children and parents feel at ease during consultations. His
          practice emphasizes preventive care and early diagnosis, helping
          children stay healthy and thrive at every stage of development.
        </p>
      </div>
    </div>
  </div>
);

export default AboutDoctor;
