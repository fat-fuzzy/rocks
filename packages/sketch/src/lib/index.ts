// Reexport your entry components here

import './styles/grid-sketch.css' /* Use for a Sketch layout */
import './styles/sketch.css' /* Use for player inputs layout */
import './styles/geometry.css' /* Use for geometry inputs **/
/**
 * Compositions - Graphics
 */
import Geometry2D from '$lib/components/geometry/Geometry2D.svelte'
import Geometry3D from '$lib/components/geometry/Geometry3D.svelte'
import Player from '$lib/components/player/Player.svelte'
import Sketch from '$lib/components/Sketch.svelte'

const graphics = {
	// Geometry2D,
	// Geometry3D,
	// Player,
	Sketch,
}

export {graphics}
