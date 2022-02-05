import { wasmLoaded } from 'src/stores/loaded'

import Module from 'src/wasm/mandelbrot.js'

let checkSeries

// https://stackoverflow.com/a/53384917
Module().then(function (mod) {
	checkSeries = mod.cwrap('checkSeries', 'boolean', ['number', 'number'])
	wasmLoaded.set(true)
})

function coords2complex(x, y /*, sx, sy*/, sw, sh) {
	return [x - sw / 2, sh - y - sh / 2]
}

function calcDataPos(x, y, w) {
	return (x * w + y) * 4
}

/**
 * Draw mandelbrot on image
 * @param  {ImageData} image Image from canvas
 * @return {ImageData}       Resulting image
 */
export function drawMandelbrot(image) {
	const width = image.width,
		height = image.height
	let pos, a, b, c

	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			console.log('i')

			c = coords2complex(x, y, width, height)
			a = c[0]
			b = c[1]

			if (checkSeries(a, b)) {
				pos = calcDataPos(x, y, width)

				// black
				image.data[pos] = 0
				image.data[pos + 1] = 0
				image.data[pos + 2] = 0
			}
		}
	}

	return image
}
