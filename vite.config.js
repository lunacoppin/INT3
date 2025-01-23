import { defineConfig } from 'vite';

export default defineConfig({
    base: '/INT3/', 
    build: {
        outDir: 'dist', 
        emptyOutDir: true, 
    },
});