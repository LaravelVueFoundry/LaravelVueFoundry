import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  test: {
    coverage: {
      all: true,
      provider: 'v8',
      include: ['src/stories/**/*'],
      exclude: ['src/stories/**/*.stories.{ts,tsx}', 'src/stories/**/*.test.{ts,tsx}'],
      reporter: ['text', 'text-summary', 'json', 'json-summary', 'html'],
      reportsDirectory: 'coverage/unit',
    },
    environment: 'happy-dom',
  },
  plugins: [
    vue(),
    tsconfigPaths(),
  ],
})
