import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    include: ['src/**/*.spec.ts'],
    exclude: ['src/**/*.e2e.spec.ts'],
    globals: true,
  },
})
