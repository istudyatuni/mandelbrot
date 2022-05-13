<script context="module">
	import { onMount } from 'svelte'
	import { get } from 'svelte/store'

	import { draw as drawStore } from 'src/stores/settings'
	import { scaleCoordinates } from 'src/utils/coordinates'
	import { drawMandelbrot, initDraw } from 'src/utils/draw'
</script>

<script>
	export let width, height

	/** @type {HTMLCanvasElement} */
	let canvas,
		/** @type {CanvasRenderingContext2D} */
		gl = null

	function init() {
		gl = canvas.getContext('2d')
		gl.rect(0, 0, width, height)
		gl.fill()

		initDraw(gl, width, height)

		drawMandelbrot()
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

		drawMandelbrot()
	}

	onMount(init)
</script>

<canvas bind:this={canvas} {width} {height} on:click={scaleDraw} />
