import maths from '../../../math/utils'
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
				100,
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

/**
 *
 * @param {number} width
 * @param {number} height
 * @returns {*} typeof Wing
 */
function getWing(width, height) {
	// + sprites
	return {
		origin: [width * 0.9, height / 2 + height * 0.1],
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
 * Wing Structure & Movement:
 * - the wing moves in a cycle of two sequences of movements: opening and closing
 * - each sequence has three movements: beginning, middle, end
 * - each movement has a sequence of steps which can be variable in length
 *   - the number of steps of a movement determines its speed and smoothness
 * - the first movement (and last, TODO) has a pause at the end of the movement
 * - the wing has bones:
 *   - a scapula bone that moves the wing to and from the body
 *   - a humerus bone that moves the wing up and down`
 *   - a radius bone that moves the mid wing in and out
 * 	 - a ulna bone that moves the wing tip in and out
 *   - a carpometacarpal bone that moves the wing tip in and out
 * - the wing has 3 layers of feathers:
 *   - layer 1:
 *     - the humerus bone has 6 feathers
 *     - the radius bone has 10 feathers
 *     - the ulna bone has 8 feathers
 *   - layer 2:
 *     - the radius bone has 12 feathers
 *     - the ulna bone has 10 feathers
 *   - layer 3:
 *     - the humerus bone has 5 feathers
 *     - the radius bone has 7 feathers
 *     - the ulna bone has 5 feathers
 *   - layer 4:
 *     - the humerus bone has fluffy feathers
 *     - the radius bone has fluffy feathers
 *     - the ulna bone has fluffy feathers
 *     - the carpometacarpal bone has 3 feathers
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

function getGeometryCoords(width, height) {
	const wing = getWing(width, height)

	// TODO: transform wing data into geometry coordinates (= vertices)
	return DEFAULT_GEOMETRY_COORDS
}

export default {
	getWing,
	updateWingState,
	getGeometryCoords,
}
