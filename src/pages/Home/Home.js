import React from "react";
import './Home.css';
import { useNavigate } from "react-router-dom";


const Portal = () => {

  const navigate = useNavigate();

  const handleSignup = ()=>{
    navigate("/signup");
  }
  
  const handleLogin = ()=>{
    navigate("/login");
  }

  return (
    <div>
      <div className="button-container">
        <h1>Fill the Details</h1>
        <button className="signup-button" onClick={handleSignup}>Signup</button>
        <button className="login-button" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Portal;
