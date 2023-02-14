import Navbar from "./components/Navbar.js";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact.js";
import About from "./pages/About.js";
import Home from "./pages/Home.js";
import Eyepacs from "./pages/Eyepacs.js";
import Endo from "./pages/Endo.js";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/classifyEyepacs" element={<Eyepacs />} />
            <Route path="/classifyEndo" element={<Endo />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
