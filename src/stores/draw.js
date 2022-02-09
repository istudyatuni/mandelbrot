import { sessionStore } from 'svelte-storages'

export const settings = sessionStore('draw-settings', { lx: -3, rx: 1 })
