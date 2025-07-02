import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Blocked request. This host ("48fc-114-10-45-187.ngrok-free.app") is not allowed.
// To allow this host, add "48fc-114-10-45-187.ngrok-free.app" to `server.allowedHosts` in vite.config.js.
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['48fc-114-10-45-187.ngrok-free.app'],
  },
}); 