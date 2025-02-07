import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
export default defineConfig({
    plugins: [react(), tsconfigPaths(), sentryVitePlugin({
        org: "solve-nyang",
        project: "javascript-react"
    })],
    resolve: {
        alias: [{ find: '@', replacement: '/src' }],
    },
    build: {
        sourcemap: true,
    },
});