import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import Loader from "../layout/Loader/Loader";
import PageNotFound from "../layout/PageNotFound";

const ProtectedRoute = ({ element: Component, userType, ...rest }) => {
  const {
    loading,
    isAuthenticatedStudent,
    isAuthenticatedUniversity,
    isAuthenticatedEmployer,
  } = useSelector((state) => state.user);

  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const [unauthorized, setUnauthorized] = useState(false);

  const isAuthenticated = () => {
    switch (userType) {
      case "student":
        return isAuthenticatedStudent;
      case "university":
        return isAuthenticatedUniversity;
      case "employer":
        return isAuthenticatedEmployer;
      default:
        return false;
    }
  };

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated()) {
      setUnauthorized(true);
      enqueueSnackbar("You are not authorized to view this page.", {
        variant: "warning",
      });
    } else {
      setUnauthorized(false);
    }
  }, [loading, isAuthenticated, enqueueSnackbar]);

  if (loading) {
    return <Loader />;
  }

  if (unauthorized) {
    return <PageNotFound />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
