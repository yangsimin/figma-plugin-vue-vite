import path from 'node:path'
import type { UserConfig } from 'vite'
import { defineConfig, mergeConfig } from 'vite'
import sharedConfig from './vite.config.shared'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'
  return mergeConfig(sharedConfig, {
    build: {
      minify: isProduction,
      sourcemap: isProduction ? false : 'inline',
      target: 'es2017',
      emptyOutDir: false,
      outDir: path.resolve('dist'),
      rollupOptions: {
        input: path.resolve('src/plugin/plugin.ts'),
        output: {
          entryFileNames: 'plugin.js',
        },
      },
    },
  } satisfies UserConfig)
})
