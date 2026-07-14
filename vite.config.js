import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import tailwindcss from '@tailwindcss/vite'

const assetStubPlugin = {
  name: 'asset-stub',
  enforce: 'pre',
  load(id) {
    if (process.env.VITEST && /\.(svg|png|jpg|jpeg|gif)$/.test(id)) {
      return { code: 'export default "test-file-stub"' }
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    tailwindcss()
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts'
  }
})