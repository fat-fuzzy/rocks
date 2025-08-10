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
			id: 'default',
			group: 'default',
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
			id: 'base1',
			label: 'Scapula & Humerus',
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
			id: 'base2',
			label: 'Scapula, Humerus, Metacarpal "finger"',
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
			id: 'base3',
			label: 'Scapula, Humerus, Radius+Ulna, Metacarpal "finger" & "thumb"',
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
			id: 'ws01',
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
			id: 'ws02',
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
			id: 'ws03',
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
			id: 'ws04',
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
			id: 'ws05',
			group: 'flora',
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
			id: 'ws06',
			group: 'adamant',
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
			id: 'ws07',
			group: 'antinomy',
			position: [0, 0],
			translation: [0.825, 0.475],
			scale: [0.715, 0.715],
			rotation: utils.degToRad(0),
		},
	},
	ws08: {
		wingClass: wings.ws08,
		collection: 'wabi-sabi',
		options: {
			id: 'ws08',
			group: 'adamant',
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
			id: 'ws09',
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
			id: 'ws10',
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
			id: 'ws11',
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
			id: 'ws12',
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
			id: 'ws13',
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
			id: 'ws14',
			group: 'sail',
			position: [0, 0],
			translation: [0.905, 0.655],
			scale: [0.535, 0.535],
			rotation: utils.degToRad(0),
		},
	},
	ws15: {
		wingClass: wings.ws15,
		collection: 'wabi-sabi',
		options: {
			id: 'ws15',
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
			id: 'ws16',
			group: 'flora',
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
			id: 'ws17',
			group: 'orbital',
			position: [0, 0],
			translation: [0.5025, 0.5075],
			scale: [0.585, 0.585],
			rotation: utils.degToRad(52.65),
		},
	},
	ws18: {
		wingClass: wings.ws18,
		collection: 'wabi-sabi',
		options: {
			id: 'ws18',
			group: 'orbital',
			position: [0, 0],
			translation: [0.55, 0.525],
			scale: [0.825, 0.825],
			rotation: utils.degToRad(48.65),
		},
	},
	ws19: {
		wingClass: wings.ws19,
		collection: 'wabi-sabi',
		options: {
			id: 'ws19',
			group: 'antinomy',
			position: [0, 0],
			translation: [0.825, 0.475],
			scale: [0.685, 0.685],
			rotation: utils.degToRad(0),
		},
	},
	ws20: {
		wingClass: wings.ws20,
		collection: 'wabi-sabi',
		options: {
			id: 'ws20',
			group: 'flora',
			position: [0, 0],
			translation: [0.625, 0.505],
			scale: [0.825, 0.825],
			rotation: utils.degToRad(36.75),
		},
	},
	ws21: {
		wingClass: wings.ws21,
		collection: 'wabi-sabi',
		options: {
			id: 'ws21',
			group: 'ether',
			position: [0, 0],
			translation: [0.8, 0.415],
			scale: [0.0675, 0.0675],
			rotation: utils.degToRad(58),
		},
	},
	ws22: {
		wingClass: wings.ws22,
		collection: 'wabi-sabi',
		options: {
			id: 'ws22',
			group: 'adamant',
			position: [0, 0],
			translation: [0.875, 0.575],
			scale: [0.735, 0.735],
			rotation: utils.degToRad(5),
		},
	},
	ws23: {
		wingClass: wings.ws23,
		collection: 'wabi-sabi',
		options: {
			id: 'ws23',
			group: 'antinomy',
			position: [0, 0],
			translation: [0.7205, 0.51],
			scale: [0.4575, 0.4575],
			rotation: utils.degToRad(-12),
		},
	},
	ws24: {
		wingClass: wings.ws24,
		collection: 'wabi-sabi',
		options: {
			id: 'ws24',
			group: 'orbital',
			position: [0, 0],
			translation: [0.505, 0.505],
			scale: [0.125, 0.125],
			rotation: utils.degToRad(17.25),
		},
	},
}

