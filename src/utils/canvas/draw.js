import { Mandelbrot } from 'src/wasm'
import { memory } from 'src/wasm/mandelbrot_wasm_bg.wasm'

/** @type {Mandelbrot} */
let mandelbrot = null

/**
 * Draw mandelbrot on image
 *
 * @param  {ImageData}          image Image from canvas
 * @param  {number}             lx    Left x of complex plane
 * @param  {number}             rx    Right x of complex plane
 * @return {Promise<ImageData>}       Promise with resulting image
 */
export function drawMandelbrot(image, lx, rx) {
	let w = image.width,
		h = image.height
	const len = w * h

	if (mandelbrot === null) {
		mandelbrot = Mandelbrot.new(len)
	}

	mandelbrot.calc(lx, rx, w, h, len)

	const pixelsPtr = mandelbrot.pixels()
	const pixels = new Uint8Array(memory.buffer, pixelsPtr, len)

	let color

	for (let i = 0, j = 0; i < len; i++, j += 4) {
		color = pixels[i]

		image.data[j] = color
		image.data[j + 1] = color
		image.data[j + 2] = color
	}

	return image
}
