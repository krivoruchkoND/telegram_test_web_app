import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/telegram_test_web_app",
  plugins: [react(), svgr(), basicSsl(), tsconfigPaths()],
  server: {
    proxy: {
      "/api": {
        target: "https://rockbotstaging.com",
        changeOrigin: true,
      },
    },
  },
});
