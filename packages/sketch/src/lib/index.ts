// Reexport your entry components here
/// <reference path="./types/index.d.ts" />
import type {FatFuzzySketch} from '$types'

import './styles/css/sketch.css' /* Use for player inputs layout */
import './styles/css/geometry.css' /* Use for geometry inputs **/
/**
 * Compositions - Graphics
 */
// import Geometry2D from '$lib/components/geometry/Geometry2D.svelte'
// import Geometry3D from '$lib/components/geometry/Geometry3D.svelte'
// import Player from '$lib/components/player/Player.svelte'
import Sketch from '$lib/components/sketch/Sketch.svelte'

const graphics = {
	// Geometry2D,
	// Geometry3D,
	// Player,
	Sketch,
}

export default {graphics} as FatFuzzySketch
