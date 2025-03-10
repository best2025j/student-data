import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  base:
    process.env.NODE_ENV === "production" && process.env.VERCEL !== "1"
      ? "/student-data/"
      : "/", // ✅ Fix for GitHub Pages and vercel

  build: {
    outDir: "dist", // Make sure this matches your deployment settings
    chunkSizeWarningLimit: 10000, // ✅ Change warning limit to 600kB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react-vendor"; // ✅ Separate React
            if (id.includes("react-router")) return "router-vendor"; // ✅ Separate React Router
            return "vendor"; // ✅ Separate other dependencies
          }
        },
      },
    },
  },
});
