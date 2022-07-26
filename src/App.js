import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/forms" element={<Forms />} /> */}
          <Route path="/student" element={<Student />} />
          <Route path="/teacher" element={<Teacher />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
