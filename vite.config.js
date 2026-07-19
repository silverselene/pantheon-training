import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Bare-bones static site — no framework, no bundler-specific syntax in the
// HTML/CSS/JS. Vite just needs to know about the second page so it's
// included when building; `pnpm dev` works against both pages with zero
// extra config since Vite serves any .html file at the project root.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        workout: resolve(__dirname, 'workout.html'),
      },
    },
  },
});
