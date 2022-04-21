<script context="module">
	import { onMount } from 'svelte'
	import { get } from 'svelte/store'

	import { settings } from 'src/stores/draw'
	import { scaleCoordinates } from 'src/utils/coordinates'
	import { drawMandelbrot } from 'src/utils/draw'
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

	function draw() {
		field = gl.getImageData(0, 0, width, height)
		field = drawMandelbrot(field)
		gl.putImageData(field, 0, 0)
	}

	/**
	 * Calculate new borders and draw
	 * @param {PointerEvent} e
	 */
	function scaleDraw(e) {
		const st = get(settings)
		let coords = scaleCoordinates(st, width, height, e.clientX, e.clientY)

		settings.set('lx', coords.lx)
		settings.set('rx', coords.rx)
		settings.set('yc', coords.yc)

		draw()
	}

	onMount(init)
</script>

<canvas bind:this={canvas} {width} {height} on:click={scaleDraw} />
