import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,        // ✅ makes test(), beforeEach(), expect() globally available
    environment: "jsdom", // ✅ required for React DOM testing
    setupFiles: "./src/setupTests.js", // optional: global setup for tests
  },
});