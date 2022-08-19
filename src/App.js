import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
// import Footer from "./components/Footer";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";
import Results from "./pages/Results";
import Details from "./pages/Details";
import Resetpassword from "./components/Resetpassword";
import { AuthProvider } from "./components/Auth";
import "./App.css";
// import Login from "./pages/Login";
// import Register from "./pages/Register.js";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <NavBar />
          <Routes style={{ height: "500px" }}>
            {/* <Route path="/" element={<Home />} /> */}
            {/* <Route path="/forms" element={<Forms />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/student/:handle" element={<Student />} />
            <Route path="/teacher" element={<Teacher />} />
            <Route path="/results" element={<Results />} />
            <Route path="/resetpassword" element={<Resetpassword />} />
            <Route path="/details" element={<Details />} />
          </Routes>
          {/* <Footer /> */}
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
