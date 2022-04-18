import { sessionStore } from 'svelte-storages'

/**
 * left `x`, right `x`, `y` center
 */
export const settings = sessionStore('draw-settings', {
	lx: -3,
	rx: 1,
	yc: 0,
})
