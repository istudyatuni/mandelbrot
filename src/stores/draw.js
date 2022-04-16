import { sessionStore } from 'svelte-storages'

/**
 * left `x`, right `x`, top `y`, bottom `y`
 */
export const settings = sessionStore('draw-settings', {
	lx: -3,
	rx: 1,
	ty: null,
	by: null,
})
