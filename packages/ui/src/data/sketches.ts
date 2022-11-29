import type {Sketch} from './data'

import {frag} from './shaders/fragment-shader-2d'
import {vert} from './shaders/vertex-shader-2d'
import {vert as vert2d} from './shaders/vertex-shader-scale-2d'

export const SKETCHES_FOLDER = './sketches'
export const sketches: Sketch[] = [
	{
		id: 'random-rect',
		slug: 'random-rect',
		title: 'Random',
		emoji: '🎰',
		duration: 2000,
		vert,
		frag,
		draw: 'rectanglesScene',
	},
	{
		id: 'random-rect-audio',
		slug: 'random-rect-audio',
		title: 'Audio',
		emoji: '🥁',
		audio: true,
		duration: 4179,
		playbackRate: 2,
		vert,
		frag,
		draw: 'rectanglesScene',
	},
	// {
	// 	id: '2d-rectangle',
	// 	slug: 'd-rectangle',
	// 	title: '2D Rectangle',
	// 	emoji: '📐',
	// 	interactive: true,
	// 	webGlProps: null,
	// 	vert: vert2d,
	// 	frag,
	// 	color: null,
	// 	draw: 'rectangle2D',
	// },
	{
		id: '2d-geometry',
		slug: 'd-geometry',
		title: '2D Geometry',
		emoji: '📐',
		interactive: true,
		webGlProps: null,
		vert: vert2d,
		frag,
		color: null,
		draw: 'geometry2D',
	},
	{
		id: '2d-matrices',
		slug: '2d-matrices',
		title: '2D Matrices',
		emoji: '📐',
		interactive: true,
		webGlProps: null,
		vert: vert2d,
		frag,
		color: null,
		draw: 'matrices2D',
	},
	{
		id: 'poop',
		slug: 'poop',
		title: 'A Feature',
		emoji: '💩',
		type: 'test',
		draw: null,
	},
]
