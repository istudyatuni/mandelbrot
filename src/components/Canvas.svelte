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
		gl = null,
		/** @type {ImageData} */
		field

	function init() {
		gl = canvas.getContext('2d')
		gl.rect(0, 0, width, height)
		gl.fillStyle = 'white'
		gl.fill()

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
	}

	onMount(init)
</script>

<canvas bind:this={canvas} {width} {height} />
