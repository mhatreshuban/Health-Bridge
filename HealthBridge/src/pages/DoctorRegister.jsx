import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "./css/DoctorRegister.css";

const DoctorRegister = () => {
  const [fullName, setFullName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleDoctorRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    const user = data?.user;

    if (!user) {
      setErrorMsg(
        "Signup worked, but no user was returned. Turn off email confirmation and try again."
      );
      return;
    }

    const { error: doctorError } = await supabase.from("doctors").insert({
      id: user.id,
      full_name: fullName,
      email: email,
      specialization: specialty,
      is_admin: true,
    });

    if (doctorError) {
      setErrorMsg(doctorError.message);
      return;
    }

    setSuccessMsg("Doctor registered successfully. You can now log in from Admin Login.");

    setFullName("");
    setSpecialty("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setTimeout(() => navigate("/admin-login"), 2000);
  };

  return (
    <div className="doctor-register-page">
      <div className="doctor-register-card">
        <span className="doctor-register-badge">Health Bridge Clinic</span>

        <h2 className="doctor-register-title">Create Doctor Account</h2>

        <form onSubmit={handleDoctorRegister} className="doctor-register-form">
          <input
            type="text"
            className="doctor-register-input"
            placeholder="Doctor full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="text"
            className="doctor-register-input"
            placeholder="Specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            required
          />

          <input
            type="email"
            className="doctor-register-input"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="doctor-register-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            className="doctor-register-input"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="doctor-register-btn">
            Doctor Register
          </button>
        </form>

        {errorMsg && <p className="doctor-register-error">{errorMsg}</p>}
        {successMsg && <p className="doctor-register-success">{successMsg}</p>}
      </div>
    </div>
  );
};

export default DoctorRegister;