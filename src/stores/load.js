import { derived, writable } from 'svelte/store'

// none, load, calc, fail
export const wasm = writable('load')

export const load = derived(wasm, ($wasm, set) => {
	set($wasm === 'calc' || $wasm === 'load')
})
