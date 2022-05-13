<script>
	export let value,
		wider = false
	$: wider_class = wider ? 'w-2/5' : 'w-1/4'
</script>

<span class="rounded mx-1 {wider_class}">
	<input type="number" class="w-full px-1 rounded" bind:value on:change />
</span>
