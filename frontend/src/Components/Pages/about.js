import React from "react";
import { FaYoutube, FaInstagram } from "react-icons/fa";

const About = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 py-16 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-pink-300 opacity-50 blur-xl rounded-full w-96 h-96 transform -translate-x-1/2 -translate-y-1/2 top-1/4 left-1/4"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-yellow-300 opacity-50 blur-xl rounded-full w-96 h-96 transform translate-x-1/2 translate-y-1/2 bottom-1/4 right-1/4"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          About Us
        </h1>
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:space-x-12">
          <div className="text-center lg:w-1/2">
            <img
              className="w-40 h-40 rounded-full mx-auto mb-6 shadow-lg"
              src="https://i.postimg.cc/wxWcR0Cv/IMG20230114163238-min.jpg"
              alt="Founder Debasish"
            />
            <h2 className="text-2xl font-semibold text-gray-800">
              Debasish Rana
            </h2>
            <p className="mt-4 text-gray-700">
              This job portal is a MERN stack project developed by Debasish Rana
              and Satyajit Sahoo, aimed at connecting students, employers, and
              universities efficiently.
            </p>
          </div>

          {/* Distinction Line */}
          <div className="hidden lg:block w-1 h-64 bg-gray-400 rounded-full"></div>

          <div className="text-center lg:w-1/2 mt-8 lg:mt-0">
            <img
              className="w-40 h-40 rounded-full mx-auto mb-6 shadow-lg"
              src="https://i.postimg.cc/DZWjrGpR/Whats-App-Image-2024-09-01-at-2-32-47-PM.jpg"
              alt="Co-Founder Satyajit"
            />
            <h2 className="text-2xl font-semibold text-gray-800">
              Satyajit Sahoo
            </h2>
            <p className="mt-4 text-gray-700">
              Our platform is designed to simplify job searches, recruitment,
              and networking between all users, fostering a seamless employment
              experience.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Follow Us
          </h2>
          <div className="flex justify-center space-x-8">
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 text-4xl hover:text-red-500 transition-transform transform hover:scale-110"
            >
              <FaYoutube />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 text-4xl hover:text-pink-500 transition-transform transform hover:scale-110"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
