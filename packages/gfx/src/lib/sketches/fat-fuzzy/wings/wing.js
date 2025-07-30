import utils from '../../../math/utils'
import vectors from '../../../math/vectors'

export default class Wing {
	name
	// Context
	position
	translation = [0.9, 0.6] // Default translation
	scale = [1, 1] // Default scale
	rotation = utils.degToRad(0)
	layers
	direction
	steps // This controls movement speed
	pause // This controls the pause time at the end of each cycle
	width
	height

	// Colors
	colorDraw
	colorBg
	color
	colors
	drawFeathers

	// State
	currentLayer = 0
	currentSection = 0
	currentTime = 0
	clear = false
	erase = 0

	clear
	erase

	// Angles and Magnitudes
	boneAngles
	featherAngles
	magnitudes
	angles

	/**
	 * @param {*} wing state = {
			name: string,
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
		name,
		position,
		translation,
		scale,
		rotation,
		direction,
		step,
		layers,
		steps,
		pause,
		bones,
		feathers,
		colors,
		drawFeathers = false,
		canvasWidth,
		canvasHeight,
	}) {
		this.name = name
		// Context
		this.position = position
		this.scale = scale
		this.rotation = rotation
		this.translation = translation
		this.layers = layers
		this.direction = direction
		this.currentStep = step
		this.steps = steps
		this.pause = pause

		// TODO: figure out color management
		this.colors = colors

		let drawingColors = utils.randomColorPair(Math.random())
		this.colorDraw = drawingColors.foreground
		this.colorBg = drawingColors.background
		this.color = this.colorDraw

		this.drawFeathers = drawFeathers

		// State
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
			feathers: feathers.sections,
		}
		this.angles = {
			bones: this.boneAngles[this.currentStep],
			feathers: this.featherAngles[this.currentStep],
		}
		this.width = canvasWidth
		this.height = canvasHeight
		this.magnitudes.bones = this.scaleToCanvasSize(this.magnitudes.bones)
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

	/**
	 *
	 * @param {*} color a number[] color vector with RGB values between 0 and 1
	 */
	setColor(color) {
		if (color) {
			this.color = color
		} else {
			this.color = [Math.random(), Math.random(), Math.random()]
		}
	}

	/**
	 *
	 * @param {number[]} magnitudes
	 */
	scaleToCanvasSize(magnitudes) {
		if (!Array.isArray(magnitudes) || magnitudes.some(isNaN)) {
			throw new Error('Invalid magnitudes array')
		}
		let total = magnitudes.reduce((acc, curr) => acc + curr, 0)
		if (total === 0) {
			throw new Error('Total magnitude is zero')
		}
		let scale = this.width / total
		return magnitudes.map((m) => m * scale)
	}

	// TODO: transform wing data into geometry coordinates (= vertices)
	getBoneVertices() {
		// Save current coordinate system
		let coords = this.position
		let origin = coords
		let angle = 0
		let magnitude
		let boneVectors = []
		let featherVectors = []
		let wingVectors = []
		let currentMovement = this.angles.bones[this.currentTime]
		let bone
		let dest

		// 1. Add the  bone vertices in sequence so that a new bone's coords is the last bone's tip
		for (bone = 0; bone < currentMovement.length - 1; bone++) {
			// Translate to current coords (initial or previous bone coords)
			boneVectors.push(...coords)
			origin = coords
			magnitude = this.magnitudes.bones[bone]
			// Set the new angle -> This is what creates the movement !
			angle = currentMovement[bone]

			// Set current coords to new bone coordinates
			dest = vectors.getCoordsFromMagAndAngle(magnitude, angle)

			coords = [origin[0] + dest[0], origin[1] + dest[1]]
			// Draw the bone
			boneVectors.push(...coords)

			if (this.drawFeathers && bone > 0) {
				featherVectors = this.getFeatherVertices(magnitude, coords, angle)
				// Draw the bone
				boneVectors = boneVectors.concat(featherVectors)
			}
		}

		// 2. Draw the last bone that shares its coords with the previous bone
		magnitude = this.magnitudes.bones[bone]
		angle = currentMovement[bone]
		boneVectors.push(...origin)
		dest = vectors.getCoordsFromMagAndAngle(magnitude, angle)
		coords = [origin[0] + dest[0], origin[1] + dest[1]]

		// Draw the bone
		boneVectors.push(...coords)

		if (this.drawFeathers && bone > 0) {
			featherVectors = this.getFeatherVertices(magnitude, coords, angle)
			// Draw the bone
			wingVectors = boneVectors.concat(featherVectors)
		}

		return wingVectors
	}

	/**
	 * @param {number} magnitude
	 * @param {number[]} origin
	 * @param {number} angle
	 * @return {number[]} featherVectors
	 */
	getFeatherVertices(magnitude, origin, angle) {
		let [x, y] = origin
		let featherVectors = []

		// // Draw the feather
		// featherVectors.push(...origin)
		// // Hypothenuse
		// let magnitude = Math.abs(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)))

		let featherMagnitude = this.magnitudes.feathers[this.currentStep].beginning
		let insertionOrigin
		let insertionDistance = 0
		let featherCount = this.magnitudes.feathers[this.currentStep].featherCount
		let featherAngles = this.angles.feathers[this.currentTime]
		let featherAngle = featherAngles[this.currentStep]

		let distance = magnitude / featherCount

		let bone = this.currentStep + 1
		for (let step = 0; step < featherCount; step++) {
			// Save current coordinate system
			let angleStep = step + 1
			if (bone === 1) {
				insertionDistance = distance * step
				featherMagnitude = 30 + step * step
				featherAngle = featherAngle + angleStep
			}
			if (bone === 2) {
				insertionDistance = distance * step
				featherMagnitude = 20 + step * step
				featherAngle = featherAngle
			}
			if (bone === 3) {
				insertionDistance = distance * step
				featherMagnitude = 50 + step * step
				featherAngle = featherAngle + angleStep * 1.5
			}

			insertionOrigin = vectors.getIntersectionPoint(
				x,
				y,
				insertionDistance,
				magnitude,
			)

			// New Wing Coordinates

			let featherX = insertionOrigin[0] + featherMagnitude * featherAngle
			let featherY = insertionOrigin[1] + featherMagnitude * featherAngle

			// Draw the feather
			featherVectors.push(featherX, featherY)
			// Draw the feather
			featherVectors.push(origin[0], origin[1])
		}

		return featherVectors
	}

	getGeometryCoords() {
		return {
			color: this.colors.mute(
				this.angles.bones[this.currentTime][this.currentStep] /
					utils.degToRad(360),
				this.color,
				this.currentTime / this.steps,
			),
			translation: [
				this.width * this.translation[0],
				this.height * this.translation[1],
			],
			rotation: [this.rotation],
			scale: this.scale,
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
