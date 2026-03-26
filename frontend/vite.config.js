import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = Number(env.PORT || 8009);
  const devProxyTarget = env.VITE_DEV_PROXY_TARGET || "http://localhost:8000";
  const isHttpsTarget = devProxyTarget.startsWith("https://");

  return {
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      port,
      // Allow all hosts for flexibility with different deployment platforms
      allowedHosts: "all",
      proxy: {
        "/api": {
          target: devProxyTarget,
          changeOrigin: true,
          secure: isHttpsTarget,
          rewrite: (path) => path.replace(/^\/api/, ""),
          configure: (proxy) => {
            // Preserve permissive CORS behavior used by current setup.
            proxy.on("proxyReq", (proxyReq) => {
              proxyReq.setHeader("Access-Control-Allow-Origin", "*");
            });
          },
        },
      },
    },
    preview: {
      host: "0.0.0.0",
      port,
      // Allow all hosts for flexibility with different deployment platforms
      allowedHosts: "all",
      proxy: {
        "/api": {
          target: devProxyTarget,
          changeOrigin: true,
          secure: isHttpsTarget,
          rewrite: (path) => path.replace(/^\/api/, ""),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
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
  };
});
