import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="relative bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-purple-300 opacity-30 blur-xl rounded-full w-96 h-96 transform -translate-x-1/2 -translate-y-1/2 top-1/4 left-1/4"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-green-300 opacity-30 blur-xl rounded-full w-96 h-96 transform translate-x-1/2 translate-y-1/2 bottom-1/4 right-1/4"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-10">
          Contact Us
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-8 lg:w-2/3 mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:space-x-12 space-y-8 lg:space-y-0">
            {/* Email Section */}
            <div className="text-center">
              <FaEnvelope className="text-5xl text-purple-600 mb-4 hover:text-purple-800 transition-transform transform hover:scale-110" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Email Us
              </h2>
              <p className="text-gray-600 mb-4">
                Reach out to us anytime for queries or assistance.
              </p>
              <a
                href="mailto:debasishrana1452003@gmail.com"
                className="text-purple-600 hover:text-purple-800 transition-colors"
              >
                debasishrana1452003@gmail.com
              </a>
            </div>

            {/* Phone Section */}
            <div className="text-center">
              <FaPhoneAlt className="text-5xl text-green-600 mb-4 hover:text-green-800 transition-transform transform hover:scale-110" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Call Us
              </h2>
              <p className="text-gray-600 mb-4">
                We’re here to assist you with any inquiries.
              </p>
              <p className="text-green-600 hover:text-green-800 transition-colors">
                +91 123-456-7890
              </p>
            </div>

            {/* Location Section */}
            <div className="text-center">
              <FaMapMarkerAlt className="text-5xl text-red-600 mb-4 hover:text-red-800 transition-transform transform hover:scale-110" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Visit Us
              </h2>
              <p className="text-gray-600">
                Find us at our office for a face-to-face discussion.
              </p>
              <p className="text-red-600 hover:text-red-800 transition-colors">
                123 Main Street, Rourkela, India
              </p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-800 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
