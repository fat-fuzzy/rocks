import utils from '../../../math/utils.js'
import vectors from '../../../math/vectors.js'
import Wing from './wing.js'

export default class WabiSabi14 extends Wing {
	constructor({
		name = 'ws14',
		position,
		translation = [0.925, 0.655],
		scale = [0.4, 0.4],
		rotation = utils.degToRad(0),
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
	}) {
		super({
			name,
			position,
			translation,
			rotation,
			scale,
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
		// let featherMagnitude = 100
		let featherCount = this.scaleMagnitude(
			this.magnitudes.feathers[this.currentStep].featherCount,
		)
		let featherAngles = this.angles.feathers[this.currentTime]
		let featherAngle = featherAngles[this.currentStep]

		let distance = magnitude / featherCount

		for (let step = 0; step < featherCount; step++) {
			insertionDistance = distance * step

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

			// New Wing Coordinates
			let featherX = insertionOrigin[0] * featherAngle
			let featherY = insertionOrigin[1] * featherAngle

			featherVectors.push(featherX, featherY)
		}

		return featherVectors
	}
}
