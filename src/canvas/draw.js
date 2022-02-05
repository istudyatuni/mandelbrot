import { coords2complex } from 'src/utils/math/complex'
import { checkSeries } from 'src/utils/math/mandelbrot'

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
	let c, pos

	// big step because pretty slow
	for (let x = 0; x < width; x += 20) {
		for (let y = 0; y < height; y += 10) {
			c = coords2complex(x, y, width, height)
			if (checkSeries(c)) {
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
