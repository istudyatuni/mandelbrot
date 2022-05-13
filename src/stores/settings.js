import { sessionStore } from 'svelte-storages'

import { default_map } from 'src/config'

/**
 * - `lx`: left x of complex plane
 * - `rx`: right x of complex plane
 * - `yc`: center y of complex plane
 */
export const draw = sessionStore('draw-settings', {
	lx: -3,
	rx: 1,
	yc: 0,
	depth: 0,
})

export const settings = sessionStore('settings', {
	palette: default_map,
	show_settings: true,
})
