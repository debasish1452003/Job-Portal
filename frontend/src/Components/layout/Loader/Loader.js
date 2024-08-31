import React, { useState, useEffect } from "react";

const Loader = () => {
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === "Loading...") return "Loading";
        return prev + ".";
      });
    }, 500); // Change text every 500ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen bg-white flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* Central Orbiting Circles */}
        <div className="absolute w-40 h-40 border-t-4 border-blue-500 rounded-full animate-spin-faster"></div>
        <div className="absolute w-32 h-32 border-t-4 border-green-500 rounded-full animate-spin-faster-reverse"></div>

        {/* Pulsing Core */}
        <div className="relative w-24 h-24 bg-blue-500 rounded-full shadow-2xl animate-pulse"></div>

        {/* Loading Text */}
        <div className="absolute bottom-[-3rem] text-black font-semibold text-lg">
          {loadingText}
        </div>
      </div>
    </div>
  );
};

export default Loader;
