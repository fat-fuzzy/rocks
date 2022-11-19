import * as draw from './draw.js'
import * as utils from './utils.js'

import {frag} from './shaders/fragment-shader-2d'
import {vert} from './shaders/vertex-shader-2d'
import {vert as vert2d} from './shaders/vertex-shader-scale-2d'

export const animations = [
	{
		id: 'random-rect',
		name: 'Random',
		emoji: '🎰',
		duration: 2000,
		vert,
		frag,
		init(canvas) {
			this.webGlProps = draw.initScene(canvas, this.vert, this.frag)
		},
		run(canvas) {
			if (!this.webGlProps) {
				this.init(canvas)
			}
			draw.rectanglesScene(this.webGlProps)
		},
		clear() {
			this.webGlProps = null
		},
	},
	{
		id: 'random-rect-audio',
		name: 'Audio',
		emoji: '🥁',
		audio: true,
		duration: 4179,
		playbackRate: 2,
		vert,
		frag,
		init(canvas) {
			this.webGlProps = draw.initScene(canvas, this.vert, this.frag)
		},
		run(canvas) {
			if (!this.webGlProps) {
				this.init(canvas)
			}
			draw.rectanglesScene(this.webGlProps)
		},
		clear() {
			this.webGlProps = null
		},
	},
	{
		id: '2D',
		name: '2D',
		emoji: '📐',
		interactive: true,
		webGlProps: null,
		vert: vert2d,
		frag,
		color: null,
		init(canvas) {
			this.webGlProps = draw.initScene(canvas, this.vert, this.frag)
		},
		run(canvas, geometry) {
			if (!this.webGlProps) {
				this.init(canvas)
			}
			const {color, translation, rotation, scale} = geometry
			this.color = color
			const drawOptions = {
				webGlProps: this.webGlProps,
				translation,
				rotation,
				scale,
				color,
			}
			draw.translationSceneViaWebGL(drawOptions)
		},
		update(geometry) {
			const {translation, rotation, scale} = geometry
			const drawOptions = {
				webGlProps: this.webGlProps,
				translation,
				rotation,
				scale,
				color: this.color,
			}
			draw.drawSceneT2DGL(drawOptions)
		},
		clear() {
			this.webGlProps = null
		},
	},
	{
		id: 'poop',
		name: 'A Feature',
		emoji: '💩',
		type: 'test',
		run() {
			throw Error('Not a Bug 💩')
		},
		clear() {
			// do nothing
		},
	},
]
