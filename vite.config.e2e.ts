import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    include: ['src/**/*.e2e.spec.ts'],
    globals: true,
    setupFiles: ['./e2e/setup.e2e.ts'],
    globalSetup: ['./e2e/global-setup.e2e.ts'],
  },
})
