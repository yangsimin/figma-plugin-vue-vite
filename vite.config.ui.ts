import path from 'node:path'
import type { UserConfig } from 'vite'
import { defineConfig, mergeConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import sharedConfig from './vite.config.shared'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'
  return mergeConfig(sharedConfig, {
    plugins: [
      vue(),
      viteSingleFile(),
      UnoCSS(),
      {
        name: 'output-root-html',
        enforce: 'post', // 确保在其他插件之后执行
        generateBundle(outputOptions, bundle) {
          Object.keys(bundle).forEach((fileName) => {
            if (!fileName.endsWith('index.html'))
              return
            bundle[fileName].fileName = 'index.html'
          })
        },
      },
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
