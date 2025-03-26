import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const handelChange = () =>{
    localStorage.clear();
    navigate("/login");
  }
  return (
    <div className="dashboard-container">
      <h1>Welcome to ADMIN protected Dashboard!!</h1>
      <div className="logout-container">
          <button className="logout-button" onClick={handelChange}>Logout</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
