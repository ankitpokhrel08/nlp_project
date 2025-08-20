import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 8009,
    allowedHosts: ["frontend-6zz4.onrender.com"], // Allow the specific Render host
    proxy: {
      "/api": {
        target: "https://nlp-backend.itclub.asmitphuyal.com.np", // Updated to secure backend URL
        changeOrigin: true,
        secure: true, // Can now use secure SSL since backend has valid certificate
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy, options) => {
          // Add custom headers if needed
          proxy.on("proxyReq", (proxyReq, req, res) => {
            proxyReq.setHeader("Access-Control-Allow-Origin", "*");
          });
        },
      },
    },
  },
  preview: {
    host: "0.0.0.0",
    port: process.env.PORT || 8009,
    allowedHosts: ["frontend-6zz4.onrender.com"], // Allow the specific Render host
    proxy: {
      "/api": {
        target: "https://nlp-backend.itclub.asmitphuyal.com.np", // Updated to secure backend URL
        changeOrigin: true,
        secure: true, // Can now use secure SSL since backend has valid certificate
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy, options) => {
          // Add custom headers if needed
          proxy.on("proxyReq", (proxyReq, req, res) => {
            proxyReq.setHeader("Access-Control-Allow-Origin", "*");
          });
        },
      },
    },
  },
});
