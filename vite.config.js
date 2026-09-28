import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // host: true binds the dev server to the LAN interface (0.0.0.0), not
  // just localhost, so a phone on the same Wi-Fi can load it — `npm run
  // dev` then prints a "Network:" URL alongside the local one.
  //
  // port reads $PORT when set (the harness assigns a free one and passes
  // it this way when 5173 is already taken by another project's server)
  // and falls back to the usual default otherwise, for a plain `npm run
  // dev`/`npm run preview` outside the harness.
  server: { host: true, port: Number(process.env.PORT) || 5173 },
  preview: { host: true, port: Number(process.env.PORT) || 4173 },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    globals: true,
  },
})
