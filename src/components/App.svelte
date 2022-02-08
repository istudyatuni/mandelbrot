<script context="module">
	import Canvas from 'src/components/Canvas.svelte'
	import Settings from 'src/components/Settings.svelte'
</script>

<script>
	let width, height

	// function
	let draw
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<Settings {draw} />

{#if width !== undefined && height !== undefined}
	<Canvas {width} {height} bind:draw />
{/if}
