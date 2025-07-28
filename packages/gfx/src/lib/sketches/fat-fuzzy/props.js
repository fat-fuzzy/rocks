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

const WING = {
	steps: 600, // This controls movement speed
	pause: 20, // This controls the pause time at the end of each cycle
	direction: -1,
	currentStep: 1,
}

export default {
	BONES,
	FEATHERS,
	COLORS,
	WING,
}
