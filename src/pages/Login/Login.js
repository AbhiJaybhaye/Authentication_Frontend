import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { API_URL } from "../../url";


const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/v1/login`, user);
      toast.success('Login Successful!!', {
        position: "top-center",
        theme: "colored",
        });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      toast.error('Login Failed, Wrong Credentials!!', {
        position: "top-center",
        theme: "colored",
        });
      console.error(err.response.data);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="background">
   <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
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
    </div>
  </div>
  );
};

export default Login;
