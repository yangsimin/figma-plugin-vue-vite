import path from 'node:path'
import type { UserConfig } from 'vite'
import { defineConfig, mergeConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import sharedConfig from './vite.config.shared'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'
  return mergeConfig(sharedConfig, {
    plugins: [
      vue(),
      viteSingleFile(),
      AutoImport({
        imports: ['vue'],
        dts: true,
        vueTemplate: true,
      }),
      UnoCSS(),
    ],
    build: {
      minify: isProduction,
      cssMinify: isProduction,
      sourcemap: isProduction ? false : 'inline',
      emptyOutDir: false,
      outDir: path.resolve('dist'),
      rollupOptions: {
        input: path.resolve('src/ui/index.html'),
      },
    },
  } satisfies UserConfig)
})
