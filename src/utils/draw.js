import { get } from 'svelte/store'

import { Mandelbrot } from 'src/wasm'
import { memory } from 'src/wasm/mandelbrot_wasm_bg.wasm'

import { draw as drawStore } from 'src/stores/settings'
import { DEFAULT as color_palette } from 'src/utils/palette'

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

	const pixelColorsPtr = mandelbrot.pixel_colors()
	const pixel_colors = new Uint16Array(memory.buffer, pixelColorsPtr, len)

	let color

	for (let i = 0, j = 0; i < len; i++, j += 4) {
		color = color_palette[pixel_colors[i]]

		image.data[j] = color[0]
		image.data[j + 1] = color[1]
		image.data[j + 2] = color[2]
	}

	return image
}
