<script context="module">
	import Canvas from 'src/components/Canvas.svelte'
	import Spinner from 'src/components/Spinner.svelte'

	import { loading, wasmLoaded } from 'src/stores/load'
</script>

<script>
	let width, height
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

{#if $loading}
	<Spinner />
{/if}

{#if width !== undefined && height !== undefined && $wasmLoaded}
	<Canvas {width} {height} />
{/if}
