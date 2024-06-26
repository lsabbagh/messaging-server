import { defineConfig } from "vitest/config";
import path from 'path'

export default defineConfig({

  test: {
    setupFiles: "./tests/vite/setupFiles.ts",
    // environment: "./tests/environment.ts",
    globalSetup: "./tests/vite/globalSetup.ts",
    experimentalVmThreads: true,
    // reporters: ['html']
    poolOptions: {
      threads: {singleThread: true}
    }
  },
  
  build: {
    rollupOptions: {
      external: [/^node:\w+/],
    },
  },
  resolve: {
    alias: {
      "@*": [
        "src/*"
      ]
    },
  },
});