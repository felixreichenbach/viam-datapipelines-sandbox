import { defineConfig, loadEnv } from "vite";
import path from "path";

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Since we set root to "./src", we need to load from the parent directory
  const env = loadEnv(mode, process.cwd(), "");

  console.log("Loading environment variables:", {
    mode,
    cwd: process.cwd(),
    envKeys: Object.keys(env).filter((key) => key.startsWith("VITE_")),
  });

  return {
    root: "./src",
    publicDir: "../public",
    build: {
      outDir: "../dist",
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      open: true,
    },
    define: {
      // Make env variables available in your app
      // Explicitly define the environment variables
      "import.meta.env.VITE_VIAM_AUTH_ENTITY": JSON.stringify(
        env.VITE_VIAM_AUTH_ENTITY
      ),
      "import.meta.env.VITE_VIAM_API_KEY": JSON.stringify(
        env.VITE_VIAM_API_KEY
      ),
      "import.meta.env.VITE_VIAM_ORGANIZATION_ID": JSON.stringify(
        env.VITE_VIAM_ORGANIZATION_ID
      ),
      "import.meta.env.VITE_VIAM_PIPELINE_ID": JSON.stringify(
        env.VITE_VIAM_PIPELINE_ID
      ),
      "import.meta.env.VITE_VIAM_SERVICE_HOST": JSON.stringify(
        env.VITE_VIAM_SERVICE_HOST
      ),
      "import.meta.env.VITE_APP_NAME": JSON.stringify(env.VITE_APP_NAME),
      "import.meta.env.VITE_APP_VERSION": JSON.stringify(env.VITE_APP_VERSION),
    },
    // Alternative: use envPrefix to specify which env variables to expose
    envPrefix: ["VITE_", "APP_"],
  };
});
