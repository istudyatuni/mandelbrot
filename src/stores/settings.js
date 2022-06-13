import { get } from 'svelte/store'

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
})

export const settings = sessionStore('settings', {
	palette: default_map,
	show_settings: false,
})

function parseHash() {
	let hash = location.hash.slice(1)
	if (hash === '') {
		return
	}
	for (let entry of hash.split('&')) {
		let [key, value] = entry.split('=')
		if (['lx', 'rx', 'yc'].includes(key)) {
			draw.set(key, parseFloat(value))
		} else if (['palette'].includes(key)) {
			settings.set(key, value)
		}
	}
	resetHash()
}

parseHash()

export function setHash() {
	let d = get(draw),
		s = get(settings)
	let params = new URLSearchParams([
		['lx', d.lx],
		['rx', d.rx],
		['yc', d.yc],
		['palette', s.palette],
	])
	location.hash = params.toString()
}

export function resetHash() {
	location.hash = ''
}
