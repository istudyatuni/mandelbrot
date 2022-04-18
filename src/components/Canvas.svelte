<script context="module">
	import { onMount } from 'svelte'

	import { settings } from 'src/stores/draw'

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
		gl.fillStyle = 'black'
		gl.fill()

		draw()
	}

	async function draw() {
		field = gl.getImageData(0, 0, width, height)
		field = drawMandelbrot(field, $settings.lx, $settings.rx)
		gl.putImageData(field, 0, 0)
	}

	onMount(init)
</script>

<canvas bind:this={canvas} {width} {height} />
