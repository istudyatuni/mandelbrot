<script>
	export let disabled = false
</script>

<button
	class="rounded px-3 py-2 bg-gray-300 disabled:opacity-50 {$$props.class}"
	on:click
	{disabled}>
	<slot />
</button>
