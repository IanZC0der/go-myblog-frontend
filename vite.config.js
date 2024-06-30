import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api/myblog': {
        target: 'http://myblogbackend:7080',
        changeOrigin: true
      }
    }
    // {
    //   target: 'http://127.0.0.1:7080',
    //   changeOrigin: true
    //   // '/api/myblog': 'http://172.21.0.2:7080'
    // }
  }
})
