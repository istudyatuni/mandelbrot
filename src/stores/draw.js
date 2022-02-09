import { sessionStore } from 'svelte-storages'

export const settings = sessionStore('draw-settings', { lx: -5, rx: 3 })
