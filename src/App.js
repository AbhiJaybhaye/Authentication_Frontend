import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Portal from "./pages/Home/Home";
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div>
    <ToastContainer/>
    <Router>
      <Routes>
        <Route path="/" element={<Portal/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </div>

  );
}

export default App;
