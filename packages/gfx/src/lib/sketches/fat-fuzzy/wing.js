import utils from '../../math/utils'
import vectors from '../../math/vectors'
export default class Wing {
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

	/**
	 *
	 * @param {*} wing state = {
			position: number[],
			direction: number,
			step: number,
			layers: number,
			steps: number,
			pause: number,
			bones: { magnitude: number[], beginning: number[], middle: number[], end: number[] },
			feathers: { sections: { featherCount: number, beginning: number, middle: number, end: number }[] },
		}
	 */
	constructor({
		position,
		direction,
		step,
		layers,
		steps,
		pause,
		bones,
		feathers,
		colors,
		drawFeathers = false,
	}) {
		// Context
		this.position = position
		this.layers = layers
		this.direction = direction
		this.currentStep = step
		this.steps = steps
		this.pause = pause
		this.colors = colors
		this.colorDraw = [Math.random(), Math.random(), Math.random()]
		this.colorBg = [
			this.colorDraw[0] / 2,
			this.colorDraw[1] / 2,
			this.colorDraw[2] / 2,
		]
		this.color = this.colorDraw
		this.drawFeathers = drawFeathers

		// State
		this.currentLayer = 0
		this.currentSection = 0
		this.currentTime = 0
		this.width = 0
		this.height = 0
		this.clear = false
		this.erase = 0

		this.boneAngles = [
			utils.normalizeAndInterpolate(
				bones.beginning,
				bones.beginning,
				pause, // A pause is a movement where the angles are equal to the angles of the immediately preceding or immediately following movement. A pause has its own, shorter steps (= shorter duration)
			),
			utils.normalizeAndInterpolate(bones.beginning, bones.middle, steps),
			utils.normalizeAndInterpolate(
				bones.middle,
				bones.end,
				steps / 3, // A shorter movement
			),
			utils.normalizeAndInterpolate(
				bones.end,
				bones.end,
				pause, // A pause
			),
		]
		this.featherAngles = [
			utils.normalizeAndInterpolate(
				[
					feathers.sections[0].beginning,
					feathers.sections[1].beginning,
					feathers.sections[2].beginning,
				],
				[
					feathers.sections[0].middle,
					feathers.sections[1].middle,
					feathers.sections[2].middle,
				],
				pause,
			),
			utils.normalizeAndInterpolate(
				[
					feathers.sections[0].beginning,
					feathers.sections[1].beginning,
					feathers.sections[2].beginning,
				],
				[
					feathers.sections[0].middle,
					feathers.sections[1].middle,
					feathers.sections[2].middle,
				],
				steps,
			),
			utils.normalizeAndInterpolate(
				[
					feathers.sections[0].middle,
					feathers.sections[1].middle,
					feathers.sections[2].middle,
				],
				[
					feathers.sections[0].end,
					feathers.sections[1].end,
					feathers.sections[2].end,
				],
				steps / 3,
			),
			utils.normalizeAndInterpolate(
				[
					feathers.sections[0].middle,
					feathers.sections[1].middle,
					feathers.sections[2].middle,
				],
				[
					feathers.sections[0].end,
					feathers.sections[1].end,
					feathers.sections[2].end,
				],
				pause,
			),
		]
		this.magnitudes = {
			bones: bones.magnitude,
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

			coords = [origin[0] + dest[0], origin[1] + dest[1]]
			// Draw the bone
			vectorVertices.push(...coords)

			if (this.drawFeathers && bone > 0) {
				// drawFeathers(angle, bone, coords, feathers, time)
			}
		}
		// 2. Draw the last bone that shares its coords with the previous bone
		magnitude = this.magnitudes.bones[bone]
		angle = currentMovement[bone]
		vectorVertices.push(...origin)
		let dest = vectors.getCoordsFromMagAndAngle(magnitude, angle)

		// Draw the bone
		vectorVertices.push(origin[0] + dest[0], origin[1] + dest[1])

		return vectorVertices
	}

	getGeometryCoords() {
		return {
			color: this.colors.mute(
				this.angles.bones[this.currentTime][this.currentStep] /
					utils.degToRad(360),
				this.color,
				this.currentTime / this.steps,
			),
			translation: [this.width * 0.9, this.height * 0.6],
			rotation: [utils.degToRad(0)],
			scale: [1, 1],
			width: this.width,
			height: this.height,
			geometry: this.getBoneVertices(),
			background: this.color,
			clear: this.clear,
		}
	}

	/**
	 * Wing Movement
	 */
	updateWingState() {
		// Case 1 : we are in an opening sequence (= positive direction) and this is the end of a movement
		this.clear = false
		if (
			this.direction === 1 &&
			this.currentTime === this.angles.bones.length - 1
		) {
			// 1. We have arrived at the end of the pause: change to an closing movement (= negative direction)
			if (this.currentStep === 2) {
				this.direction = -1
				if (this.erase === 4) {
					// Clear the canvas periodically to free up memory
					this.clear = true
					this.color = this.colorDraw
					this.erase = 0
				} else {
					this.erase++
				}
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
				if (this.erase === 2) {
					this.color = this.colorBg
				} else {
					this.erase++
				}
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
