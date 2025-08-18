import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 8009,
    allowedHosts: ["all"], // Allow all hosts including Render/Coolify domains
  },
  preview: {
    host: "0.0.0.0",
    port: process.env.PORT || 8009,
    allowedHosts: ["all"], // Allow all hosts including Render/Coolify domains
  },
});
