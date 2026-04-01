import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "./css/Signin.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <span className="signin-badge">Health Bridge Clinic</span>

        <div className="signin-logo-wrapper">
          <img
            src="/logo.png"
            alt="Health Bridge Clinic"
            className="signin-logo"
          />
        </div>

        <h2 className="signin-title">Sign In</h2>
        <p className="signin-subtitle">
          Welcome back. Login to manage your appointments and doctor dashboard.
        </p>

        <form onSubmit={handleLogin} className="signin-form">
          <div className="signin-input-group">
            <label>Email</label>
            <input
              type="email"
              className="signin-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="signin-input-group">
            <label>Password</label>
            <input
              type="password"
              className="signin-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="signin-btn">
            Login
          </button>
        </form>

        {errorMsg && <p className="error">{errorMsg}</p>}
      </div>
    </div>
  );
};

export default Signin;