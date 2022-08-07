import { defineConfig, ConfigEnv, UserConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default (env: ConfigEnv) =>
  defineConfig({
    base: env.command === 'build' ? '/web' : './',
    plugins: [
      VitePWA({
        devOptions: {
          enabled: true,
        },
        manifest: false,
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          runtimeCaching: [
            {
              urlPattern: ({ request }) => request.url.toLowerCase().includes('/web/md'),
              handler: 'CacheFirst',
              options: {
                cacheName: `md-cache`,
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /(.*?)\.(js|css|ts)/, // js /css /ts静态资源缓存
              handler: 'CacheFirst',
              options: {
                cacheName: `js-css-cache`,
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 7,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps|ico)/, // 图片缓存
              handler: 'CacheFirst',
              options: {
                cacheName: `image-cache`,
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 7,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
      }),
    ],
    build: {
      assetsDir: 'static',
      rollupOptions: {
        output: {
          entryFileNames: 'static/js/[name].js',
          chunkFileNames: 'static/js/[name].js',
          assetFileNames: 'static/[ext]/[name].[ext]',
        },
      },
    },
  });
