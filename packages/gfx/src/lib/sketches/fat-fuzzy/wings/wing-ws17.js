import utils from '../../../math/utils.js'
import vectors from '../../../math/vectors.js'
import Wing from './wing.js'

export default class WabiSabi17 extends Wing {
	constructor({
		name = 'ws17',
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
		let featherMagnitude = this.scaleMagnitude(
			this.magnitudes.feathers[this.currentStep].middle,
		)
		let featherCount = this.magnitudes.feathers[this.currentStep].featherCount
		let featherAngles = this.angles.feathers[this.currentTime]
		let featherAngle = featherAngles[this.currentStep]

		let distance = magnitude / featherCount

		for (let step = 0; step < featherCount; step++) {
			insertionDistance = distance * step

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

			let insertionDest = vectors.getCoordsFromMagAndAngle(
				featherMagnitude + this.scaleMagnitude(step * 50),
				angle * featherAngle,
			)

			insertionOrigin = vectors.getIntersectionPoint(
				...insertionDest,
				insertionDistance,
				magnitude,
			)

			// New Wing Coordinates
			featherVectors.push(origin[0], origin[1])
			let featherX = insertionOrigin[0]
			let featherY = insertionOrigin[1]

			featherVectors.push(featherX, featherY)
		}

		return featherVectors
	}
}
