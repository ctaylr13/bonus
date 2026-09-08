import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import wyw from '@wyw-in-js/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // Paste the hosted API base URL into VITE_API_TARGET in .env.local,
  // then RESTART the dev server (proxy config is read at startup, not HMR'd).
  const target = env.VITE_API_TARGET

  return {
    plugins: [
      wyw({ include: ['**/*.{ts,tsx}'] }),
      react(),
    ],
    server: {
      proxy: target
        ? {
            '/api': {
              target,
              changeOrigin: true,
              // Hosted APIs on self-signed/proxied certs won't kill the request.
              secure: false,
              // /api/things -> <target>/things
              // Delete this line if the API actually serves paths under /api.
              rewrite: (path) => path.replace(/^\/api/, ''),
            },
          }
        : undefined,
    },
  }
})
