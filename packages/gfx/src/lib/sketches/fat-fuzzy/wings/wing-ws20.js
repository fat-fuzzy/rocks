import utils from '../../../math/utils.js'
import vectors from '../../../math/vectors.js'
import Wing from './wing.js'

export default class WabiSabi20 extends Wing {
	/**
	 * @param {Object} wingOptions (see ./wing.js)
	 */
	constructor(options) {
		super(options)
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
		let featherMagnitude = this.scaleMagnitude(100)
		let featherCount = this.magnitudes.feathers[this.currentStep].featherCount
		let featherAngles = this.angles.feathers[this.currentTime]
		let featherAngle = featherAngles[this.currentStep]

		let distance = magnitude / this.scaleMagnitude(featherCount)

		for (let step = 0; step < featherCount; step++) {
			insertionDistance = distance * this.scaleMagnitude(step)

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
				x + this.scaleMagnitude(10),
				y + this.scaleMagnitude(10),
				insertionDistance,
				magnitude,
			)

			featherVectors.push(...insertionOrigin)
			featherVectors.push(x, y)

			let insertionDest = vectors.getCoordsFromMagAndAngle(
				featherMagnitude + this.scaleMagnitude(step * 50),
				featherAngle - angle,
			)

			// New Wing Coordinates
			let featherX = insertionOrigin[0] + insertionDest[0]
			let featherY = insertionOrigin[1] + insertionDest[1]

			featherVectors.push(featherX, featherY)
		}

		return featherVectors
	}
}
