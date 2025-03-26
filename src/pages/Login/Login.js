import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { API_URL } from "../../url";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/v1/login`, user);
      toast.success("Login Successful!!", {
        position: "top-center",
        theme: "colored",
      });
      console.log(res);

      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("role", res.data.user.role);

      const role = localStorage.getItem("role");
      console.log("Role is - ", role);
      const token = localStorage.getItem("token");
      console.log("Token is - ", token);

      if (role === "Admin") {
        try {
          const midRes = await axios.get(`${API_URL}/api/v1/admin`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(midRes);

          navigate("/admin");
        } catch (error) {
          console.log(error);
        }
      } else if (role === "User") {
        try {
          const midRes = await axios.get(`${API_URL}/api/v1/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(midRes);

          navigate("/user");
        } catch (error) {
          console.log(error);
        }
      }
    } catch (err) {
      toast.error("Login Failed, Due Wrong Credentials!!", {
        position: "top-center",
        theme: "colored",
      });
      console.error(err.response.data);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const resetHandler = () =>{
    setUser({email:"",password:""});
  }
  return (
    <div className="background">
      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
            className={isValidEmail ? "" : "invalid"}
          />
          {!isValidEmail && <span style={{ color: "red" }}>Invalid Email Format</span>}
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
          <button type="submit">Login</button>
        </form>
        <div class="reset-container">
          <span class="reset-text">Reset details here...</span>
          <span>
            <button type="reset" class="reset-button" onClick={resetHandler}>
              Reset
            </button>
          </span>
        </div>
        <button className="signupbk-button" onClick={() => navigate("/")}>
            Go to Signup
          </button>
      </div>
    </div>
  );
};

export default Login;
