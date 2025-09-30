import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://educonnect-backend-ao93.onrender.com', // Adjust the target to your backend's URL
    },
  },
});
