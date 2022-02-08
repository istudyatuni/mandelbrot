<script context="module">
	import Button from 'src/components/atoms/Button.svelte'

	import { load } from 'src/stores/load'
</script>

<script>
	export let draw

	let show = true

	$: loadText = $load ? 'Loading' : 'Refresh'
</script>

<div class="absolute rounded bg-gray-200 m-5 select-none" class:p-2={show}>
	<Button on:click={() => (show = !show)}>
		{show ? 'Hide' : 'Show settings'}
	</Button>

	{#if show}
		<Button class="ml-2" on:click={draw}>{loadText}</Button>
	{/if}
</div>
