<script context="module">
	import Canvas from 'src/components/Canvas.svelte'
</script>

<script>
	let width, height
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

{#if width !== undefined && height !== undefined}
	<Canvas {width} {height} />
{/if}
