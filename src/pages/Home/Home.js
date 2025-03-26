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
    role: "",
    password: "",
    otp: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // Track OTP state
  const [isValidEmail, setIsValidEmail] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

  // Validate email format before updating state
  if (name === "email") {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsValidEmail(emailRegex.test(value) || value === ""); // Update validity state
  }
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Send OTP to Email
  const sendOTP = async () => {
    toast.info("Loading, Please wait!", {
      position: "top-center",
      theme: "colored",
    });
    if (!user.email) {
      toast.error("Please enter your email!", {
        position: "top-center",
        theme: "colored",
      });
      return;
    }
    try {
      console.log("API is hitting here......");
      await axios.post(`${API_URL}/api/v1/requestOtp`, { email: user.email });
      toast.success("OTP sent to your email!", {
        position: "top-center",
        theme: "colored",
      });
      setOtpSent(true);
    } catch (err) {
      toast.error("User already exists!", {
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

  const resetHandler = () =>{
    setUser({name: "",
    email: "",
    role: "",
    password: "",
    otp: "",});
    setOtpSent(false);
  }
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
              className={isValidEmail ? "" : "invalid"}
            />
            {!isValidEmail && <span style={{ color: "red" }}>Invalid Email Format</span>}
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
          <div className="role-container">
            <select
              name="role"
              id="role"
              value={user.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
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
        <div class="reset-container">
          <span class="reset-text">Reset details here...</span>
          <span>
            <button type="reset" class="reset-button" onClick={resetHandler}>
              Reset
            </button>
          </span>
        </div>
        <div className="login-prompt">
          <span>Already have an account?</span>
          <button className="login-button" onClick={() => navigate("/login")}>
            Login Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
