import utils from '../../../math/utils'
import vectors from '../../../math/vectors'

const WING = {
	steps: 100, // This controls movement speed
	pause: 7, // This controls the pause time at the end of each cycle
	direction: -1,
	currentStep: 0,
}

const BONES = {
	magnitude: [160, 180, 200, 80, 50], // Bone magnitudes (=length)
	beginning: [305, 292, 158, 257, 320],
	middle: [315, 260, 200, 220, 300],
	end: [320, 250, 212, 212, 290],
}

/* prettier-ignore */
const DEFAULT_GEOMETRY_COORDS = [
	// scapula
	0, 0,
	-40, -150,
	// humerus
	-40, -150,
	-300, -110,
	// radius+ulna
	-300, -110,
	-580, -170,
	// finger
	-580, -170,
	-680, -200,
	// thumb
	-580, -170,
	-620, -210,
]

const BONE_STRUCTURE = {
	angles: utils.normalizeAndInterpolate(BONES.beginning, BONES.end, WING.steps),
	sections: [
		{
			magnitude: BONES.magnitude[0],
			angles: {
				beginning: BONES.beginning[0],
				middle: BONES.middle[0],
				end: BONES.end[0],
			},
			interpolated: [
				utils.normalizeAndInterpolate(
					[BONES.beginning[0]],
					[BONES.middle[0]],
					WING.steps,
				),
				utils.normalizeAndInterpolate(
					[BONES.middle[0]],
					[BONES.end[0]],
					WING.steps / 3,
				),
			],
		},
		{
			magnitude: BONES.magnitude[1],
			angles: {
				beginning: BONES.beginning[1],
				middle: BONES.middle[1],
				end: BONES.end[1],
			},
			interpolated: [
				utils.normalizeAndInterpolate(
					[BONES.beginning[1]],
					[BONES.middle[1]],
					WING.steps,
				),
				utils.normalizeAndInterpolate(
					[BONES.middle[1]],
					[BONES.end[1]],
					WING.steps / 3,
				),
			],
		},
		{
			magnitude: BONES.magnitude[2],
			angles: {
				beginning: BONES.beginning[2],
				middle: BONES.middle[2],
				end: BONES.end[2],
			},
			interpolated: [
				utils.normalizeAndInterpolate(
					[BONES.beginning[2]],
					[BONES.middle[2]],
					WING.steps,
				),
				utils.normalizeAndInterpolate(
					[BONES.middle[2]],
					[BONES.end[2]],
					WING.steps / 3,
				),
			],
		},
	],
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
const FEATHERS_STRUCTURE = {
	angles: {
		startPause: utils.normalizeAndInterpolate(
			[
				FEATHERS.sections[0].beginning,
				FEATHERS.sections[1].beginning,
				FEATHERS.sections[2].beginning,
			],
			[
				FEATHERS.sections[0].middle,
				FEATHERS.sections[1].middle,
				FEATHERS.sections[2].middle,
			],
			WING.pause,
		),
		middle: utils.normalizeAndInterpolate(
			[
				FEATHERS.sections[0].beginning,
				FEATHERS.sections[1].beginning,
				FEATHERS.sections[2].beginning,
			],
			[
				FEATHERS.sections[0].middle,
				FEATHERS.sections[1].middle,
				FEATHERS.sections[2].middle,
			],
			WING.steps,
		),
		end: utils.normalizeAndInterpolate(
			[
				FEATHERS.sections[0].middle,
				FEATHERS.sections[1].middle,
				FEATHERS.sections[2].middle,
			],
			[
				FEATHERS.sections[0].end,
				FEATHERS.sections[1].end,
				FEATHERS.sections[2].end,
			],
			WING.steps / 3,
		),
		endPause: utils.normalizeAndInterpolate(
			[
				FEATHERS.sections[0].middle,
				FEATHERS.sections[1].middle,
				FEATHERS.sections[2].middle,
			],
			[
				FEATHERS.sections[0].end,
				FEATHERS.sections[1].end,
				FEATHERS.sections[2].end,
			],
			WING.pause,
		),
	},
}

function getBoneVertices(wing, canvasWidth, canvasHeight, time) {
	// Save current coordinate system
	// push()
	let {angles, bones, boneAngles, position, feathers} = wing
	let angle
	let magnitude
	let section
	let coords = vectors.getCoordsFromMagnitudeAndAngle(0, 0)
	let prevOrigin = coords
	let vectorVertices = []
	let sections = Object.keys(boneAngles)
	let currentAngles = angles[time]
	// 1. Draw the bones in sequence so that a new bone's coords is the last bone's tip
	for (section = 0; section < sections.length - 1; section++) {
		// Translate to current coords (initial or previous bone coords)
		vectorVertices.push(...coords)
		prevOrigin = [...coords]
		magnitude = bones[section]
		// Set the new angle -> This is what creates the movement !
		angle = currentAngles[section]

		// Set current coords to new bone coordinates
		coords = vectors.getCoordsFromMagnitudeAndAngle(
			magnitude,
			utils.degToRad(angle),
		)

		// Draw the bone
		vectorVertices.push(...coords)

		if (section > 0) {
			// drawFeathers(angle, section, coords, feathers, time)
		}
	}

	// 2. Draw the last bone that shares its coords with the previous bone
	magnitude = bones[section]
	angle = currentAngles[section]
	vectorVertices.push(...prevOrigin)
	coords = vectors.getCoordsFromMagnitudeAndAngle(
		magnitude,
		utils.degToRad(angle),
	)
	vectorVertices.push(...coords)

	return vectorVertices
}

function drawFeathers(angle, section, origin, feathers, time) {
	let [x, y] = origin

	// Hypothenuse
	let magnitude = Math.abs(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)))

	let featherMagnitude = 1
	let featherCoords
	let insertionOrigin
	let insertionDistance = 0
	let featherCount = feathers.featherCount
	let featherAngles = feathers.angles[time]
	let featherAngle = featherAngles[section - 1]

	let distance = magnitude / featherCount

	for (let step = 0; step < featherCount; step++) {
		// Save current coordinate system
		// push()
		let angleStep = step + 1
		if (section === 1) {
			insertionDistance = distance * step
			featherMagnitude = 30 + (step * step) / 30
			featherAngle = featherAngle + angleStep
		}
		if (section === 2) {
			insertionDistance = distance * step
			featherMagnitude = 20 + (step * step) / 20
			featherAngle = featherAngle
		}
		if (section === 3) {
			insertionDistance = distance * step
			featherMagnitude = 50 + (step * step) / 20
			featherAngle = featherAngle + angleStep * 1.5
		}

		insertionOrigin = getInsertionPoint(x, y, insertionDistance, magnitude)

		// translate(...insertionOrigin)

		// New Wing Coordinates

		let angleRad = featherAngle * (Math.PI / 180)
		let featherX = insertionOrigin[0] + featherMagnitude * angleRad
		let featherY = insertionOrigin[1] + featherMagnitude * angleRad
		featherCoords = [featherX, featherY]

		// Draw the feather
		drawVector(featherAngle, step, featherCoords)
		// pop()
	}
}

