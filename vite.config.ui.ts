import path from 'node:path'
import type { UserConfig } from 'vite'
import { defineConfig, mergeConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import sharedConfig from './vite.config.shared'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'
  return mergeConfig(sharedConfig, {
    plugins: [
      vue(),
      viteSingleFile(),
      UnoCSS(),
      Components({
        dirs: ['src/ui/components'],
        dts: true,
      }),
      {
        name: 'output-root-html',
        enforce: 'post', // 确保在其他插件之后执行
        generateBundle(outputOptions, bundle) {
          Object.keys(bundle).forEach((fileName) => {
            if (!/index(?:.dev)?\.html$/.test(fileName)) {
              return
            }
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
        input: path.resolve(isProduction ? 'src/ui/index.html' : 'src/ui/index.dev.html'),
      },
    },
  } satisfies UserConfig)
})
