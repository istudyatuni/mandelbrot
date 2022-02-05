<script context="module">
	import { onMount } from 'svelte'

	import { drawMandelbrot } from 'src/utils/canvas/draw'
</script>

<script>
	export let width, height

	/** @type {HTMLCanvasElement} */
	let canvas,
		gl,
		/** @type {ImageData} */
		field

	onMount(() => {
		gl = canvas.getContext('2d')
		gl.rect(0, 0, width, height)
		gl.fillStyle = 'black'
		gl.fill()
		field = gl.getImageData(0, 0, width, height)

		field = drawMandelbrot(field)

		gl.putImageData(field, 0, 0)
	})
</script>

<canvas bind:this={canvas} {width} {height} />
