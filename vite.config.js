import postcss from './postcss.config.js'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// for importing from *.wasm files
import wasm from 'vite-plugin-wasm'

import path from 'path'

/**
 * @type {import('vite').UserConfig}
 */
const config = {
	plugins: [svelte(), wasm()],
	css: { postcss },
	resolve: {
		alias: {
			src: path.resolve(__dirname, './src'),
		},
	},
	esbuild: {
		include: ['js', 'svelte'],
	},
	clearScreen: false,
	server: {
		port: 8080,
	},
	build: {
		sourcemap: true,
		minify: true,
		outDir: 'build',
		target: 'esnext',
	},
	base: '/mandelbrot/',
}

export default config
