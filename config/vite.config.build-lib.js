import { resolve } from 'path';
import { defineConfig } from "vite";


export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, '../src/js-colormaps.js'),
            name: 'ColorMapEs',
            fileName: 'js-colormaps',
            formats: ['umd'],
        },
        outDir: "dist",
        rollupOptions: {
            output: {
                entryFileNames: 'js-colormaps.min.js',
            },
            plugins: [
                {
                    name: 'banner',
                    enforce: 'post',
                    generateBundle(options, bundle) {
                        const banner = `/**
* js-colormaps.js
* credit by timothygebhard (https://github.com/timothygebhard/js-colormaps)
* Me, Paper-Folding, just bundle it.
*/
`;
                        for (const module of Object.values(bundle)) {
                            if (module.type === "chunk") module.code = banner + module.code;
                        }
                    }
                }
            ]
        }
    }
})