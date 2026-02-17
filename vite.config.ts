/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  test: {
    // READMORE: https://testing-library.com/docs/react-testing-library/setup#auto-cleanup-in-vitest
    globals: true, // Allows using describe, it, expect, etc., globally without imports
    environment: "jsdom", // Use JSDOM for DOM simulation
    setupFiles: ["./vitest-setup.js"],
    css: true, // If you want to process CSS (e.g., for CSS Modules)
    // Define values that can be accessed inside your tests using inject method.
    // READMORE: https://vitest.dev/config/provide.html#provide
    // provide: {
    //   API_KEY: "123",
    // },
  },
});
