import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** So `vite preview` and deep links like /team load the SPA (same fix as hosting rewrites). */
function spaFallbackPreview() {
    return {
        name: 'spa-fallback-preview',
        configurePreviewServer(server) {
            const dist = path.resolve(process.cwd(), 'dist')
            server.middlewares.use((req, _res, next) => {
                if (req.method !== 'GET') return next()
                const urlPath = (req.url || '').split('?')[0]
                if (urlPath.startsWith('/assets/')) return next()
                const ext = path.extname(urlPath)
                if (ext && ext !== '.html') return next()
                if (urlPath === '/' || urlPath === '/index.html') return next()
                const rel = urlPath.startsWith('/') ? urlPath.slice(1) : urlPath
                const filePath = path.join(dist, rel)
                try {
                    if (!fs.existsSync(filePath)) {
                        req.url = '/index.html'
                    }
                } catch {
                    req.url = '/index.html'
                }
                next()
            })
        },
    }
}

export default defineConfig({
    plugins: [react(), spaFallbackPreview()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
