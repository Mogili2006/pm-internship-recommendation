import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import StudentApplications from "./pages/student/StudentApplications";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import StudentInternships from "./pages/student/StudentInternships";
import InternshipDetail from "./pages/student/InternshipDetail";
import StudentRecommendations from "./pages/student/StudentRecommendations";
import RecommendationDetail from "./pages/student/RecommendationDetail";
import InterviewPreparation from "./pages/student/InterviewPreparation";

function App() {
  return (
    <Routes>

      {/* Public pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Student pages */}
      <Route
        path="/student/dashboard"
        element={<StudentDashboard />}
      />

      <Route
        path="/student/profile"
        element={<StudentProfile />}
      />

      <Route
        path="/student/internships"
        element={<StudentInternships />}
      />

      <Route
        path="/student/internships/:id"
        element={<InternshipDetail />}
      />

      <Route
        path="/student/recommendations"
        element={<StudentRecommendations />}
      />
      <Route
  path="/student/interview-preparation"
  element={<InterviewPreparation />}
/>

      <Route
        path="/student/applications"
        element={<StudentApplications />}
      />

      <Route
        path="/student/recommendations/:id"
        element={<RecommendationDetail />}
      />

    </Routes>
  );
}

export default App;