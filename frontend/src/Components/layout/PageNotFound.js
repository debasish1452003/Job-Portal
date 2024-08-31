import React from "react";
import { Link } from "react-router-dom";
import "animate.css"; // Import animate.css for animations

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 overflow-hidden">
      <div className="text-center px-6 py-12 animate__animated animate__fadeIn animate__slow">
        <h1 className="text-9xl font-extrabold text-white tracking-tight mb-8 animate__animated animate__bounceInDown">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-100 mb-6 animate__animated animate__fadeInUp">
          Oops! Page not found
        </h2>
        <p className="text-lg md:text-xl text-gray-400 mb-8 animate__animated animate__fadeInUp animate__delay-1s">
          The page you are looking for does not exist. It might have been moved
          or deleted.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-md shadow-lg hover:bg-blue-700 transition-colors duration-300 animate__animated animate__fadeIn animate__delay-2s"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
