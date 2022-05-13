<script context="module">
	import Button from 'src/components/atoms/Button.svelte'
	import InputNumber from 'src/components/atoms/InputNumber.svelte'

	import {
		draw as drawStore,
		settings,
		setHash,
		resetHash,
	} from 'src/stores/settings'
	import { refresh as refreshStore } from 'src/stores/refresh'

	import { drawMandelbrot } from 'src/utils/draw'
	import { MAPS } from 'src/utils/maps'
</script>

<script>
	// total width of x axis
	$: xwidth = $drawStore.rx - $drawStore.lx
	// calculate how many times viewport was scaled by 2
	// 4 is initial width between [-3, 1]
	$: magnification_depth = Math.log2(4 / xwidth)

	function toggleShow() {
		settings.set('show_settings', !$settings.show_settings)
	}
	function decrease_depth() {
		let half_width = xwidth / 2
		drawStore.set('lx', $drawStore.lx - half_width)
		drawStore.set('rx', $drawStore.rx + half_width)
		should_refresh()
	}
	function increase_depth() {
		let quart_width = xwidth / 4
		drawStore.set('lx', $drawStore.lx + quart_width)
		drawStore.set('rx', $drawStore.rx - quart_width)
		should_refresh()
	}
	function should_refresh() {
		refreshStore.set(true)
	}
	function reset() {
		drawStore.set('lx', -3)
		drawStore.set('rx', 1)
		drawStore.set('yc', 0)
		resetHash()
		should_refresh()
	}
</script>

<div
	class="absolute rounded bg-gray-200 m-5 select-none"
	class:p-2={$settings.show_settings}>
	{#if $settings.show_settings}
		<div class="flex justify-between mb-3">
			<Button on:click={toggleShow} class="mr-2">Collapse</Button>
			<Button on:click={drawMandelbrot} disabled={!$refreshStore}>
				Redraw
			</Button>
		</div>

		<div class="flex mb-2">
			<p>x: [</p>
			<InputNumber bind:value={$drawStore.lx} on:change={should_refresh} />
			<p>;</p>
			<InputNumber bind:value={$drawStore.rx} on:change={should_refresh} />
			<p>]</p>
		</div>

		<div class="flex mb-2">
			<p>y:</p>
			<InputNumber bind:value={$drawStore.yc} on:change={should_refresh} />
		</div>

		<div class="mb-2">
			<p>
				Magnification depth: {magnification_depth}
				<Button on:click={decrease_depth} class="py-0.5">-</Button>
				<Button on:click={increase_depth} class="py-0.5">+</Button>
			</p>
		</div>

		<div class="flex mb-2">
			<p class="mr-2 pt-0.5">Color palette:</p>
			<select
				class="p-1 rounded capitalize"
				bind:value={$settings.palette}
				on:change={should_refresh}>
				{#each Object.entries(MAPS) as [key, map]}
					<option value={key}>{map.name}</option>
				{/each}
			</select>
		</div>

		<div class="flex justify-between mt-2">
			<Button on:click={reset}>Reset</Button>
			<Button on:click={setHash}>Share location and settings</Button>
		</div>

		<a
			href="//github.com/istudyatuni/mandelbrot"
			class="flex mt-5 text-sky-600 hover:text-sky-800">
			<img src="assets/icons/github.svg" alt="" class="mr-2" />
			<span class="pt-1">GitHub</span>
		</a>
	{:else}
		<Button on:click={toggleShow}>Expand settings</Button>
	{/if}
</div>
