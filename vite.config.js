import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Static SPA for the Alberto Soler portfolio.
// base: "/" works for Cloudflare Pages (served at the domain root).
export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
