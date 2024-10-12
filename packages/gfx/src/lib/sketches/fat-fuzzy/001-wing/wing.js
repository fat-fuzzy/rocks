import utils from '../../../math/utils'
import vectors from '../../../math/vectors'

const BONES = {
	magnitude: [160, 180, 200, 80, 50], // Bone magnitudes (=length in px)
	beginning: [360, 292, 158, 257, 320], // Bone angles in degrees : first movement
	middle: [315, 260, 200, 220, 300], // Bone angles in degrees : middle movement
	end: [320, 250, 212, 212, 290], // Bone angles in degrees : end movement
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

	constructor({
		position,
		direction,
		step,
		layers,
		steps,
		pause,
		BONES,
		FEATHERS,
	}) {
		// Context
		this.position = position
		this.layers = layers
		this.direction = direction
		this.currentStep = step
		this.steps = steps
		this.pause = pause
		this.color = [Math.random(), Math.random(), Math.random(), 1]

		// State
		this.currentLayer = 0
		this.currentSection = 0
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
				pause,
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
				steps,
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
				steps / 3,
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
				pause,
			),
		]

		this.boneAngles = [
			utils.normalizeAndInterpolate(
				BONES.beginning,
				BONES.beginning,
				pause, // A pause is a movement where the angles are equal to the angles of the immediately preceding or immediately following movement. A pause has its own, shorter steps (= shorter duration)
			),
			utils.normalizeAndInterpolate(BONES.beginning, BONES.middle, steps),
			utils.normalizeAndInterpolate(
				BONES.middle,
				BONES.end,
				steps / 3, // A shorter movement
			),
			utils.normalizeAndInterpolate(
				BONES.end,
				BONES.end,
				pause, // A pause
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
	}

	// TODO: transform wing data into geometry coordinates (= vertices)
	getBoneVertices() {
		// Save current coordinate system
		// push()
		let coords = this.position
		let origin = coords
		let angle = 0
		let magnitude
		let vectorVertices = []
		let currentMovement = this.angles.bones[this.currentTime]
		let bone

		// 1. Add the  bone vertices in sequence so that a new bone's coords is the last bone's tip
		for (bone = 0; bone < currentMovement.length - 1; bone++) {
			// Translate to current coords (initial or previous bone coords)
			vectorVertices.push(...coords)
			origin = coords
			magnitude = this.magnitudes.bones[bone]
			// Set the new angle -> This is what creates the movement !
			angle = currentMovement[bone]

			// Set current coords to new bone coordinates
			let dest = vectors.getCoordsFromMagAndAngle(magnitude, angle)

			// console.log('dest', dest)
			coords = [origin[0] + dest[0], origin[1] + dest[1]]
			// Draw the bone
			vectorVertices.push(...coords)

			if (bone > 0) {
				// drawFeathers(angle, bone, coords, feathers, time)
			}
		}
		// console.log('bone', bone)
		// console.log('origin', coords)
		// console.log('origin', origin)

		// 2. Draw the last bone that shares its coords with the previous bone
		magnitude = this.magnitudes.bones[bone]
		// console.log('magnitude', magnitude)
		angle = currentMovement[bone]
		// console.log('angle', angle)
		vectorVertices.push(...origin)
		let dest = vectors.getCoordsFromMagAndAngle(magnitude, angle)

		// console.log('dest', dest)
		// Draw the bone
		vectorVertices.push(origin[0] + dest[0], origin[1] + dest[1])

		return vectorVertices
	}

	getGeometryCoords() {
		return {
			color: this.color,
			translation: [this.width * 0.6, this.height * 0.6],
			// translation: [this.width / 2, this.height / 2],
			// translation: [this.width / 3, this.height / 3],
			rotation: [utils.degToRad(0)],
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
			} else if (this.currentStep === 1 || this.currentStep === 0) {
				// load the next movement
				this.currentStep++
				this.angles.bones = this.boneAngles[this.currentStep + 1]
				this.angles.feathers = this.featherAngles[this.currentStep + 1]
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
			// - update the current data with the data of the current movement
			// - set the current step to the preceding movement in order for the next loop
			else if (this.currentStep === 1 || this.currentStep === 2) {
				// load the next movement
				this.angles.bones = this.boneAngles[this.currentStep]
				this.angles.feathers = this.featherAngles[this.currentStep]
				this.currentTime = this.angles.bones.length - 1
				this.currentStep--
			}
		}

		// Finally: Update the movement one step in the current direction
		this.currentTime = this.currentTime + this.direction
	}
}

const WING = {
	steps: 300, // This controls movement speed
	pause: 7, // This controls the pause time at the end of each cycle
	direction: 1,
	currentStep: 0,
}

const wing = new Wing({
	position: [0, 0],
	direction: WING.direction,
	step: WING.currentStep,
	layers: 1,
	steps: WING.steps,
	pause: WING.pause,
	BONES,
	FEATHERS,
})

export default wing
