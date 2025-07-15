import utils from '../../../../math/utils'
import vectors from '../../../../math/vectors.js'
import Wing from '../../wing.js'

export default class WingXp16 extends Wing {
	constructor({
		name = 'xp16',
		position,
		translation = [0.9, 0.625],
		scale = [0.4025, 0.4025],
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
		let featherCount = this.magnitudes.feathers[this.currentStep].featherCount
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
