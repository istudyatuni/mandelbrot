import { Mandelbrot } from 'src/wasm'
import { memory } from 'src/wasm/mandelbrot_wasm_bg.wasm'

/** @type {Mandelbrot} */
let mandelbrot = null

const IS_IN = 0

/**
 * Draw mandelbrot on image
 *
 * @param  {ImageData}          image Image from canvas
 * @param  {number}             lx    Left x of complex plane
 * @param  {number}             rx    Right x of complex plane
 * @return {ImageData}                Resulting image
 */
export function drawMandelbrot(image, lx, rx) {
	let w = image.width,
		h = image.height
	const len = w * h

	if (mandelbrot === null) {
		// init struct object
		mandelbrot = Mandelbrot.new(len)
	}

	mandelbrot.calc(lx, rx, w, h, len)

	const pixelsPtr = mandelbrot.pixels()
	const pixels = new Uint8Array(memory.buffer, pixelsPtr, len)

	let color

	for (let i = 0, j = 0; i < len; i++, j += 4) {
		color = pixels[i]

		if (color === IS_IN) {
			image.data[j] = IS_IN
			image.data[j + 1] = IS_IN
			image.data[j + 2] = IS_IN
		} else {
			image.data[j] = color / 255
			image.data[j + 1] = 255 - color
			image.data[j + 2] = color % 255
		}
	}

	return image
}
