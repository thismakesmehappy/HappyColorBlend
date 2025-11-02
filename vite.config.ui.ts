import { defineConfig } from "vite";
import path from "node:path";
import { writeFileSync } from "node:fs";
import { viteSingleFile } from "vite-plugin-singlefile";
import react from "@vitejs/plugin-react";
import richSvg from "vite-plugin-react-rich-svg";
import postcssUrl from "postcss-url";
import { generateSCSSConstants } from "./src/constants/uiConstants";

const generateSCSSPlugin = () => ({
  name: 'generate-scss-constants',
  buildStart() {
    const scssContent = generateSCSSConstants();
    writeFileSync('src/ui/styles/abstracts/_constants.scss', scssContent);
  }
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), richSvg(), viteSingleFile(), generateSCSSPlugin()],
  root: path.resolve("src/ui"),
  build: {
    minify: mode === "production",
    cssMinify: mode === "production",
    sourcemap: mode !== "production" ? "inline" : false,
    emptyOutDir: false,
    outDir: path.resolve("dist"),
    rollupOptions: {
      input: path.resolve("src/ui/index.html"),
    },
  },
  css: {
    postcss: {
      plugins: [postcssUrl({ url: "inline" })],
    },
    preprocessorOptions: {
      scss: {
        // Remove the api option that's causing the TypeScript error
      },
    },
  },
  resolve: {
    alias: {
      "@common": path.resolve("src/common"),
      "@ui": path.resolve("src/ui"),
    },
  },
}));
