/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,        // ✅ enables describe/it/expect without imports
    environment: "jsdom", // ✅ simulates browser for React Testing Library
    setupFiles: "./src/setupTests.js", // ✅ runs before tests
  },
});
