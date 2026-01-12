import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig(() => {
  const isLib = process.env.VITE_BUILD_MODE === "lib";

  const config: UserConfig = {
    plugins: [react()],
    define: {
      "process.env.NODE_ENV": '"production"',
    },
  };

  if (isLib) {
    config.build = {
      lib: {
        entry: resolve(__dirname, "src/main.tsx"),
        name: "FormWidget",
        formats: ["iife"],
        fileName: () => "form_lead_widget.js",
      },
      rollupOptions: {
        output: {
          assetFileNames: "form_lead_widget.css",
        },
      },
    };
  } else {
    config.build = {
      outDir: "dist",
    };
  }

  return config;
});
