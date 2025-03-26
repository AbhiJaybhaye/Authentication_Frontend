import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import Home from "./pages/Home/Home";
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div>
    <ToastContainer newestOnTop/>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />

      </Routes>
    </Router>
    </div>

  );
}

export default App;
