// Reexport your entry components here

import './styles/css/debug.css' /* Use for a Sketch layout */
import './styles/scss/grid-sketch.scss' /* Use for a Sketch layout */
import './styles/css/grid-sketch.css' /* Use for a Sketch layout */
import './styles/css/sketch.css' /* Use for player inputs layout */
import './styles/css/player.css' /* Use for player inputs layout */
import './styles/css/geometry.css' /* Use for geometry inputs **/
/**
 * Compositions - Graphics
 */
import Geometry2D from '$lib/components/geometry/Geometry2D.svelte'
import Geometry3D from '$lib/components/geometry/Geometry3D.svelte'
import Player from '$lib/components/player/Player.svelte'
import Sketch from '$lib/components/sketch/Sketch.svelte'

const graphics = {
	// Geometry2D,
	// Geometry3D,
	// Player,
	Sketch,
}

export {graphics}
