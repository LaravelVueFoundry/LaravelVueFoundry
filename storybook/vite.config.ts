import { resolve } from 'node:path'
import process from 'node:process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import type { RootNode, TemplateChildNode } from '@vue/compiler-core'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          nodeTransforms: [
            removeDataTestAttrs,
          ],
        },
      },
    }),
    dts({ tsconfigPath: 'tsconfig.build.json' }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
    dedupe: ['vue'],
  },
  build: {
    cssCodeSplit: true,
    target: 'esnext',
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'main.ts'),
      name: '@local/ui',
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})

function removeDataTestAttrs(node: RootNode | TemplateChildNode) {
  if (process.env.NODE_ENV !== 'production')
    return

  if (node.type !== 1 /* NodeTypes.ELEMENT */)
    return

  node.props = node.props.filter(prop =>
    prop.type === 6 /* NodeTypes.ATTRIBUTE */
      ? prop.name !== 'data-test-id'
      : true,
  )
}
