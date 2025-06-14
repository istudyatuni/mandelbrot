import { writable } from 'svelte/store'

// re-call draw
export const redraw = writable(false)
// reload page
export const reload = writable(false)

export const canvasLoading = writable(false)
