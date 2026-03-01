import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  base: "/flashcards/",
  build: {
    outDir: "dist",
    target: "es2020",
  },
});
