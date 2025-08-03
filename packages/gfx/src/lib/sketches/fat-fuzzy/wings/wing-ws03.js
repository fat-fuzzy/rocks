import vectors from '../../../math/vectors.js'
import Wing from './wing.js'

export default class WabiSabi03 extends Wing {
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

		let distance = magnitude / featherCount

		for (let step = 0; step < featherCount; step++) {
			insertionDistance = distance * step

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
				featherMagnitude + this.scaleMagnitude(step * 10),
				featherAngle,
			)

			// New Wing Coordinates
			// Draw the feather
			let featherX = insertionOrigin[0] + insertionDest[0]
			let featherY = insertionOrigin[1] + insertionDest[1]
			// Experiment 1
			// let featherX = insertionOrigin[0]
			// let featherY = insertionOrigin[1]
			// Experiment 2
			// let featherX = insertionOrigin[0] * featherAngle
			// let featherY = insertionOrigin[1] * featherAngle

			// Draw the feather
			featherVectors.push(featherX, featherY)
		}

		return featherVectors
	}
}
