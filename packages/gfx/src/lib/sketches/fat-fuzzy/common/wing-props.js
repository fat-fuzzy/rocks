import wings from '../wings/index'
import utils from '../../../math/utils.js'

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
				: randomize > 0.35
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
	steps: 565, // This controls movement speed
	pause: 20, // This controls the pause time at the end of each cycle
	direction: -1,
	currentStep: 1,
}

const WINGS = {
	default: {
		options: {
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
		collection: 'wing-base',
		options: {
			name: 'base1',
			group: 'seed',
			position: [0, 0],
			translation: [0.905, 0.625],
			scale: [2.25, 2.25],
			rotation: utils.degToRad(0),
		},
	},
	base2: {
		wingClass: wings.base2,
		collection: 'wing-base',
		options: {
			name: 'base2',
			group: 'seed',
			position: [0, 0],
			translation: [0.905, 0.625],
			scale: [2.25, 2.25],
			rotation: utils.degToRad(0),
		},
	},
	base3: {
		wingClass: wings.base3,
		collection: 'wing-base',
		options: {
			name: 'base3',
			group: 'seed',
			position: [0, 0],
			translation: [0.905, 0.625],
			scale: [2.25, 2.25],
			rotation: utils.degToRad(0),
		},
	},
	ws01: {
		wingClass: wings.ws01,
		collection: 'wabi-sabi',
		options: {
			name: 'ws01',
			group: 'ether',
			position: [0, 0],
			translation: [0.75, 0.0275],
			scale: [0.1, 0.1],
			rotation: utils.degToRad(0),
		},
	},
	ws02: {
		wingClass: wings.ws02,
		collection: 'wabi-sabi',
		options: {
			name: 'ws02',
			group: 'blade',
			position: [0, 0],
			translation: [0.635, 0.565],
			scale: [0.7925, 0.7925],
			rotation: utils.degToRad(0),
		},
	},
	ws03: {
		wingClass: wings.ws03,
		collection: 'wabi-sabi',
		options: {
			name: 'ws03',
			group: 'blade',
			position: [0, 0],
			translation: [0.775, 0.55],
			scale: [1.1, 1.1],
			rotation: utils.degToRad(0),
		},
	},
	ws04: {
		wingClass: wings.ws04,
		collection: 'wabi-sabi',
		options: {
			name: 'ws04',
			group: 'antinomy',
			position: [0, 0],
			translation: [0.495, 0.275],
			scale: [0.775, 0.775],
			rotation: utils.degToRad(0),
		},
	},
	ws05: {
		wingClass: wings.ws05,
		collection: 'wabi-sabi',
		options: {
			name: 'ws05',
			group: 'planar',
			position: [0, 0],
			translation: [0.805, 0.535],
			scale: [1.275, 1.275],
			rotation: utils.degToRad(15.75),
		},
	},
	ws06: {
		wingClass: wings.ws06,
		collection: 'wabi-sabi',
		options: {
			name: 'ws06',
			group: 'endurance',
			position: [0, 0],
			translation: [0.895, 0.535],
			scale: [0.775, 0.775],
			rotation: utils.degToRad(5),
		},
	},
	ws07: {
		wingClass: wings.ws07,
		collection: 'wabi-sabi',
		options: {
			name: 'ws07',
			group: 'antinomy',
			position: [0, 0],
			translation: [0.835, 0.475],
			scale: [0.745, 0.745],
			rotation: utils.degToRad(0),
		},
	},
	ws08: {
		wingClass: wings.ws08,
		collection: 'wabi-sabi',
		options: {
			name: 'ws08',
			group: 'endurance',
			position: [0, 0],
			translation: [0.935, 0.53],
			scale: [0.8, 0.8],
			rotation: utils.degToRad(12),
		},
	},
	ws09: {
		wingClass: wings.ws09,
		collection: 'wabi-sabi',
		options: {
			name: 'ws09',
			group: 'orbital',
			position: [0, 0],
			translation: [0.565, 0.525],
			scale: [0.845, 0.845],
			rotation: utils.degToRad(25.75),
		},
	},
	ws10: {
		wingClass: wings.ws10,
		collection: 'wabi-sabi',
		options: {
			name: 'ws10',
			group: 'blade',
			position: [0, 0],
			translation: [0.71, 0.55],
			scale: [0.615, 0.615],
			rotation: utils.degToRad(0),
		},
	},
	ws11: {
		wingClass: wings.ws11,
		collection: 'wabi-sabi',
		options: {
			name: 'ws11',
			group: 'ether',
			position: [0, 0],
			translation: [0.375, 0.715],
			scale: [0.325, 0.325],
			rotation: utils.degToRad(31),
		},
	},
	ws12: {
		wingClass: wings.ws12,
		collection: 'wabi-sabi',
		options: {
			name: 'ws12',
			group: 'sail',
			position: [0, 0],
			translation: [0.925, 0.595],
			scale: [0.875, 0.875],
			rotation: utils.degToRad(0),
		},
	},
	ws13: {
		wingClass: wings.ws13,
		collection: 'wabi-sabi',
		options: {
			name: 'ws13',
			group: 'sail',
			position: [0, 0],
			translation: [0.925, 0.655],
			scale: [0.545, 0.545],
			rotation: utils.degToRad(0),
		},
	},
	ws14: {
		wingClass: wings.ws14,
		collection: 'wabi-sabi',
		options: {
			name: 'ws14',
			group: 'sail',
			position: [0, 0],
			translation: [0.925, 0.655],
			scale: [0.525, 0.525],
			rotation: utils.degToRad(0),
		},
	},
	ws15: {
		wingClass: wings.ws15,
		collection: 'wabi-sabi',
		options: {
			name: 'ws15',
			group: 'blade',
			position: [0, 0],
			translation: [0.6375, 0.465],
			scale: [1.215, 1.215],
			rotation: utils.degToRad(48.5),
		},
	},
	ws16: {
		wingClass: wings.ws16,
		collection: 'wabi-sabi',
		options: {
			name: 'ws16',
			group: 'planar',
			position: [0, 0],
			translation: [0.635, 0.45],
			scale: [1.15, 1.15],
			rotation: utils.degToRad(46.75),
		},
	},
	ws17: {
		wingClass: wings.ws17,
		collection: 'wabi-sabi',
		options: {
			name: 'ws17',
			group: 'orbital',
			position: [0, 0],
			translation: [0.5025, 0.5075],
			scale: [0.585, 0.585],
			rotation: utils.degToRad(48.75),
		},
	},
}

function getWingProps(wingName) {
	const wing = WINGS[wingName]
	if (!wing) {
		console.warn(`Wing properties for ${wingName} not found`)
		return null
	}

	const wingOptions = {
		...WINGS.default.options,
		...wing.options,
		bones: JSON.parse(JSON.stringify(BONES)),
		feathers: JSON.parse(JSON.stringify(FEATHERS)),
	}

	return {
		wingClass: wing.wingClass,
		options: wingOptions,
	}
}

function createWing(wingName, canvas) {
	const wingOptions = getWingProps(wingName)
	if (!wingOptions) {
		console.warn(`Wing class ${wingName} not found`)
		return null
	}

	const WingClass = wingOptions.wingClass

	if (typeof WingClass !== 'function') {
		console.warn(`Wing class ${wingName} is not a function`)
		return null
	}

	const wing = new WingClass({
		...wingOptions.options,
		canvasWidth: canvas.width,
		canvasHeight: canvas.height,
	})
	wing.init(canvas.width, canvas.height)
	wingName = wing.name

	return wing
}

function generateWingsGrid(collection) {
	const wingGroups = new Map()

	let wingsTotal = 0

	Object.values(WINGS).forEach((wing) => {
		if (collection && wing.collection !== collection) {
			return
		}
		const groupName = wing.options.group
		if (!wingGroups.has(groupName)) {
			wingGroups.set(groupName, [])
		}
		wingGroups.get(groupName).push(wing)
		wingsTotal++
	})

	const grid = []
	let lastGroupName = null

	while (grid.length < wingsTotal) {
		const sortedGroups = Array.from(wingGroups.entries())
			.filter((group) => group.length > 0)
			.sort(([, a], [, b]) => b.length - a.length)

		if (sortedGroups.length === 0) {
			break
		}

		// Select from largest group different from the last group
		let selectedGroup
		const largestGroup = sortedGroups[0]
		const secondLargestGroup = sortedGroups.length > 1 ? sortedGroups[1] : null

		if (
			largestGroup[0] !== lastGroupName &&
			secondLargestGroup &&
			secondLargestGroup[0] !== lastGroupName
		) {
			const groupIndex = utils.randomInt(1)
			selectedGroup = sortedGroups[groupIndex]
		} else if (largestGroup[0] !== lastGroupName) {
			selectedGroup = largestGroup
		} else {
			selectedGroup = secondLargestGroup
		}

		if (!selectedGroup) {
			console.warn(`No group found for selection`)
			break
		}

		const [groupName, groupWings] = selectedGroup

		// 4. Pick a random wing from the chosen group
		const wingIndex = utils.randomInt(groupWings.length - 1)
		const [wing] = groupWings.splice(wingIndex, 1)
		wingGroups.set(groupName, groupWings)

		grid.push(wing.options.name)

		lastGroupName = groupName
	}

	return grid
}

export {createWing, generateWingsGrid}
