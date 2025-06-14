<script context="module">
	import { tick, onMount } from 'svelte'
	import { get } from 'svelte/store'

	import { draw as drawStore } from 'src/stores/settings'
	import { scaleCoordinates } from 'src/utils/coordinates'
	import { drawMandelbrot, initDraw } from 'src/utils/draw'
	import { canvasLoading } from 'src/stores/refresh'
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
	async function scaleDraw(e) {
		const st = get(drawStore)
		let coords = scaleCoordinates(st, width, height, e.clientX, e.clientY)

		drawStore.set('lx', coords.lx)
		drawStore.set('rx', coords.rx)
		drawStore.set('yc', coords.yc)

		canvasLoading.set(true)
		// await tick()

		drawMandelbrot()
		setTimeout(() => {
			canvasLoading.set(false)
		}, 2000)

		// setTimeout(drawMandelbrot, 400)
		/*requestAnimationFrame(() => {
			requestAnimationFrame(() => drawMandelbrot())
		})*/

		// await tick()
		// canvasLoading.set(false)
	}

	onMount(init)
</script>

<canvas bind:this={canvas} {width} {height} on:click={scaleDraw} />
