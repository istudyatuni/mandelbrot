import postcss from './postcss.config.js'
import { svelte } from '@sveltejs/vite-plugin-svelte'

import path from 'path'

/**
 * @return {import('vite').ProxyOptions}
 */
/*const singleProxy = (path, port) => ({
	target: 'http://localhost:' + port,
	changeOrigin: true,
	rewrite: (url) => url.replace(new RegExp(`^/${path}`), ''),
})*/

/**
 * @type {import('vite').UserConfig}
 */
const config = {
	plugins: [svelte()],
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
		proxy: {
			// '/api': singleProxy('api', 4000),
		},
	},
	build: {
		sourcemap: true,
		minify: true,
		outDir: 'build',
	},
	// base: '/',
}

export default config
