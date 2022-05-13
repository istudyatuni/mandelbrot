<script context="module">
	import Canvas from 'src/components/Canvas.svelte'
	import Settings from 'src/components/Settings.svelte'

	import { reload } from 'src/stores/refresh'
</script>

<script>
	let width, height
</script>

<svelte:window
	bind:innerWidth={width}
	bind:innerHeight={height}
	on:resize={() => reload.set(true)} />

<Settings />

{#if width !== undefined && height !== undefined}
	<Canvas {width} {height} />
{/if}
