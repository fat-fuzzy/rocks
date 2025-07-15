import utils from '../../../../math/utils.js'
import vectors from '../../../../math/vectors'
import Wing from '../../wing.js'

export default class WingXp18 extends Wing {
	constructor({
		name = 'xp18',
		position,
		translation = [0.945, 0.6],
		scale = [1.1, 1.1],
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
			scale,
			translation,
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
	 *
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
		let featherCount = this.magnitudes.feathers[this.currentStep].featherCount
		let featherAngles = this.angles.feathers[this.currentTime]
		let featherAngle = featherAngles[this.currentStep]

		let distance = magnitude / featherCount
		// console.log('featherCount', featherCount)
		// console.log('distance', distance)
		// console.log('magnitude', magnitude)

		for (let step = 0; step < featherCount; step++) {
			insertionDistance = distance * step
			// Save current coordinate system
			if (this.currentStep === 1) {
				featherAngle = utils.degToRad(
					this.magnitudes.feathers[this.currentStep].beginning,
				)
			}
			if (this.currentStep === 2) {
				featherAngle = utils.degToRad(
					this.magnitudes.feathers[this.currentStep].middle,
				)
			}
			if (this.currentStep === 3) {
				featherAngle = utils.degToRad(
					this.magnitudes.feathers[this.currentStep].end,
				)
			}

			// console.log('featherAngle', featherAngle)
			insertionOrigin = vectors.getIntersectionPoint(
				x,
				y,
				insertionDistance,
				magnitude,
			)

			// New Wing Coordinates
			// Draw the feather
			featherVectors.push(origin[0], origin[1])
			// let featherX = insertionOrigin[0] + 100 * featherAngle
			// let featherY = insertionOrigin[1] + 100 * featherAngle
			// Experiment 1
			let featherX = insertionOrigin[0]
			let featherY = insertionOrigin[1]
			// Experiment 2
			// let featherX = insertionOrigin[0] * featherAngle
			// let featherY = insertionOrigin[1] * featherAngle

			// Draw the feather
			featherVectors.push(featherX, featherY)
		}

		return featherVectors
	}
}
