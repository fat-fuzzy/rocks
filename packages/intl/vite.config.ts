import {defineConfig} from 'vite'

export default defineConfig({
	build: {
		outDir: 'dist',
		lib: {
			entry: 'src/index.ts',
			formats: ['es'],
			fileName: (format) => `index.${format}.js`, // Output file naming convention
		},
		rollupOptions: {
			output: {
				entryFileNames: '[name].js',
				chunkFileNames: '[name].js',
			},
		},
	},
})
