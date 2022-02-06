import { writable } from 'svelte/store'

export const loading = writable(true)

export const wasmLoaded = writable(false)