function getWingProps(wingId) {
	const wing = WINGS[wingId]
	if (!wing) {
		console.warn(`Wing properties for ${wingId} not found`)
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

function createWing(wingId, canvas) {
	const wingOptions = getWingProps(wingId)
	if (!wingOptions) {
		console.warn(`Wing class ${wingId} not found`)
		return null
	}

	const WingClass = wingOptions.wingClass

	if (typeof WingClass !== 'function') {
		console.warn(`Wing class ${wingId} is not a function`)
		return null
	}

	const wing = new WingClass({
		...wingOptions.options,
		canvasWidth: canvas.width,
		canvasHeight: canvas.height,
	})
	wing.init(canvas.width, canvas.height)
	wingId = wing.id

	return wing
}

/**
 *
 * @param {*} collection
 * @param {*} orderBy id, group, random
 * @returns
 */
function generateWingsGrid(options) {
	let {collection, orderBy, groupBy} = options || {}
	const wingGroups = new Map()

	let wingsTotal = 0
	const grid = []

	let groupCount = {}
	let label
	let groupId
	let wingData

	Object.values(WINGS).forEach((wing) => {
		if (collection && wing.collection !== collection) {
			return
		}

		groupId = wing.options.group

		if (groupCount[groupId] === undefined) {
			groupCount[groupId] = 1
		} else {
			groupCount[groupId]++
		}

		label = wing.options.label
		if (!label) {
			label = groupId.substring(0, 1).toUpperCase() + groupId.substring(1)
			label = `${label} ${groupCount[groupId]}`
		}

		wingData = {
			id: wing.options.id,
			label,
			group: groupBy ? groupId : undefined,
		}

		if (groupBy === undefined && (orderBy === 'id' || orderBy === 'label')) {
			grid.push(wingData)
			return
		}

		if (!wingGroups.has(groupId)) {
			wingGroups.set(groupId, [])
		}

		wingGroups.get(groupId).push(wingData)
		wingsTotal++
	})

	if (groupBy === 'group') {
		// Sort groups by id
		const sortedGroups = Array.from(wingGroups.entries()).sort(([a], [b]) => {
			let compare = a.localeCompare(b)
			return compare > 0 ? 1 : compare < 0 ? -1 : 0
		})

		sortedGroups.forEach(([groupId, groupWings]) => {
			groupWings.forEach((wing) => {
				grid.push(wing)
			})
		})

		if (orderBy === 'id') {
			grid.sort((a, b) => b.id - a.id)
			return grid
		}

		if (orderBy === 'label') {
			grid.sort((a, b) => {
				let compare = a.label.localeCompare(b.label)
				return compare > 0 ? 1 : compare < 0 ? -1 : 0
			})
			return grid
		}

		return grid
	}

	if (orderBy === 'id') {
		grid.sort((a, b) => b.id - a.id)
		return grid
	}

	if (orderBy === 'label') {
		grid.sort((a, b) => {
			let compare = a.label.localeCompare(b.label)
			return compare > 0 ? 1 : compare < 0 ? -1 : 0
		})
		return grid
	}

	// TODO: order by group, better randomization
	let sortedGroups
	let lastGroupId = null
	let selectedGroup
	let largestGroup
	let secondLargestGroup

	// const totalGroups = Array.from(wingGroups.entries())
	// 	.filter((group) => group.length > 0)
	// 	.sort(([, a], [, b]) => b.length - a.length)

	// console.log(
	// 	`Remaining groups: ${totalGroups.map((g) => `${g[0]} (${g[1].length})`).join(', ')}`,
	// )

	// Randomize grid selection
	while (grid.length < wingsTotal) {
		if (wingGroups.size === 0) {
			console.warn(`No more wings available to fill the grid`)
			return grid
		}
		if (wingGroups.size === 1) {
			selectedGroup = Array.from(wingGroups.entries())[0]
		}
		if (wingGroups.size > 1) {
			sortedGroups = Array.from(wingGroups.entries())
				.filter((group) => group.length > 0)
				.sort(([, a], [, b]) => b.length - a.length)
			if (sortedGroups.length === 0) {
				break
			}

			// Select from largest group different from the last group
			largestGroup = sortedGroups[0]
			secondLargestGroup = sortedGroups.length > 1 ? sortedGroups[1] : null

			if (largestGroup[0] !== lastGroupId) {
				selectedGroup = largestGroup
			} else {
				selectedGroup = secondLargestGroup
			}

			if (!selectedGroup) {
				console.warn(`No group found for selection`)
				break
			}
		}

		const [groupId, groupWings] = selectedGroup

		// 4. Pick a random wing from the chosen group
		const wingIndex = utils.randomInt(groupWings.length - 1)
		const [wing] = groupWings.splice(wingIndex, 1)
		wingGroups.set(groupId, groupWings)

		grid.push(wing)

		lastGroupId = groupId
	}

	return grid
}

export {createWing, generateWingsGrid}
