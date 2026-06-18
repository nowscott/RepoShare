import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const getPackageName = (id: string) => {
  const parts = id.split('node_modules/')[1]?.split('/')
  if (!parts) return ''
  return parts[0].startsWith('@') ? `${parts[0]}/${parts[1]}` : parts[0]
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          const packageName = getPackageName(id)
          if (packageName === 'react' || packageName === 'react-dom') return 'react'
          if (
            packageName === 'antd' ||
            packageName === '@ant-design/icons' ||
            packageName === '@ant-design/icons-svg' ||
            packageName.startsWith('@rc-component') ||
            packageName.startsWith('rc-')
          ) {
            return 'antd'
          }
          if (['bowser', 'dayjs', 'dom-to-image'].includes(packageName)) return 'vendor'
        }
      }
    }
  },
  server: {
    proxy: {
      '/fonts': {
        target: 'https://cdn.jsdelivr.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fonts/, '')
      }
    }
  }
})
