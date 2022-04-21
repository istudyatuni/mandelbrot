<script context="module">
	import Button from 'src/components/atoms/Button.svelte'
	import InputNumber from 'src/components/atoms/InputNumber.svelte'

	import { settings } from 'src/stores/draw'
	import { refresh } from 'src/stores/refresh'
</script>

<script>
	let show = true

	function toggleShow() {
		show = !show
	}
</script>

<div class="absolute rounded bg-gray-200 m-5 select-none" class:p-2={show}>
	{#if show}
		<div class="flex justify-between mb-3">
			<Button on:click={toggleShow} class="mr-2">Hide</Button>
			<Button on:click={() => window.location.reload()} disabled={!$refresh}>
				Refresh
			</Button>
		</div>

		<div class="flex mb-2">
			<p>x: [</p>
			<InputNumber bind:value={$settings.lx} />
			<p>;</p>
			<InputNumber bind:value={$settings.rx} />
			<p>]</p>
		</div>

		<div class="flex">
			<p>y:</p>
			<InputNumber bind:value={$settings.yc} />
		</div>

		<a
			href="//github.com/istudyatuni/mandelbrot"
			class="flex mt-5 text-sky-600 hover:text-sky-800">
			<img src="assets/icons/github.svg" alt="" class="mr-2" />
			<span class="pt-1">GitHub</span>
		</a>
	{:else}
		<Button on:click={toggleShow}>Show settings</Button>
	{/if}
</div>
