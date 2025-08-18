import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 8009,
    allowedHosts: ["frontend-6zz4.onrender.com"], // Allow the specific Render host
  },
  preview: {
    host: "0.0.0.0",
    port: process.env.PORT || 8009,
    allowedHosts: ["frontend-6zz4.onrender.com"], // Allow the specific Render host
  },
});
