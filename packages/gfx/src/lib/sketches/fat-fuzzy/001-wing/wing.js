import utils from '../../../math/utils'
import vectors from '../../../math/vectors'

const WING = {
	steps: 100, // This controls movement speed
	pause: 7, // This controls the pause time at the end of each cycle
	direction: -1,
	currentStep: 0,
}

const BONE_VERTICES = {
	magnitude: [160, 180, 200, 80, 50], // Bone magnitudes (=length)
	beginning: [
		// scapula
		0, 0, -40, -150,
		// humerus
		-40, -150, -300, -110,
		// radius+ulna
		-300, -110, -580, -170,
		// finger
		-580, -170, -680, -200,
		// thumb
		-580, -170, -620, -210,
	],
	middle: [315, 260, 200, 220, 300],
	end: [320, 250, 212, 212, 290],
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

function calculateAngle(x1, y1, x2, y2) {
	return Math.atan2(y2 - y1, x2 - x1)
}

function calculateMagnitude(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

function calculateVertices(magnitude, angle) {
	let x = Math.cos(angle) * magnitude
	let y = Math.sin(angle) * magnitude
	return [x, y]
}

function calculateAnglesAndFromVertices(vertices) {
	const angles = []
	const magnitudes = []
	for (let i = 0; i < vertices.length; i += 4) {
		let x1 = vertices[i]
		let y1 = vertices[i + 1]
		let x2 = vertices[i + 2]
		let y2 = vertices[i + 3]
		let angle = calculateAngle(0, 0, x2, y2)
		let magnitude = calculateMagnitude(x1, y1, x2, y2)
		angles.push(angle)
		magnitudes.push(magnitude)
	}

	return {angles, magnitudes}
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

const BONE_ANGLES = {
	magnitude: [160, 180, 200, 80, 50], // Bone magnitudes (=length)
	beginning: BONE_VERTICES.beginning
		.map((v, i) => {
			if (i % 4 === 0 && i + 3 < BONE_VERTICES.beginning.length) {
				return calculateAngle(
					BONE_VERTICES.beginning[i],
					BONE_VERTICES.beginning[i + 1],
					BONE_VERTICES.beginning[i + 2],
					BONE_VERTICES.beginning[i + 3],
				)
			}
			return null
		})
		.filter((a) => a !== null),
	middle: [0, -5, -10, 15, 15],
	end: [320, 250, 212, 212, 290],
}

const BONE_MAGNITUDES = {
	beginning: {
		...calculateAnglesAndFromVertices(BONE_VERTICES.beginning),
	},
	middle: [315, 260, 200, 220, 300],
	end: [320, 250, 212, 212, 290],
}

const BONE_STRUCTURE = {
	angles: utils.normalizeAndInterpolate(
		BONE_VERTICES.beginning,
		BONE_VERTICES.end,
		WING.steps,
	),
	sections: [
		{
			magnitude: BONE_VERTICES.magnitude[0],
			angles: {
				beginning: BONE_VERTICES.beginning[0],
				middle: BONE_VERTICES.middle[0],
				end: BONE_VERTICES.end[0],
			},
			interpolated: [
				utils.normalizeAndInterpolate(
					[BONE_VERTICES.beginning[0]],
					[BONE_VERTICES.middle[0]],
					WING.steps,
				),
				utils.normalizeAndInterpolate(
					[BONE_VERTICES.middle[0]],
					[BONE_VERTICES.end[0]],
					WING.steps / 3,
				),
			],
		},
		{
			magnitude: BONE_VERTICES.magnitude[1],
			angles: {
				beginning: BONE_VERTICES.beginning[1],
				middle: BONE_VERTICES.middle[1],
				end: BONE_VERTICES.end[1],
			},
			interpolated: [
				utils.normalizeAndInterpolate(
					[BONE_VERTICES.beginning[1]],
					[BONE_VERTICES.middle[1]],
					WING.steps,
				),
				utils.normalizeAndInterpolate(
					[BONE_VERTICES.middle[1]],
					[BONE_VERTICES.end[1]],
					WING.steps / 3,
				),
			],
		},
		{
			magnitude: BONE_VERTICES.magnitude[2],
			angles: {
				beginning: BONE_VERTICES.beginning[2],
				middle: BONE_VERTICES.middle[2],
				end: BONE_VERTICES.end[2],
			},
			interpolated: [
				utils.normalizeAndInterpolate(
					[BONE_VERTICES.beginning[2]],
					[BONE_VERTICES.middle[2]],
					WING.steps,
				),
				utils.normalizeAndInterpolate(
					[BONE_VERTICES.middle[2]],
					[BONE_VERTICES.end[2]],
					WING.steps / 3,
				),
			],
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
class Wing {
	position
	direction
	layers
	currentStep
	currentTime
	currentLayer
	currentSection
	steps // This controls movement speed
	pause // This controls the pause time at the end of each cycle

	constructor({position, direction, layers, steps, pause}) {
		// Context
		this.position = position
		this.layers = layers
		this.direction = direction
		this.steps = steps
		this.pause = pause

		// State
		this.currentLayer = 0
		this.currentSection = 0
		this.currentStep = 0
		this.currentTime = 0

		// Vertices
		this.bones = BONE_VERTICES.magnitude
		this.beginning = BONE_VERTICES.beginning
		this.middle = BONE_VERTICES.middle
		this.end = BONE_VERTICES.end
		this.feathers = FEATHERS.sections
		this.featherAngles = [
			utils.normalizeAndInterpolate(
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
			utils.normalizeAndInterpolate(
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
			utils.normalizeAndInterpolate(
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
			utils.normalizeAndInterpolate(
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
		]
		this.boneAngles = [
			utils.normalizeAndInterpolate(
				BONE_VERTICES.beginning,
				BONE_VERTICES.middle,
				WING.pause, // A pause is a  movement where the angles are equal to the angles of the immediately preceding or immediately following movement. A pause has its own, shorter steps (= shorter duration)
			),
			utils.normalizeAndInterpolate(
				BONE_VERTICES.beginning,
				BONE_VERTICES.middle,
				WING.steps,
			),
			utils.normalizeAndInterpolate(
				BONE_VERTICES.middle,
				BONE_VERTICES.end,
				WING.steps / 3, // A shorter movement
			),
			utils.normalizeAndInterpolate(
				BONE_VERTICES.middle,
				BONE_VERTICES.end,
				WING.pause, // A pause
			),
		]
		this.angles = {
			bones: this.boneAngles[this.currentStep],
			feathers: this.featherAngles[this.currentStep],
		}
		this.DEFAULT_GEOMETRY_COORDS = {
			/* prettier-ignore */
			beginning: {vertices:BONE_VERTICES.beginning, ...BONE_MAGNITUDES.beginning},
			/* prettier-ignore */
			middle: {vertices:BONE_VERTICES.beginning, ...BONE_MAGNITUDES.beginning},
			/* prettier-ignore */
			end: [
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
			],
		}
	}

	getBoneVertices(canvasWidth, canvasHeight, time) {
		// Save current coordinate system
		// push()
		let {angles, bones, boneAngles, position, feathers} = this
		console.log('this', this)
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

	getGeometryCoords(canvasWidth, canvasHeight) {
		// TODO: transform wing data into geometry coordinates (= vertices)
		// let boneVertices = [this.getBoneVertices(canvasWidth, canvasHeight, 1)]
		let boneVertices = [this.DEFAULT_GEOMETRY_COORDS.beginning.vertices]
		console.log('boneVertices', boneVertices)
		// boneVertices = [
		// 	this.DEFAULT_GEOMETRY_COORDS.beginning.vertices,
		// 	this.DEFAULT_GEOMETRY_COORDS.middle.vertices,
		// ]
		return {
			color: [Math.random(), Math.random(), Math.random(), 1],
			translation: [canvasWidth * 0.9, canvasHeight * 0.6],
			// translation: [canvasWidth / 2, canvasHeight / 2],
			rotation: [utils.degToRad(360)],
			scale: [1, 1],
			width: canvasWidth,
			height: canvasHeight,
			geometry: boneVertices.flat(),
		}
	}

	/**
	 * Wing Movement
	 */
	updateWingState() {
		// Case 1 : we are in an opening sequence (= positive direction) and this is the end of a movement
		if (
			this.direction === 1 &&
			this.currentTime === this.angles.bones.length - 1
		) {
			// 1. We have arrived at the end of the pause: change to an closing movement (= negative direction)
			if (this.currentStep === 2) {
				this.direction = -1
			} else {
				// load the next movement
				this.currentStep += 1
				this.angles.bones = this.boneAngles[this.currentStep] // step 2 is the pause in this case. A pause is a movement where the angles are the same as the last movement's angles. A pause has its own, shorter steps (= shorter duration)
				this.angles.feathers = this.featherAngles[this.currentStep]
				// set the next movement to start
				this.currentTime = 0
			}
		}
		// Case 2 : we are in a closing sequence (= negative direction) and this is the start of a movement
		if (this.direction === -1 && this.currentTime === 0) {
			// 1. We arrive at the first movement of the sequence: change to an opening movement (= positive direction)
			if (this.currentStep === 0) {
				this.direction = 1
			}
			// 2. We arrive at a middle movement:
			// - update the current data with the data of the middle movement
			// - set the current step to the preceding movement in order
			else {
				// load the next movement
				this.angles.bones = this.boneAngles[this.currentStep]
				this.angles.feathers = this.featherAngles[this.currentStep]
				this.currentTime = this.angles.bones.length - 1
				// set the next movement to start
				this.currentStep = 0
			}
		}

		// Finally: Update the movement one step in the current direction
		this.currentTime = this.currentTime + this.direction
	}
}

const wing = new Wing({
	position: [0, 0],
	direction: WING.direction,
	layers: 1,
	steps: WING.steps,
	pause: WING.pause,
})

export default wing
