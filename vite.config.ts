import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  preview: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4173,
    allowedHosts: true,
  },
});
