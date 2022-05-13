<script context="module">
	import { onMount } from 'svelte'
	import { get } from 'svelte/store'

	import { draw as drawStore } from 'src/stores/settings'
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
		const st = get(drawStore)
		let coords = scaleCoordinates(st, width, height, e.clientX, e.clientY)

		drawStore.set('lx', coords.lx)
		drawStore.set('rx', coords.rx)
		drawStore.set('yc', coords.yc)

		draw()

		drawStore.set('depth', $drawStore.depth + 1)
	}

	onMount(init)
</script>

<canvas bind:this={canvas} {width} {height} on:click={scaleDraw} />
