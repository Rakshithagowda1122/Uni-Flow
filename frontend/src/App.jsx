import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/login";
import AdminDashboard from "./pages/AdminDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";

// Sequential navigation order
const routesSequence = ["/", "/login", "/admin", "/faculty", "/student"];

function KeyPressNavigator() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ignore Enter presses inside form inputs/textareas to avoid interfering with typing
      if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const currentIndex = routesSequence.indexOf(location.pathname);
        const nextIndex = (currentIndex + 1) % routesSequence.length;
        navigate(routesSequence[nextIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [location.pathname, navigate]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Enter key listener */}
      <KeyPressNavigator />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
