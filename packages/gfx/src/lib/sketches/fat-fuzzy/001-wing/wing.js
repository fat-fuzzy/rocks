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

const BONES_WEBGL = {
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
	width
	height

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
		this.width = 0
		this.height = 0

		// Trigonometric assets
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
				BONES.beginning,
				BONES.middle,
				WING.pause, // A pause is a  movement where the angles are equal to the angles of the immediately preceding or immediately following movement. A pause has its own, shorter steps (= shorter duration)
			),
			utils.normalizeAndInterpolate(BONES.beginning, BONES.middle, WING.steps),
			utils.normalizeAndInterpolate(
				BONES.middle,
				BONES.end,
				WING.steps / 3, // A shorter movement
			),
			utils.normalizeAndInterpolate(
				BONES.middle,
				BONES.end,
				WING.pause, // A pause
			),
		]

		this.magnitudes = {
			bones: BONES.magnitude,
		}
		this.vertices = {
			bones: [BONES.beginning, BONES.beginning, BONES.middle, BONES.end],
		}
		this.angles = {
			bones: this.boneAngles[this.currentStep],
			feathers: this.featherAngles[this.currentStep],
		}
	}

	/**
	 *
	 * @param {number} canvasWidth
	 * @param {number} canvasHeight
	 */
	init(canvasWidth, canvasHeight) {
		this.width = canvasWidth
		this.height = canvasHeight
		this.position = [canvasWidth / 2, canvasHeight / 2]
	}

	// TODO: transform wing data into geometry coordinates (= vertices)
	getBoneVertices() {
		// Save current coordinate system
		// push()
		let coords = this.position
		let prevOrigin = coords
		let angle
		let magnitude
		let vectorVertices = []
		let currentMovement = this.angles.bones[this.currentTime]
		let bone

		// 1. Add the  bone vertices in sequence so that a new bone's coords is the last bone's tip
		for (bone = 0; bone < currentMovement.length - 1; bone++) {
			// Translate to current coords (initial or previous bone coords)
			vectorVertices.push(...coords)
			prevOrigin = [...coords]
			magnitude = this.magnitudes.bones[bone]
			// Set the new angle -> This is what creates the movement !
			angle = currentMovement[bone]

			// Set current coords to new bone coordinates
			coords = vectors.getCoordsFromMagnitudeAndAngle(magnitude, angle)

			// Draw the bone
			vectorVertices.push(...coords)

			if (bone > 0) {
				// drawFeathers(angle, bone, coords, feathers, time)
			}
		}

		// 2. Draw the last bone that shares its coords with the previous bone
		magnitude = this.magnitudes.bones[bone]
		angle = currentMovement[bone]
		vectorVertices.push(...prevOrigin)
		coords = vectors.getCoordsFromMagnitudeAndAngle(magnitude, angle)
		vectorVertices.push(...coords)

		return vectorVertices
	}

	getGeometryCoords() {
		return {
			color: [Math.random(), Math.random(), Math.random(), 1],
			// translation: [this.width * 0.6, this.height * 0.6],
			// translation: [this.width / 2, this.height / 2],
			translation: [this.width / 3, this.height / 3],
			rotation: [utils.degToRad(360)],
			scale: [1, 1],
			width: this.width,
			height: this.height,
			geometry: this.getBoneVertices(),
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
