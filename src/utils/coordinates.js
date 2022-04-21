export function scaleCoordinates(
	{ lx, rx, yc },
	width,
	height,
	clientX,
	clientY
) {
	// complex width
	let w = rx - lx
	// scale coeff
	let scale = width / w
	// complex height
	let h = height / scale

	let xoffset = clientX / scale
	let yoffset = clientY / scale
	let yt = yc + h / 2

	return {
		lx: lx + xoffset / 2,
		rx: rx - (w - xoffset) / 2,
		yc: yt - yoffset,
	}
}
