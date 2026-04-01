import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./css/AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    const userId = data.user.id;

    const { data: doctorData, error: doctorError } = await supabase
      .from("doctors")
      .select("id, is_admin")
      .eq("id", userId)
      .single();

    if (doctorError || !doctorData || !doctorData.is_admin) {
      await supabase.auth.signOut();
      setMessage("Access denied. This account is not an admin doctor.");
      return;
    }

    navigate("/admin-dashboard");
  };

  return (
    <div className="admin-login-page">
      <div className="admin-card">
        <span className="admin-badge">Health Bridge Clinic</span>

        <h2 className="admin-title">Admin Login</h2>

        <form onSubmit={handleAdminLogin} className="admin-form">
          <input
            type="email"
            placeholder="Doctor email"
            className="admin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="admin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="admin-btn">
            Login
          </button>
        </form>

        {message && <p className="admin-error">{message}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;