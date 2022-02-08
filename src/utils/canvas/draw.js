import { wasmLoaded, loading } from 'src/stores/load'

import { default as MandelbrotModule } from 'src/wasm/mandelbrot.js'

let Module
let calcPlane

// https://stackoverflow.com/a/53384917
MandelbrotModule().then(function (mod) {
	Module = mod
	calcPlane = mod.cwrap('calcPlane', null, [
		'number',
		'number',
		'number',
		'number',
		'array',
	])

	wasmLoaded.set(true)
	loading.set(false)
})

/**
 * Draw mandelbrot on image
 *
 * @param  {ImageData} image Image from canvas
 * @return {ImageData}       Resulting image
 */
export function drawMandelbrot(image) {
	loading.set(true)

	let w = image.width,
		h = image.height

	const len = w * h

	// Work with arrays
	// https://stackoverflow.com/a/23917034
	// https://stackoverflow.com/a/41878939
	// https://emscripten.org/docs/api_reference/preamble.js.html#getValue
	let buffer = Module._malloc(len)
	Module.HEAP8.set(new Int8Array(Array(len)).buffer)

	calcPlane(-2, 1, w, h, buffer)

	let result = []
	for (let i = 0; i < len; i++) {
		// I don't know why, maybe it depends on types of array elements
		// but multiply i by 2 helps to get right array from wasm
		result.push(Module.getValue(buffer + i * 2))
	}

	Module._free(buffer)

	for (let i = 0, j = 0; i < len; i++, j += 4) {
		if (result[i]) {
			// black
			image.data[j] = 0
			image.data[j + 1] = 0
			image.data[j + 2] = 0
		} else {
			// white
			image.data[j] = 255
			image.data[j + 1] = 255
			image.data[j + 2] = 255
		}
	}

	loading.set(false)

	return image
}
