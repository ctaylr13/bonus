import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/events": {
        target: "https://dv7wjygdbi.execute-api.eu-west-1.amazonaws.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/events/, "/events"),
      },
      "/api/flights/autocomplete": {
        target: "https://dv7wjygdbi.execute-api.eu-west-1.amazonaws.com",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/api\/flights\/autocomplete/,
            "/flights/autocomplete",
          ),
      },
    },
  },
});
