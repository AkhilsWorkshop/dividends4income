import { defineConfig, loadEnv } from 'vite'
import preact from '@preact/preset-vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {

    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [preact(), tailwindcss()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@/components': path.resolve(__dirname, './src/components'),
                '@/hooks': path.resolve(__dirname, './src/hooks'),
                '@/utils': path.resolve(__dirname, './src/utils'),
                '@/types': path.resolve(__dirname, './src/types'),
                '@/stores': path.resolve(__dirname, './src/stores'),
                '@/pages': path.resolve(__dirname, './src/pages'),
            },
        },
        build: {
            outDir: '../frontend/dist',
            emptyOutDir: true,
            rollupOptions: {
                output: {
                    entryFileNames: 'assets/[name].[hash].js',
                    chunkFileNames: 'assets/[name].[hash].js',
                    assetFileNames: 'assets/[name].[hash].[ext]'
                }
            }
        },
        server: {
            port: 3000,
            proxy: {
                '/api': {
                    target: env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '/api')
                }
            }
        }
    }
})