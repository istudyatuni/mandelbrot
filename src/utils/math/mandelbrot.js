import { Complex } from 'src/utils/math/complex.js'

const R = 2,
	N = 1000,
	z0 = new Complex(0)

/**
 * Check if all series elements < 2
 *
 * Series: z^2 + c
 *
 * @param  {Complex} c Point
 * @return {Boolean}   Result
 */
export function checkSeries(c) {
	let tmp = z0.add(c)

	for (let i = 1; i < N; i++) {
		if (tmp.abs() >= R) {
			return false
		}

		tmp = tmp.pow2().add(c)
	}

	return true
}
