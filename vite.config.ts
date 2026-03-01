import { defineConfig } from "vite";

export default defineConfig({
  base: "/flashcards/",
  build: {
    outDir: "dist",
    target: "es2020",
  },
});
