import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

const UserDashboard = () => {

  const navigate = useNavigate();

  const handelChange = () =>{
    localStorage.clear();
    navigate("/login");
  }
  return (
    <div className="dashboard-container">
      <h1>Welcome to USER protected Dashboard!!</h1>
      <div className="logout-container">
          <button className="logout-button" onClick={handelChange}>Logout</button>
        </div>
    </div>
  );
};

export default UserDashboard;
