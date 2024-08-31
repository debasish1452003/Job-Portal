import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";

const ProtectedRoute = ({
  isStudent,
  isUniversity,
  isEmployer,
  component: Component,
  ...rest
}) => {
  const {
    loading,
    isAuthenticatedStudent,
    isAuthenticatedUniversity,
    isAuthenticatedEmployer,
  } = useSelector((state) => state.user);

  const navigate = useNavigate();

  // Check if the user is authenticated based on the role
  const checkAuthentication = () => {
    if (isStudent && !isAuthenticatedStudent) {
      navigate("/login");
      return false;
    }
    if (isUniversity && !isAuthenticatedUniversity) {
      navigate("/login");
      return false;
    }
    if (isEmployer && !isAuthenticatedEmployer) {
      navigate("/login");
      return false;
    }
    return true;
  };

  return (
    <Fragment>
      {!loading && checkAuthentication() && (
        <Routes>
          <Route {...rest} element={<Component />} />
        </Routes>
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
