/** @type {import('tailwindcss').Config} */
import tailwindTypography from "@tailwindcss/typography";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure all React files are scanned
  theme: {
    extend: {
      colors: {
        primary: "#1D4241",
        secondary: "#FFD9BE",
        danger: "#EB0000",
      },
    },

    corePlugins: {
      preflight: false, // ✅ Disable Tailwind's default color normalization
    },
    experimental: { optimizeUniversalDefaults: true }, // ✅ Force Tailwind to use RGB
  },
  plugins: [require("tailwind-scrollbar"), retailwindTypography()], // Example of adding plugins
};
