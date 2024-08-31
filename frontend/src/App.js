import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";

import "./App.css";

import StudentSignupPage from "./Components/Authentication/studentSignupPage.jsx";
import UniversitySignupPage from "./Components/Authentication/universitySignupPage.jsx";
import RecruiterSignupPage from "./Components/Authentication/recruiterSignupPage.jsx";
import LoginPage from "./Components/Authentication/LoginPage.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/universitysignup" element={<UniversitySignupPage />} />
          <Route path="/studentsignup" element={<StudentSignupPage />} />
          <Route path="/recruitersignup" element={<RecruiterSignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
