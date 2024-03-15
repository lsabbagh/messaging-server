import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: "./tests/global.setup.ts",
    // environment: "./tests/environment.ts",
    // setupFiles: "./tests/tests.setup.ts",
    experimentalVmThreads: true,
  },
});