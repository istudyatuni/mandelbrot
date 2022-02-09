<script context="module">
	import Button from 'src/components/atoms/Button.svelte'
	import InputNumber from 'src/components/atoms/InputNumber.svelte'

	import { settings } from 'src/stores/draw'
	import { load } from 'src/stores/load'
</script>

<script>
	export let draw

	$: loadText = $load ? 'Loading' : 'Refresh'

	// show

	let show = true

	function toggleShow() {
		show = !show
	}
</script>

<div class="absolute rounded bg-gray-200 m-5 select-none" class:p-2={show}>
	{#if show}
		<div class="flex justify-between mb-3">
			<Button on:click={toggleShow} class="mr-2">Hide</Button>
			<Button on:click={draw}>{loadText}</Button>
		</div>

		<div class="flex">
			<p>x: [</p>
			<InputNumber bind:value={$settings.lx} />
			<p>;</p>
			<InputNumber bind:value={$settings.rx} />
			<p>]</p>
		</div>
	{:else}
		<Button on:click={toggleShow}>Show settings</Button>
	{/if}
</div>
