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
	{
		id: '2D',
		slug: '2D',
		title: '2D',
		emoji: '📐',
		interactive: true,
		webGlProps: null,
		vert: vert2d,
		frag,
		color: null,
		draw: 'translationSceneViaWebGL',
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
