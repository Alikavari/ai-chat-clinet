import {fileURLToPath, URL} from 'node:url';

import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

import * as dotenv from 'dotenv';

// Load env file manually
dotenv.config();
const port = Number(process.env.VITE_PROJECT_PROXY_URL_DEV_PORT) || 5173;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0', // Bind to all network interfaces
    port: port // You can change this if needed
  }
});
