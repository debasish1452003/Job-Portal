import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./Components/layout/Header/Header.js";
import "./index.css";

import "./App.css";

import StudentSignupPage from "./Components/Authentication/studentSignupPage.jsx";
import UniversitySignupPage from "./Components/Authentication/universitySignupPage.jsx";
import RecruiterSignupPage from "./Components/Authentication/recruiterSignupPage.jsx";
import LoginPage from "./Components/Authentication/LoginPage.jsx";
import Home from "./Components/Home/Home.js";
import Footer from "./Components/layout/Footer.js";
import Loader from "./Components/layout/Loader/Loader.js";
import PageNotFound from "./Components/layout/PageNotFound.js";
import AllJobs from "./Components/Home/AllJobs.js";
import ProtectedRoute from "./Components/Route/ProtectedRoutes.js";
import StudentProfile from "./Components/Pages/Student/StudentProfile.js";
import UniversityProfile from "./Components/Pages/University/universityProfile.js";
import EmployerProfile from "./Components/Pages/Recruiter/employerProfile.js";
import About from "./Components/Pages/about.js";
import Contact from "./Components/Pages/contact.js";
import CreateJob from "./Components/Pages/Recruiter/createJob.js";
import JobDescription from "./Components/Home/Job/jobDescription.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Routes>
          <Route
            path="/student/profile"
            element={
              <ProtectedRoute element={StudentProfile} userType="student" />
            }
          />
          <Route
            path="/university/profile"
            element={
              <ProtectedRoute
                element={UniversityProfile}
                userType="university"
              />
            }
          />
          <Route
            path="/employer/profile"
            element={
              <ProtectedRoute element={EmployerProfile} userType="employer" />
            }
          />
          <Route
            path="/employer/profile/createJob"
            element={<ProtectedRoute element={CreateJob} userType="employer" />}
          />
          <Route path="/jobs" element={<AllJobs />} />
          <Route path="/universitysignup" element={<UniversitySignupPage />} />
          <Route path="/studentsignup" element={<StudentSignupPage />} />
          <Route path="/recruitersignup" element={<RecruiterSignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/load" element={<Loader />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/job/:id" element={<JobDescription />} />
          {/* <Route path="/jobs" element={<AllJobs />} /> */}

          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
