import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, ""),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '~/public/assets/styles/main.scss';
        `,
      },
    },
  },
});
