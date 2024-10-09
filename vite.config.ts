import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
// import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import autoprefixer from 'autoprefixer'
import { viteMockServe } from 'vite-plugin-mock'


// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    base: `/${ env.VITE_APP_CONTEXT }/`,
    resolve: {
      alias: {
        '@/': `${ path.resolve(__dirname, './src') }/`,
        '@img/': `${ path.resolve(__dirname, './src/assets/images') }/`,
      }
    },
    plugins: [
      vue(),
      Pages({
        extensions: ['vue', 'md'],
        dirs: 'src/pages',
        exclude: ['**/components/**/**.vue']
      }),
      Layouts(),
      AutoImport({
        imports: ['vue'],
        dirs: ['src/composables', 'src/stores/module'],
        dts: './auto-imports.d.ts'
      }),
      // Components({
      //   extensions: ['vue'],
      //   include: [/\.vue$/],
      //   dirs: ['src/components']
      // }),
      viteMockServe({
        mockPath: 'src/api/mock',
        localEnabled: (command === 'serve' && env.VITE_MOCK) as boolean
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import '@/style/variable.scss';`
        }
      },
      postcss: {
        plugins: [autoprefixer()]
      }
    },
    //配置代理,解决跨域问题
    server: {
      proxy: {
        [`^/${ env.VITE_APP_SERVICE }/${ env.VITE_APP_SERVICE_PREFIX }/`]: {
          target: `${ env.VITE_PROXY }`,
          changeOrigin: true
        }
      }
    },
    build: {
      assetsDir: 'static',
      // soursemap: true,
      // minify: false,
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/asssets/[name]-[hash].[ext]'
        }
      }
    }
  }
})
