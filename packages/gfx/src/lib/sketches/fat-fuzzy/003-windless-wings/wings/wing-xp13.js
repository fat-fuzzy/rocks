import vectors from '../../../../math/vectors'
import Wing from '../../wing.js'

export default class WingXp13 extends Wing {
	constructor({
		name = 'xp13',
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
		canvasWidth,
		canvasHeight,
	}) {
		super({
			name,
			position,
			direction,
			step,
			layers,
			steps,
			pause,
			bones,
			feathers,
			colors,
			drawFeathers,
			canvasWidth,
			canvasHeight,
		})
	}

	/**
	 * @param {*} magnitude
	 * @param {*} origin
	 * @param {number} angle
	 * @return {number[]} featherVectors
	 */
	getFeatherVertices(magnitude, origin, angle) {
		let [x, y] = origin
		let featherVectors = []
		let insertionOrigin
		let insertionDistance = 0
		let featherMagnitude = this.magnitudes.feathers[this.currentStep].beginning
		let featherCount = this.magnitudes.feathers[this.currentStep].featherCount
		let featherAngles = this.angles.feathers[this.currentTime]
		let featherAngle = featherAngles[this.currentStep]

		let distance = magnitude / featherCount
		// console.log('featherCount', featherCount)
		// console.log('distance', distance)
		// console.log('magnitude', magnitude)

		for (let step = 0; step < featherCount; step++) {
			insertionDistance = distance * step

			featherVectors.push(x, y)
			// console.log('featherAngle', featherAngle)
			insertionOrigin = vectors.getIntersectionPoint(
				x,
				y,
				insertionDistance,
				magnitude,
			)

			featherVectors.push(x, y)
			featherVectors.push(x + insertionOrigin[0], y + insertionOrigin[1])
			// console.log('featherAngle', featherAngle)
			let insertionDest = vectors.getCoordsFromMagAndAngle(
				featherMagnitude + step * 10,
				featherAngle,
			)

			// New Wing Coordinates
			let featherX = insertionOrigin[0] + insertionDest[0]
			let featherY = insertionOrigin[1] + insertionDest[1]

			// Draw the feather
			featherVectors.push(featherX, featherY)
			featherVectors.push(x + insertionOrigin[0], y + insertionOrigin[1])
		}
		return featherVectors
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
