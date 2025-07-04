/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#007AFF", 
        white: {
          DEFAULT: "#FFFFFF",
          100: "#F5F7FA",
          200: "#E5EAF2",
        },
        gray: {
          100: "#6B7280",
          200: "#4B5563",
        },
        dark: {
          100: "#0F172A",
        },
        error: "#EF4444", 
        success: "#10B981", 
        accent: "#FF3CAC", 
        warning: "#F59E0B", 
        info: "#3B82F6", 
      },
      fontFamily: {
        quicksand: ["Quicksand-Regular", "sans-serif"],
        "quicksand-bold": ["Quicksand-Bold", "sans-serif"],
        "quicksand-semibold": ["Quicksand-SemiBold", "sans-serif"],
        "quicksand-light": ["Quicksand-Light", "sans-serif"],
        "quicksand-medium": ["Quicksand-Medium", "sans-serif"],
      },    
    },
  },
  plugins: [],
};
