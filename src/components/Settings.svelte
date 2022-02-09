<script context="module">
	import Button from 'src/components/atoms/Button.svelte'
	import InputNumber from 'src/components/atoms/InputNumber.svelte'

	import { settings } from 'src/stores/draw'
	import { wasm } from 'src/stores/load'

	function getLoadText(state) {
		/* eslint-disable indent */
		switch (state) {
			case 'load':
			case 'calc':
				return 'Loading'
			case 'fail':
				return 'Fail'
			default:
				return 'Refresh'
		}
	}
</script>

<script>
	export let draw

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
			<Button
				on:click={() => window.location.reload()}
				danger={$wasm === 'fail'}>
				{getLoadText($wasm)}
			</Button>
		</div>

		<div class="flex">
			<p>x: [</p>
			<InputNumber bind:value={$settings.lx} />
			<p>;</p>
			<InputNumber bind:value={$settings.rx} />
			<p>]</p>
		</div>

		<a
			href="//github.com/istudyatuni/mandelbrot"
			class="flex float-right mt-5 text-sky-600 hover:text-sky-800">
			<span>GitHub</span>
			<img src="assets/icons/github.svg" alt="" class="ml-2" />
		</a>
	{:else}
		<Button on:click={toggleShow}>Show settings</Button>
	{/if}
</div>
