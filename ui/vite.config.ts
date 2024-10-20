import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  envDir: "../",
  plugins: [react()],
});