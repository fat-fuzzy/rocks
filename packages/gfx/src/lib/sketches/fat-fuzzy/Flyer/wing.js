import maths from '../../../math/utils'
import vectors from '../../../math/vectors'
import geometries from '../../../math/geometries'

const {DEFAULT_GEOMETRY_COORDS} = geometries

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
	angles: maths.normalizeAndInterpolate(
		[305, 292, 158, 257, 320],
		[315, 260, 200, 220, 300],
		100,
	),
	sections: [
		{
			magnitude: 160,
			angles: {
				beginning: 305,
				middle: 315,
				end: 320,
			},
			interpolated: maths.normalizeAndInterpolate([305], [315], WING.steps),
		},
		{
			magnitude: 180,
			angles: {
				beginning: 292,
				middle: 260,
				end: 250,
			},
			interpolated: maths.normalizeAndInterpolate([292], [260], WING.steps),
		},
		{
			magnitude: 200,
			angles: {
				beginning: 158,
				middle: 200,
				end: 212,
			},
			interpolated: maths.normalizeAndInterpolate([158], [200], WING.steps),
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
			angles: maths.normalizeAndInterpolate(
				[180, 358, 160],
				[220, 340, 120],
				WING.steps,
			),
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
	angles: {
		startPause: maths.normalizeAndInterpolate(
			[180, 358, 160],
			[280, 340, 120],
			WING.pause,
		),
		middle: maths.normalizeAndInterpolate(
			[180, 358, 160],
			[280, 340, 100],
			WING.steps,
		),
		end: maths.normalizeAndInterpolate(
			[280, 340, 100],
			[200, 330, 90],
			WING.steps / 3,
		),
		endPause: maths.normalizeAndInterpolate(
			[220, 340, 100],
			[200, 330, 90],
			WING.pause,
		),
	},
}

function getBoneVertices(wing, time) {
	// Save current coordinate system
	// push()

	let {angles, bones, boneAngles, position, feathers} = wing
	let angle
	let magnitude
	let section
	let origin = position
	let vectorVertices = []
	let sections = Object.keys(boneAngles)
	// 1. Draw the bones in sequence so that a new bone's origin is the last bone's tip
	for (section = 0; section < sections.length - 1; section++) {
		// Translate to current origin (initial or previous bone coords)
		// translate(...origin)
		console.log('ORIGIN')
		console.log(origin)

		vectorVertices.push(...origin)
		magnitude = bones[section]

		// Set the new angle -> This is what creates the movement !
		angle = angles[section]

		// Set current origin to new bone coordinates
		origin = vectors.getCoordsFromMagnitudeAndAngle(magnitude, angle[section])

		console.log('DESTINATION')
		console.log(origin)

		// Draw the bone
		vectorVertices.push(...origin)

		if (section > 0) {
			// drawFeathers(angle, section, origin, feathers, time)
		}
	}

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
	// + sprites
	return {
		position: [width * 0.9, height / 2 + height * 0.1],
		steps: WING.steps, // This controls movement speed
		pause: WING.pause, // This controls the pause time at the end of each cycle
		bones: BONES.magnitude,
		beginning: BONES.beginning,
		middle: BONES.middle,
		end: BONES.end,
		angles: BONES.angles,
		feathers: FEATHERS.sections,
		featherAngles: FEATHERS.angles,
		boneAngles: {
			startPause: maths.normalizeAndInterpolate(
				BONES.beginning,
				BONES.middle,
				WING.pause,
			),
			middle: maths.normalizeAndInterpolate(
				BONES.beginning,
				BONES.middle,
				WING.steps,
			),
			end: maths.normalizeAndInterpolate(
				BONES.middle,
				BONES.end,
				WING.steps / 3,
			),
			endPause: maths.normalizeAndInterpolate(
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

// /* prettier-ignore */
// const DEFAULT_GEOMETRY_COORDS = [
// 	// left column
// 	0, 0,
// 	30, 0,
// 	0, 150,
// 	0, 150,
// 	30, 0,
// 	30, 150,

// 	// top rung
// 	30, 0,
// 	100, 0,
// 	30, 30,
// 	30, 30,
// 	100, 0,
// 	100, 30,

// 	// middle rung
// 	30, 60,
// 	67, 60,
// 	30, 90,
// 	30, 90,
// 	67, 60,
// 	67, 90,
// ]

function getGeometryCoords(width, height, timeContext) {
	const wingState = getWing(width, height)
	const {time, wing} = updateWingState(wingState, timeContext)

	const boneVertices = getBoneVertices(wing, time)

	// TODO: transform wing data into geometry coordinates (= vertices)
	return boneVertices
}

export default {
	getWing,
	updateWingState,
	getGeometryCoords,
}
