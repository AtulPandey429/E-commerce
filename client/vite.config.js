import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';

export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`
        }
      ]
    })
  ],
  css: {
    modules: {
      localIdentName: '[name]-[local]-[hash:base64:5]'
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
});
