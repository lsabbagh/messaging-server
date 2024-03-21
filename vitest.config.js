import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: "./tests/global.setup.ts",
    // environment: "./tests/environment.ts",
    // globalSetup: "./tests/global.setup.ts",
    experimentalVmThreads: true,
  },
});