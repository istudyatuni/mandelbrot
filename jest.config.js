/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
	...require('@snowpack/app-scripts-svelte/jest.config.js')(),
}

config.testMatch.push('<rootDir>/test/**/*.{spec,test}.{js,jsx,ts,tsx}')

module.exports = config
