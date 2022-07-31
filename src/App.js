import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";
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
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            {/* <Route path="/forms" element={<Forms />} /> */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/student" element={<Student />} />
            <Route exact path="/teacher" element={<Teacher />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
