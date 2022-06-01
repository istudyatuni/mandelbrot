import { get } from 'svelte/store'

import { Mandelbrot } from 'src/wasm'
import { memory } from 'src/wasm/mandelbrot_wasm_bg.wasm'

import { load_palette } from 'src/utils/maps'
import { redraw as redrawStore } from 'src/stores/refresh'
import { draw as drawStore, settings, resetHash } from 'src/stores/settings'

const DEPTH = 256

/** @type {Array} */
let color_palette = await load_palette(get(settings).palette)
let palette_size = color_palette.length

/** @type {Mandelbrot} */
let mandelbrot = null

/** @type {CanvasRenderingContext2D} */
let gl = null,
	width = null,
	height = null

/**
 * Pass objects. Should be called before draw
 * @param  {CanvasRenderingContext2D} gl Context
 */
export function initDraw(gl_context, field_width, field_height) {
	gl = gl_context
	width = field_width
	height = field_height
}

/**
 * Draw mandelbrot on canvas
 */
export function drawMandelbrot() {
	let image = gl.getImageData(0, 0, width, height)
	let w = image.width,
		h = image.height
	const len = w * h

	if (mandelbrot === null) {
		// init struct object
		mandelbrot = Mandelbrot.new(len)
	}

	const set = get(drawStore)
	mandelbrot.calc(set.lx, set.rx, set.yc, w, h)

	const pixelColorsPtr = mandelbrot.pixel_steps()
	const pixel_steps = new Uint16Array(memory.buffer, pixelColorsPtr, len)

	let color, ind

	for (let i = 0, j = 0; i < len; i++, j += 4) {
		ind = Math.floor((pixel_steps[i] / DEPTH) * palette_size)
		color = color_palette[ind]

		image.data[j] = color[0]
		image.data[j + 1] = color[1]
		image.data[j + 2] = color[2]
		// image.data[j + 3] is alpha
	}

	gl.putImageData(image, 0, 0)
	redrawStore.set(false)
	resetHash()
}