/**
 *
 * @param {number} width
 * @param {number} height
 * @returns {*} typeof Wing
 */
function getWing(width, height) {
	let position = utils.p5ToWebGL(
		width * 0.9,
		height / 2 + height * 0.1,
		width,
		height,
	)
	// + sprites
	return {
		position: [0, 0],
		direction: WING.direction,
		steps: WING.steps, // This controls movement speed
		pause: WING.pause, // This controls the pause time at the end of each cycle
		bones: BONES.magnitude,
		beginning: BONES.beginning,
		middle: BONES.middle,
		end: BONES.end,
		angles: BONE_STRUCTURE.angles,
		feathers: FEATHERS.sections,
		featherAngles: FEATHERS_STRUCTURE.angles,
		boneAngles: {
			startPause: utils.normalizeAndInterpolate(
				BONES.beginning,
				BONES.middle,
				WING.pause,
			),
			middle: utils.normalizeAndInterpolate(
				BONES.beginning,
				BONES.middle,
				WING.steps,
			),
			end: utils.normalizeAndInterpolate(
				BONES.middle,
				BONES.end,
				WING.steps / 3,
			),
			endPause: utils.normalizeAndInterpolate(
				BONES.middle,
				BONES.end,
				WING.pause,
			),
		},
	}
}

