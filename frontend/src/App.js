import { Route, Routes } from 'react-router-dom';
import './App.css';
import StudentSignupPage from './pages/studentSignupPage'
import UniversitySignupPage from './pages/universitySignupPage';
import RecruiterSignupPage from './pages/recruiterSignupPage';
import LoginPage from './pages/LoginPage';
function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/studentsignup" element={<StudentSignupPage/>}/>
          <Route path="/unversitysignup" element={<UniversitySignupPage/>}/>
          <Route path="/recuritersignup" element={<RecruiterSignupPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
