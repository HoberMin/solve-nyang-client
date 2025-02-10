import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        visualizer({
            open: true,
            filename: 'dist/stats.html',
            gzipSize: true,
            brotliSize: true,
        }),
    ],
    resolve: {
        alias: [{ find: '@', replacement: '/src' }],
    },
    build: {
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-sentry': ['@sentry/react'],
                    'vendor-router': ['react-router-dom'],
                    'vendor-query': ['@tanstack/react-query'],
                    'vendor-axios': ['axios'],
                    'vendor-react': ['react', 'react-dom'],
                },
            },
        },
    },
});
