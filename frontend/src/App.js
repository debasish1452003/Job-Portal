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

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/universitysignup" element={<UniversitySignupPage />} />
          <Route path="/studentsignup" element={<StudentSignupPage />} />
          <Route path="/recruitersignup" element={<RecruiterSignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/load" element={<Loader />} />
          <Route path="*" element={<PageNotFound />} />

          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
