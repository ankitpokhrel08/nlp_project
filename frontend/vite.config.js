import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 8009,
    // Allow all hosts for flexibility with different deployment platforms
    allowedHosts: "all",
    proxy: {
      "/api": {
        target: "https://nlp-backend.itclub.asmitphuyal.com.np",
        changeOrigin: true,
        secure: true, // Use secure SSL since backend has valid certificate
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
    // Allow all hosts for flexibility with different deployment platforms
    allowedHosts: "all",
    proxy: {
      "/api": {
        target: "https://nlp-backend.itclub.asmitphuyal.com.np",
        changeOrigin: true,
        secure: true, // Use secure SSL since backend has valid certificate
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
  // Optimize build for production
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false, // Disable sourcemaps in production for smaller bundle
    minify: true, // Use default esbuild minification instead of terser
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
        },
      },
    },
  },
});
