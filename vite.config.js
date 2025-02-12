import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";


// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: "/student-data/", // ✅ Set base path for GitHub Pages
  build: {
    chunkSizeWarningLimit: 1000, // ✅ Increase the warning limit
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "vendor-react";
            if (id.includes("lodash")) return "vendor-lodash";
            return "vendor";
          }
        },
      },
    },
  },
});
