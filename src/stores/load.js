import { derived, writable } from 'svelte/store'

// none, load, calc
export const wasm = writable('load')

export const load = derived(wasm, ($wasm, set) => {
	set($wasm === 'calc' || $wasm === 'load')
})
