import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [
    basicSsl() // Habilita HTTPS para Web Bluetooth
  ],
  server: {
    https: true,
    host: true // Permite acesso na rede local
  }
});
