<script context="module">
	import { onMount, tick } from 'svelte'

	import { settings } from 'src/stores/draw'
	import { wasm } from 'src/stores/load'

	import { drawMandelbrot } from 'src/utils/canvas/draw'
</script>

<script>
	export let width, height

	/** @type {HTMLCanvasElement} */
	let canvas,
		/** @type {CanvasRenderingContext2D} */
		gl = null,
		/** @type {ImageData} */
		field

	function init() {
		gl = canvas.getContext('2d')
		gl.rect(0, 0, width, height)
		gl.fillStyle = 'white'
		gl.fill()

		gl.strokeStyle = 'black'

		draw()
	}

	export async function draw() {
		// not works (status not shown)
		wasm.set('calc')
		await tick()

		field = gl.getImageData(0, 0, width, height)

		field = await drawMandelbrot(field, $settings.lx, $settings.rx)

		gl.putImageData(field, 0, 0)
		wasm.set('none')

		drawAxis($settings.lx, $settings.rx, width, height)
	}

	function drawAxis(lx, rx, width, height) {
		if (lx < 0 && rx > 0) {
			// y axis
			let xw = rx - lx
			let scale = width / xw
			let ypix = Math.abs(lx) * scale

			drawLine(ypix, 0, ypix, height)
		}

		// x axis now hardcoded to center
		let xpix = height / 2
		drawLine(0, xpix, width, xpix)
	}

	function drawLine(sx, sy, ex, ey) {
		gl.beginPath()
		gl.moveTo(sx, sy)
		gl.lineTo(ex, ey)
		gl.stroke()
	}

	onMount(init)
</script>

<canvas bind:this={canvas} {width} {height} />
