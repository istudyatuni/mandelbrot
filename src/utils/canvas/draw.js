import { default as MandelbrotModule } from 'src/wasm/mandelbrot.js'

let Module
let calcPlane

let ModulePromise = MandelbrotModule()

// https://stackoverflow.com/a/53384917
function init(mod) {
	Module = mod
	calcPlane = mod.cwrap('calcPlane', null, [
		'number',
		'number',
		'number',
		'number',
		'array',
	])
}

/**
 * Draw mandelbrot on image
 *
 * @param  {ImageData}          image Image from canvas
 * @param  {number}             lx    Left x of complex plane
 * @param  {number}             rx    Right x of compmlex plane
 * @return {Promise<ImageData>}       Promise with resulting image
 */
export async function drawMandelbrot(image, lx, rx) {
	if (ModulePromise !== null) {
		init(await ModulePromise)

		ModulePromise = null
	}

	let w = image.width,
		h = image.height

	const len = w * h

	// Work with arrays
	// https://stackoverflow.com/a/23917034
	// https://stackoverflow.com/a/41878939
	// https://emscripten.org/docs/api_reference/preamble.js.html#getValue
	let buffer = Module._malloc(len)
	Module.HEAP8.set(new Int8Array(Array(len)).buffer)

	calcPlane(lx, rx, w, h, buffer)

	let result = []
	for (let i = 0; i < len; i++) {
		// I don't know why, maybe it depends on type of array elements
		// but multiply i by 2 helps to get right array from wasm
		result.push(Module.getValue(buffer + i * 2))
	}

	Module._free(buffer)

	for (let i = 0, j = 0; i < len; i++, j += 4) {
		if (result[i]) {
			// white
			image.data[j] = 255
			image.data[j + 1] = 255
			image.data[j + 2] = 255
		} else {
			// black
			image.data[j] = 0
			image.data[j + 1] = 0
			image.data[j + 2] = 0
		}
	}

	return image
}
