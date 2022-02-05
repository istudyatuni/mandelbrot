<script context="module">
	import Canvas from 'src/components/Canvas.svelte'

	import { wasmLoaded } from 'src/stores/loaded'
</script>

<script>
	let width, height
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

{#if width !== undefined && height !== undefined && $wasmLoaded}
	<Canvas {width} {height} />
{/if}
