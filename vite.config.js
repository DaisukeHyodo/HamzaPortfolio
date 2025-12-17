import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/HamzaPortfolio/", // remplace NOM_DU_REPO par le nom exact de ton dépôt GitHub
});
