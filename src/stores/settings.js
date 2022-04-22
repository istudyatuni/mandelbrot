import { sessionStore } from 'svelte-storages'

/**
 * - `lx`: left x of complex plane
 * - `rx`: right x of complex plane
 * - `yc`: center y of complex plane
 */
export const draw = sessionStore('draw-settings', {
	lx: -3,
	rx: 1,
	yc: 0,
})

export const settings = sessionStore('settings', {
	show_settings: true,
})