/**
 * Wing Movement
 * @param {*} wing : typeof Wing
 * @param {number} timeContext point in time of the current movement of a sequence of movements
 * @returns {*} updated {time, wing} state
 */
function updateWingState(wing, timeContext) {
	let time = timeContext
	// Case 1 : we are in an opening sequence (= positive direction) and this is the end of a movement
	if (wing.direction === 1 && time === wing.angles.length - 1) {
		// 1. We have arrived at the end of the pause: change to an closing movement (= negative direction)
		if (wing.currentStep === 2) {
			wing.direction = -1
		}

		// 2. We have arrived at the end of the last movement of the sequence
		if (wing.currentStep === 1) {
			// load the next movement
			wing.currentStep = 2
			wing.angles = wing.boneAngles.endPause //step 2 is the pause in this case. A pause is a movement where the angles are the same as the last movement's angles. A pause has its own, shorter steps (= shorter duration)
			wing.feathers[wing.currentStep].angles = wing.featherAngles.endPause
			// set the next movement (a pause movement) to start
			time = 0
		}
		// 3. We have arrived at the end of the first movement of the sequence
		if (wing.currentStep === 0) {
			// load the next movement
			wing.currentStep = 1
			// load the next movement's steps
			wing.angles = wing.boneAngles.end // step 1 is the last movement in this case
			wing.feathers[wing.currentStep].angles = wing.featherAngles.end
			// set the next movement to start
			time = 0
		}
	}
	// Case 2 : we are in a closing sequence (= negative direction) and this is the start of a movement
	if (wing.direction === -1 && time === 0) {
		// 1. We arrive at the first movement of the sequence: change to an opening movement (= positive direction)
		if (wing.currentStep === 0) {
			wing.direction = 1
		}
		// 2. We arrive at a middle movement:
		// - update the current data with the data of the middle movement
		// - set the current step to the preceding movement in order
		if (wing.currentStep === 1) {
			wing.angles = wing.boneAngles.middle
			wing.feathers[wing.currentStep].angles = wing.featherAngles.middle
			time = wing.angles.length - 1
			wing.currentStep = 0
		}
		// 3. We arrive at the last movement of the sequence (= a pause): update the current movement's coordinates sequence to the data of the previous movement, set the current step to the previous movement
		if (wing.currentStep === 2) {
			wing.angles = wing.boneAngles.end
			wing.feathers[wing.currentStep].angles = wing.featherAngles.end
			time = wing.angles.length - 1
			wing.currentStep = 1
		}
	}

	// Finally: Update the movement one step in the current direction
	time = time + wing.direction

	return {time, wing}
}

function getGeometryCoords(canvasWidth, canvasHeight) {
	const wingState = getWing(canvasWidth, canvasHeight)

	// TODO: transform wing data into geometry coordinates (= vertices)
	let boneVertices = getBoneVertices(wingState, canvasWidth, canvasHeight, 1)

	console.log('boneVertices', boneVertices)
	boneVertices = DEFAULT_GEOMETRY_COORDS
	return {
		color: [Math.random(), Math.random(), Math.random(), 1],
		translation: [canvasWidth * 0.9, canvasHeight * 0.6],
		// translation: [canvasWidth / 2, canvasHeight / 2],
		rotation: [utils.degToRad(360)],
		scale: [1, 1],
		width: canvasWidth,
		height: canvasHeight,
		geometry: boneVertices,
	}
}

export default {
	getWing,
	updateWingState,
	getGeometryCoords,
}
