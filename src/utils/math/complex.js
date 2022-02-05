export function coords2complex(x, y /*, sx, sy*/, sw, sh) {
	return new Complex(x - sw / 2, sh - y - sh / 2)
}

/**
 * Complex number
 *
 * `Complex(5, 6)` is 5x + 6i
 */
export class Complex {
	constructor(x, i = 0) {
		this.x = x
		this.i = i
	}
	add(c) {
		return new Complex(this.x + c.x, this.i + c.i)
	}
	sub(c) {
		return new Complex(this.x - c.x, this.i - c.i)
	}
	abs() {
		return Math.sqrt(Math.pow(this.x) + Math.pow(this.i))
	}
	eq(c) {
		return this.x === c.x && this.i === c.i
	}
	pow2() {
		return new Complex(
			Math.pow(this.x, 2) - Math.pow(this.i, 2),
			2 * this.x * this.i
		)
	}
}
