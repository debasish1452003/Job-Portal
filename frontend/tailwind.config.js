/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-faster": "spin 1.5s linear infinite",
        "spin-faster-reverse": "spin 1.5s linear infinite reverse",
        "spin-text": "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
};
