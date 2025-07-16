import utils from '../../../math/utils.js'
import vectors from '../../../math/vectors.js'
import Wing from './wing.js'

export default class WingXp5 extends Wing {
	constructor({
		name = 'xp5',
		position,
		translation = [0.825, 0.525],
		scale = [0.985, 0.985],
		rotation = utils.degToRad(15.75),
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
		let featherMagnitude = 100
		let featherCount = this.magnitudes.feathers[this.currentStep].featherCount
		let featherAngles = this.angles.feathers[this.currentTime]
		let featherAngle = featherAngles[this.currentStep]

		let distance = magnitude / featherCount

		for (let step = 0; step < featherCount; step++) {
			insertionDistance = distance * step

			// Save current coordinate system
			if (this.currentStep === 0) {
				featherAngle = utils.degToRad(
					this.magnitudes.feathers[this.currentStep].beginning,
				)
			}
			if (this.currentStep === 1) {
				featherAngle = utils.degToRad(
					this.magnitudes.feathers[this.currentStep].middle,
				)
			}
			if (this.currentStep === 2) {
				featherAngle = utils.degToRad(
					this.magnitudes.feathers[this.currentStep].end,
				)
			}

			featherVectors.push(x, y)
			insertionOrigin = vectors.getIntersectionPoint(
				x,
				y,
				insertionDistance,
				magnitude,
			)

			featherVectors.push(x, y)
			featherVectors.push(...insertionOrigin)

			let insertionDest = vectors.getCoordsFromMagAndAngle(
				featherMagnitude + step * 10,
				featherAngle + angle,
			)

			// New Wing Coordinates
			let featherX = insertionOrigin[0] + insertionDest[0]
			let featherY = insertionOrigin[1] + insertionDest[1]

			featherVectors.push(featherX, featherY)
		}

		return featherVectors
	}
}
