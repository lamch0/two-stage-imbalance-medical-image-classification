import Navbar from "./components/Navbar.js";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact.js";
import About from "./pages/About.js";
import Home from "./pages/Home.js";
import Eyepacs from "./pages/Eyepacs.js";
import Endo from "./pages/Endo.js";
import SignUp from "./pages/SignUp.js";
import LogIn from "./pages/LogIn.js";
import { AuthProvider } from "./contexts/AuthContext.js";
import Profile from "./pages/Profile.js";
import PrivateRoute from "./components/PrivateRoute.js";
import LoginRoute from "./components/LoginRoute.js";
import ForgotPassword from "./pages/ForgotPassword.js";
import UpdateProfile from "./pages/UpdateProfile.js";

function App() {
  return (
    <>
      <div className="App">
        <AuthProvider>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/signup"
                element={
                  <LoginRoute>
                    <SignUp />
                  </LoginRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <LoginRoute>
                    <LogIn />
                  </LoginRoute>
                }
              />
              <Route
                path="/update-profile"
                element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/classifyEyepacs"
                element={
                  <PrivateRoute>
                    <Eyepacs />
                  </PrivateRoute>
                }
              />
              <Route
                path="/classifyEndo"
                element={
                  <PrivateRoute>
                    <Endo />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
