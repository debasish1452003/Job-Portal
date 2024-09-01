import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutStudent,
  logoutUniversity,
  logoutEmployer,
} from "../../../Actions/userActions.js";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access authentication state
  const {
    isAuthenticatedStudent,
    isAuthenticatedUniversity,
    isAuthenticatedEmployer,
  } = useSelector((state) => state.user);

  // Determine the profile route based on the user type
  const profileRoute = isAuthenticatedStudent
    ? "/student/profile"
    : isAuthenticatedUniversity
    ? "/university/profile"
    : isAuthenticatedEmployer
    ? "/employer/profile"
    : "/login";

  // Handle logout
  const handleLogout = () => {
    if (isAuthenticatedStudent) {
      dispatch(logoutStudent());
    } else if (isAuthenticatedUniversity) {
      dispatch(logoutUniversity());
    } else if (isAuthenticatedEmployer) {
      dispatch(logoutEmployer());
    }
    navigate("/login");
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="shadow-sm fixed top-0 left-0 w-100 z-50"
      style={{ zIndex: "1000" }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="font-weight-bold">
          JobPortal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/home" className="nav-link">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/jobs" className="nav-link">
              Jobs
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link">
              Contact
            </Nav.Link>
          </Nav>
          <div className="d-flex align-items-center ml-3">
            {isAuthenticatedStudent ||
            isAuthenticatedUniversity ||
            isAuthenticatedEmployer ? (
              <>
                <Button
                  variant="outline-danger"
                  className="mr-2"
                  onClick={handleLogout}
                  style={{ transition: "color 0.3s ease" }}
                >
                  Logout
                </Button>
                <Link to={profileRoute} className="ml-3">
                  <img
                    src="https://i.postimg.cc/RFDc5M6M/user-2.png"
                    alt="Profile"
                    className="rounded-circle border border-light"
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                    }}
                  />
                </Link>
              </>
            ) : (
              <Button
                variant="outline-primary"
                as={Link}
                to="/login"
                className="mr-2"
              >
                Login
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
