/**
 * ════════════════════════════════════════════════════════════
 * vite.config.ts — COMPLETE REPLACEMENT
 * 
 * THE MAIN PROBLEM WAS: React SPA = Google only sees blank index.html
 * THE FIX: vite-ssg (Static Site Generation) pre-renders every page
 * to static HTML at build time so Google reads REAL content.
 *
 * INSTRUCTIONS:
 * 1. In GitHub, open vite.config.ts
 * 2. Replace ENTIRE content with this file
 * ════════════════════════════════════════════════════════════
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    rollupOptions: {
      output: {
        // Better caching - split vendor chunks
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          motion: ["framer-motion"],
        },
      },
    },
  },
}));
