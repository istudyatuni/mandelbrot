/** @type {import("snowpack").SnowpackUserConfig } */
export default {
	alias: {
		src: './src',
	},
	mount: {
		public: {
			url: '/',
			static: true,
			resolve: false,
		},
		src: '/dist',
	},
	plugins: [
		'@snowpack/plugin-svelte',
		'@snowpack/plugin-postcss',
		'@snowpack/plugin-dotenv',
	],
	routes: [
		/* Enable an SPA Fallback in development: */
		// { match: 'routes', src: '.*', dest: '/index.html' },
	],
	optimize: {
		// bundle: true,
		minify: true,
		sourcemap: false,
	},
	devOptions: {
		open: 'none',
		// with wasm it's can be slow and buggy
		hmr: false,
	},
	buildOptions: {
		htmlFragments: true,
		// baseUrl: '/',
		metaUrlPath: 'snowpack',
	},
}
