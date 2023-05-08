import { defineConfig } from "vite" // Use this function to avoid errors or typos
import eslint from "vite-plugin-eslint"

export default defineConfig({
  plugins: [eslint()]
})