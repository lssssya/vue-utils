// vite.config.ts
import path from "path";
import { defineConfig, loadEnv } from "file:///D:/2Source/01%20self/vue-utils/node_modules/.pnpm/vite@5.4.8_sass@1.79.4/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/2Source/01%20self/vue-utils/node_modules/.pnpm/@vitejs+plugin-vue@5.1.4_vite@5.4.8+vue@3.5.11/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Pages from "file:///D:/2Source/01%20self/vue-utils/node_modules/.pnpm/vite-plugin-pages@0.26.0_vite@5.4.8/node_modules/vite-plugin-pages/dist/index.mjs";
import Layouts from "file:///D:/2Source/01%20self/vue-utils/node_modules/.pnpm/vite-plugin-vue-layouts@0.11.0_k3m7q5f66p5k3hl623gmfymmpy/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import AutoImport from "file:///D:/2Source/01%20self/vue-utils/node_modules/.pnpm/unplugin-auto-import@0.12.2/node_modules/unplugin-auto-import/dist/vite.js";
import autoprefixer from "file:///D:/2Source/01%20self/vue-utils/node_modules/.pnpm/autoprefixer@10.4.20/node_modules/autoprefixer/lib/autoprefixer.js";
import { viteMockServe } from "file:///D:/2Source/01%20self/vue-utils/node_modules/.pnpm/vite-plugin-mock@2.9.6_mockjs@1.1.0+vite@5.4.8/node_modules/vite-plugin-mock/dist/index.js";
var __vite_injected_original_dirname = "D:\\2Source\\01 self\\vue-utils";
var vite_config_default = defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: `/${env.VITE_APP_CONTEXT}/`,
    resolve: {
      alias: {
        "@/": `${path.resolve(__vite_injected_original_dirname, "./src")}/`,
        "@img/": `${path.resolve(__vite_injected_original_dirname, "./src/assets/images")}/`
      }
    },
    plugins: [
      vue(),
      Pages({
        extensions: ["vue", "md"],
        dirs: "src/pages",
        exclude: ["**/components/**/**.vue", "**/composables/**/**.vue"]
      }),
      Layouts(),
      AutoImport({
        imports: ["vue", "vue-router/composables"],
        dirs: ["src/composables", "src/stores/module"],
        dts: "./auto-imports.d.ts"
      }),
      // Components({
      //   extensions: ['vue'],
      //   include: [/\.vue$/],
      //   dirs: ['src/components']
      // }),
      viteMockServe({
        mockPath: "src/api/mock",
        localEnabled: command === "serve" && env.VITE_MOCK
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
        [`^/${env.VITE_APP_SERVICE}/${env.VITE_APP_SERVICE_PREFIX}/`]: {
          target: `${env.VITE_PROXY}`,
          changeOrigin: true
        }
      }
    },
    build: {
      assetsDir: "static",
      // soursemap: true,
      // minify: false,
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/asssets/[name]-[hash].[ext]"
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFwyU291cmNlXFxcXDAxIHNlbGZcXFxcdnVlLXV0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFwyU291cmNlXFxcXDAxIHNlbGZcXFxcdnVlLXV0aWxzXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi8yU291cmNlLzAxJTIwc2VsZi92dWUtdXRpbHMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IFBhZ2VzIGZyb20gJ3ZpdGUtcGx1Z2luLXBhZ2VzJ1xuaW1wb3J0IExheW91dHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWxheW91dHMnXG4vLyBpbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJ1xuaW1wb3J0IHsgdml0ZU1vY2tTZXJ2ZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLW1vY2snXG5cblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlLCBjb21tYW5kIH0pID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKVxuXG4gIHJldHVybiB7XG4gICAgYmFzZTogYC8keyBlbnYuVklURV9BUFBfQ09OVEVYVCB9L2AsXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AvJzogYCR7IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpIH0vYCxcbiAgICAgICAgJ0BpbWcvJzogYCR7IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9hc3NldHMvaW1hZ2VzJykgfS9gLFxuICAgICAgfVxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgdnVlKCksXG4gICAgICBQYWdlcyh7XG4gICAgICAgIGV4dGVuc2lvbnM6IFsndnVlJywgJ21kJ10sXG4gICAgICAgIGRpcnM6ICdzcmMvcGFnZXMnLFxuICAgICAgICBleGNsdWRlOiBbJyoqL2NvbXBvbmVudHMvKiovKioudnVlJywnKiovY29tcG9zYWJsZXMvKiovKioudnVlJ11cbiAgICAgIH0pLFxuICAgICAgTGF5b3V0cygpLFxuICAgICAgQXV0b0ltcG9ydCh7XG4gICAgICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXIvY29tcG9zYWJsZXMnXSxcbiAgICAgICAgZGlyczogWydzcmMvY29tcG9zYWJsZXMnLCAnc3JjL3N0b3Jlcy9tb2R1bGUnXSxcbiAgICAgICAgZHRzOiAnLi9hdXRvLWltcG9ydHMuZC50cydcbiAgICAgIH0pLFxuICAgICAgLy8gQ29tcG9uZW50cyh7XG4gICAgICAvLyAgIGV4dGVuc2lvbnM6IFsndnVlJ10sXG4gICAgICAvLyAgIGluY2x1ZGU6IFsvXFwudnVlJC9dLFxuICAgICAgLy8gICBkaXJzOiBbJ3NyYy9jb21wb25lbnRzJ11cbiAgICAgIC8vIH0pLFxuICAgICAgdml0ZU1vY2tTZXJ2ZSh7XG4gICAgICAgIG1vY2tQYXRoOiAnc3JjL2FwaS9tb2NrJyxcbiAgICAgICAgbG9jYWxFbmFibGVkOiAoY29tbWFuZCA9PT0gJ3NlcnZlJyAmJiBlbnYuVklURV9NT0NLKSBhcyBib29sZWFuXG4gICAgICB9KVxuICAgIF0sXG4gICAgY3NzOiB7XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgJ0Avc3R5bGUvdmFyaWFibGUuc2Nzcyc7YFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcG9zdGNzczoge1xuICAgICAgICBwbHVnaW5zOiBbYXV0b3ByZWZpeGVyKCldXG4gICAgICB9XG4gICAgfSxcbiAgICAvL1x1OTE0RFx1N0Y2RVx1NEVFM1x1NzQwNixcdTg5RTNcdTUxQjNcdThERThcdTU3REZcdTk1RUVcdTk4OThcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHByb3h5OiB7XG4gICAgICAgIFtgXi8keyBlbnYuVklURV9BUFBfU0VSVklDRSB9LyR7IGVudi5WSVRFX0FQUF9TRVJWSUNFX1BSRUZJWCB9L2BdOiB7XG4gICAgICAgICAgdGFyZ2V0OiBgJHsgZW52LlZJVEVfUFJPWFkgfWAsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICBhc3NldHNEaXI6ICdzdGF0aWMnLFxuICAgICAgLy8gc291cnNlbWFwOiB0cnVlLFxuICAgICAgLy8gbWluaWZ5OiBmYWxzZSxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdzdGF0aWMvanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdzdGF0aWMvanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdzdGF0aWMvYXNzc2V0cy9bbmFtZV0tW2hhc2hdLltleHRdJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnUixPQUFPLFVBQVU7QUFDalMsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sV0FBVztBQUNsQixPQUFPLGFBQWE7QUFFcEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxrQkFBa0I7QUFDekIsU0FBUyxxQkFBcUI7QUFSOUIsSUFBTSxtQ0FBbUM7QUFZekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxNQUFNLFFBQVEsTUFBTTtBQUNqRCxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBRXZDLFNBQU87QUFBQSxJQUNMLE1BQU0sSUFBSyxJQUFJLGdCQUFpQjtBQUFBLElBQ2hDLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLE1BQU0sR0FBSSxLQUFLLFFBQVEsa0NBQVcsT0FBTyxDQUFFO0FBQUEsUUFDM0MsU0FBUyxHQUFJLEtBQUssUUFBUSxrQ0FBVyxxQkFBcUIsQ0FBRTtBQUFBLE1BQzlEO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLE1BQ0osTUFBTTtBQUFBLFFBQ0osWUFBWSxDQUFDLE9BQU8sSUFBSTtBQUFBLFFBQ3hCLE1BQU07QUFBQSxRQUNOLFNBQVMsQ0FBQywyQkFBMEIsMEJBQTBCO0FBQUEsTUFDaEUsQ0FBQztBQUFBLE1BQ0QsUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBLFFBQ1QsU0FBUyxDQUFDLE9BQU8sd0JBQXdCO0FBQUEsUUFDekMsTUFBTSxDQUFDLG1CQUFtQixtQkFBbUI7QUFBQSxRQUM3QyxLQUFLO0FBQUEsTUFDUCxDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BTUQsY0FBYztBQUFBLFFBQ1osVUFBVTtBQUFBLFFBQ1YsY0FBZSxZQUFZLFdBQVcsSUFBSTtBQUFBLE1BQzVDLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDSCxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQLFNBQVMsQ0FBQyxhQUFhLENBQUM7QUFBQSxNQUMxQjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsUUFBUTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsQ0FBQyxLQUFNLElBQUksZ0JBQWlCLElBQUssSUFBSSx1QkFBd0IsR0FBRyxHQUFHO0FBQUEsVUFDakUsUUFBUSxHQUFJLElBQUksVUFBVztBQUFBLFVBQzNCLGNBQWM7QUFBQSxRQUNoQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxXQUFXO0FBQUE7QUFBQTtBQUFBLE1BR1gsZUFBZTtBQUFBLFFBQ2IsUUFBUTtBQUFBLFVBQ04sZ0JBQWdCO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
