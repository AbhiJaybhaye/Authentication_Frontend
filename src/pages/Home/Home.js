import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "./Home.css";
import { API_URL } from "../../url";

const Home = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // Track OTP state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Send OTP to Email
  const sendOTP = async () => {
    if (!user.email) {
      toast.error("Please enter your email!", {
        position: "top-center",
        theme: "colored",
      });
      return;
    }
    try {
      console.log("API is hitting here......")
      await axios.post(`${API_URL}/api/v1/requestOtp`, { email: user.email });
      toast.success("OTP sent to your email!", {
        position: "top-center",
        theme: "colored",
      });
      setOtpSent(true);
    } catch (err) {
      toast.error("Error sending OTP!", {
        position: "top-center",
        theme: "colored",
      });
      console.error(err.response?.data);
    }
  };

  // Handle Signup Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpSent) {
      toast.error("Please verify OTP before signing up!", {
        position: "top-center",
        theme: "colored",
      });
      return;
    }
    try {
      await axios.post(`${API_URL}/api/v1/`, user);
      toast.success("Account created successfully!", {
        position: "top-center",
        theme: "colored",
      });
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed!", {
        position: "top-center",
        theme: "colored",
      });
      console.error(err.response?.data);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="background">
      <div className="signup-container">
        <h2>Fill the Details</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
            required
          />
          <div className="email-otp-container">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              required
              disabled={otpSent} // Disable email field after sending OTP
            />
            <button
              type="button"
              className="otp-button"
              onClick={sendOTP}
              disabled={otpSent}
            >
              {otpSent ? "OTP Sent" : "Send OTP"}
            </button>
          </div>

          {otpSent && (
            <input
              type="text"
              name="otp"
              className="otp-input"
              placeholder="Enter Otp"
              value={user.otp}
              onChange={handleChange}
              required
            />
          )}

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              required
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button className="signup-button" type="submit">
            Signup
          </button>
        </form>
        <div className="login-prompt">
          <span>Already have an account?</span>
          <button className="login-button" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
