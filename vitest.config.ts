import { defineConfig, mergeConfig  } from 'vitest/config'

// @ts-ignore
import viteConfig from './vite.config.ts'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    open: false,
    clearMocks: true,
    coverage:{
      reporter:['cobertura', 'text', 'json', 'html']
    },
    exclude: ['lib', 'ems'],
    include: [
      "**/tests/**/*.spec.[jt]s?(x)",
      "**/tests/*.spec.[jt]s?(x)",
    ],
  }
}))