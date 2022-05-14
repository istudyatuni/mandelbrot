// palettes is from Fractint
// mirror: https://github.com/jhol/fractint/blob/master/maps

import { default_map } from 'src/config'
import { settings } from 'src/stores/settings'

export const MAPS = {
	altern: { name: 'altern' },
	blues: { name: 'blues' },
	chroma: { name: 'chromatic' },
	default: { name: 'default VGA' },
	defaultw: { name: 'default windows' },
	firestrm: { name: 'fire storm' },
	froth3: { name: 'froth 3' },
	froth316: { name: 'froth 316' },
	froth616: { name: 'froth 616' },
	froth6: { name: 'froth 6' },
	gamma1: { name: 'Pseudo-gray gamma 1.0' },
	gamma2: { name: 'Pseudo-gray gamma 2.0' },
	glasses1: { name: 'glasses 1' },
	glasses2: { name: 'glasses 2' },
	goodega: { name: 'good EGA' },
	green: { name: 'green' },
	grey: { name: 'grey' },
	grid: { name: 'grid' },
	headache: { name: 'headache' },
	landscap: { name: 'landscap' },
	lyapunov: { name: 'lyapunov' },
	neon: { name: 'neon' },
	paintjet: { name: 'paintjet' },
	royal: { name: 'royal purple' },
	topo: { name: 'topo' },
	volcano: { name: 'volcano' },
}

export async function load_palette(name) {
	if (MAPS[name] === undefined) {
		name = default_map
		settings.set('palette', name)
	}
	const response = await fetch(
		import.meta.env.BASE_URL + 'maps/' + name + '.map'
	)
	if (response.ok) {
		const map_text = await response.text()
		return convert_map(map_text)
	}
}

/**
 * @param  {String} map_text Text of .map file
 * @return {Number[][]}      Palette
 */
function convert_map(map_text) {
	return map_text
		.trim()
		.split('\n')
		.map((e) =>
			e
				.trim()
				.replace(/\s{2,}/g, ' ')
				.split(' ')
				.slice(0, 3)
				.map((e) => parseInt(e))
		)
}
