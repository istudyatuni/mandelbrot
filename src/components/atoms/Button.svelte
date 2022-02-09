<script>
	export let danger = false
</script>

<button
	class="rounded px-3 py-2 bg-gray-300 {$$props.class}"
	on:click
	class:text-red-500={danger}>
	<slot />
</button>
