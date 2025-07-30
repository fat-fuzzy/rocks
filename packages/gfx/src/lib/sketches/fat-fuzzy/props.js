import wings from './wings/index'
import utils from '../../math/utils.js'

const BONES = {
	magnitude: [160, 220, 200, 100, 60], // Bone magnitudes (=length in px)
	beginning: [-120, -185, 180, -170, 220], // Bone angles in degrees : first movement
	middle: [-105, -260, 255, -225, 120], // Bone angles in degrees : middle movement
	end: [-85, -260, 280, -260, 100], // Bone angles in degrees : end movement
}

const FEATHERS = {
	sections: [
		{
			featherCount: 8,
			beginning: 180,
			middle: 190,
			end: 200,
		},
		{
			featherCount: 10,
			beginning: 360,
			middle: 350,
			end: 340,
		},
		{
			featherCount: 8,
			beginning: 160,
			middle: 170,
			end: 180,
		},
	],
}

// const colors = {
// 	mute: (angle, step) => {
// 		stroke(step * 10, step * 15, step * 22, 0.25)
// 	},
// 	bright: (angle, step) => {
// 		stroke(angle + step, angle + step, angle + step, 0.25)
// 	},
// 	section: (angle, section, step) => {
// 		stroke(angle + section + 0.5 * 12, step + 2 * 15, step + 2 * 20, 0.25)
// 	},
// }
const COLORS = {
	mute: (angle, color, step) => {
		const fn1 = (c) => c + step / angle
		const fn2 = (c) => c * (step / angle)
		const fn3 = (c) => c / (step / angle)

		const randomize = color[0]
		let functions =
			randomize > 0.7
				? [fn1, fn2, fn3]
				: randomize > 0.4
					? [fn2, fn3, fn1]
					: [fn3, fn1, fn2]
		return [
			functions[0](color[0]),
			functions[1](color[1]),
			functions[2](color[2]),
			0.5,
		]
	},
	bright: (angle, color, step) => {
		return [angle + step, angle + step, angle + step, 0.5]
	},
	section: (angle, color, section, step) => {
		return [angle + section + 0.5 * 12, step + 2 * 15, step + 2 * 20, 0.5]
	},
}

const MOVEMENT = {
	steps: 600, // This controls movement speed
	pause: 20, // This controls the pause time at the end of each cycle
	direction: -1,
	currentStep: 1,
}

const WINGS = {
	default: {
		options: {
			position: [0, 0],
			direction: MOVEMENT.direction,
			step: MOVEMENT.currentStep,
			layers: 1,
			steps: MOVEMENT.steps,
			pause: MOVEMENT.pause,
			bones: BONES,
			feathers: FEATHERS,
			colors: COLORS,
			drawFeathers: true,
		},
	},
	base1: {
		wingClass: wings.base1,
		options: {
			position: [0, 1],
			translation: [0.9, 0.6],
			scale: [1, 1],
			rotation: utils.degToRad(0),
		},
	},
	base2: {
		wingClass: wings.base2,
		position: [0, 1],
		translation: [0.9, 0.6],
		scale: [1, 1],
		rotation: utils.degToRad(0),
	},
	base3: {
		wingClass: wings.base3,
		position: [0, 1],
		translation: [0.9, 0.6],
		scale: [1, 1],
		rotation: utils.degToRad(0),
	},
	ws01: {
		wingClass: wings.ws01,
		position: [0, 1],
		translation: [0.725, 0.0275],
		scale: [0.0905, 0.0905],
		rotation: utils.degToRad(0),
	},
	ws02: {
		wingClass: wings.ws02,
		position: [0, 1],
		translation: [0.635, 0.55],
		scale: [0.575, 0.575],
		rotation: utils.degToRad(0),
	},
	ws03: {
		wingClass: wings.ws03,
		position: [0, 1],
		translation: [0.775, 0.55],
		scale: [0.785, 0.785],
		rotation: utils.degToRad(0),
	},
	ws04: {
		wingClass: wings.ws04,
		position: [0, 1],
		translation: [0.4875, 0.275],
		scale: [0.565, 0.565],
		rotation: utils.degToRad(0),
	},
	ws05: {
		wingClass: wings.ws05,
		position: [0, 1],
		translation: [0.825, 0.525],
		scale: [0.985, 0.985],
		rotation: utils.degToRad(15.75),
	},
	ws06: {
		wingClass: wings.ws06,
		position: [0, 1],
		translation: [0.895, 0.55],
		scale: [0.575, 0.575],
		rotation: utils.degToRad(5),
	},
	ws07: {
		wingClass: wings.ws07,
		position: [0, 1],
		translation: [0.835, 0.475],
		scale: [0.545, 0.545],
		rotation: utils.degToRad(0),
	},
	ws08: {
		wingClass: wings.ws07,
		position: [0, 1],
		translation: [0.965, 0.505],
		scale: [0.605, 0.605],
		rotation: utils.degToRad(12),
	},
	ws09: {
		wingClass: wings.ws09,
		position: [0, 1],
		translation: [0.575, 0.525],
		scale: [0.645, 0.645],
		rotation: utils.degToRad(25.75),
	},
	ws10: {
		wingClass: wings.ws09,
		position: [0, 1],
		translation: [0.7075, 0.575],
		scale: [0.445, 0.445],
		rotation: utils.degToRad(0),
	},
	ws11: {
		wingClass: wings.ws11,
		position: [0, 1],
		translation: [0.375, 0.715],
		scale: [0.22, 0.22],
		rotation: utils.degToRad(32.5),
	},
	ws12: {
		wingClass: wings.ws12,
		position: [0, 1],
		translation: [0.955, 0.595],
		scale: [0.665, 0.665],
		rotation: utils.degToRad(0),
	},
	ws13: {
		wingClass: wings.ws13,
		position: [0, 1],
		translation: [0.935, 0.665],
		scale: [0.4025, 0.4025],
		rotation: utils.degToRad(0),
	},
	ws14: {
		wingClass: wings.ws14,
		position: [0, 1],
		translation: [0.925, 0.655],
		scale: [0.4, 0.4],
		rotation: utils.degToRad(0),
	},
	ws15: {
		wingClass: wings.ws15,
		position: [0, 1],
		translation: [0.655, 0.45],
		scale: [0.905, 0.905],
		rotation: utils.degToRad(46.75),
	},
	ws16: {
		wingClass: wings.ws16,
		position: [0, 1],
		translation: [0.635, 0.45],
		scale: [0.845, 0.845],
		rotation: utils.degToRad(46.75),
	},
	ws17: {
		wingClass: wings.ws17,
		position: [0, 1],
		translation: [0.555, 0.5],
		scale: [0.775, 0.775],
		rotation: utils.degToRad(46.75),
	},
}

export default WINGS
