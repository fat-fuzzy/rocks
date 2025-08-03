import vectors from '../../../math/vectors.js'
import Wing from './wing.js'

export default class WabiSabi08 extends Wing {
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

		let insertionOrigin = origin
		let insertionDistance = 0
		let featherMagnitude = this.scaleMagnitude(100)
		let featherCount = this.magnitudes.feathers[this.currentStep].featherCount

		let distance = magnitude / featherCount

		featherVectors.push(...insertionOrigin)

		for (let step = 0; step < featherCount; step++) {
			insertionDistance = distance * step

			insertionOrigin = vectors.getIntersectionPoint(
				x,
				y,
				insertionDistance,
				magnitude,
			)

			featherVectors.push(...insertionOrigin)
			featherVectors.push(x + insertionOrigin[0], y + insertionOrigin[1])

			let insertionDest = vectors.getCoordsFromMagAndAngle(
				featherMagnitude + this.scaleMagnitude(step * 10),
				angle,
			)

			// New Wing Coordinates
			let featherX = insertionOrigin[0] + insertionDest[0]
			let featherY = insertionOrigin[1] + insertionDest[1]

			featherVectors.push(featherX, featherY)
			featherVectors.push(x + insertionOrigin[0], y + insertionOrigin[1])
		}

		return featherVectors
	}
}
