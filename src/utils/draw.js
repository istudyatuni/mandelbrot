import { get } from 'svelte/store'

import { Mandelbrot } from 'src/wasm'
import { memory } from 'src/wasm/mandelbrot_wasm_bg.wasm'

import { draw as drawStore } from 'src/stores/settings'

/** @type {Mandelbrot} */
let mandelbrot = null

/**
 * Draw mandelbrot on image
 *
 * @param  {ImageData}          image Image from canvas
 * @return {ImageData}                Resulting image
 */
export function drawMandelbrot(image) {
	let w = image.width,
		h = image.height
	const len = w * h

	if (mandelbrot === null) {
		// init struct object
		mandelbrot = Mandelbrot.new(len)
	}

	const set = get(drawStore)
	mandelbrot.calc(set.lx, set.rx, set.yc, w, h)

	const pixelsPtr = mandelbrot.pixels()
	const pixels = new Float32Array(memory.buffer, pixelsPtr, len)

	let color

	for (let i = 0, j = 0; i < len; i++, j += 4) {
		color = pixels[i] * 360

		image.data[j] = color
		image.data[j + 1] = color
		image.data[j + 2] = color
	}

	return image
}
