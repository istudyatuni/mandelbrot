<script>
	export let danger = false,
		disabled = false
</script>

<button
	class="rounded px-3 py-2 bg-gray-300 disabled:opacity-50 {$$props.class}"
	on:click
	class:text-red-500={danger}
	{disabled}>
	<slot />
</button>
