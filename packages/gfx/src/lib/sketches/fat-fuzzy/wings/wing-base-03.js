import vectors from '../../../math/vectors.js'
import Wing from './wing.js'

export default class WingBase03 extends Wing {
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
		let featherMagnitude = this.scaleMagnitude(
			this.magnitudes.feathers[this.currentStep].beginning,
		)
		let featherCount = this.magnitudes.feathers[this.currentStep].featherCount
		let featherAngles = this.angles.feathers[this.currentTime]
		let featherAngle = featherAngles[this.currentStep]

		let distance = magnitude / featherCount
		let unit = vectors.getUnitVector(x, y, magnitude)

		for (let step = 0; step < featherCount; step++) {
			insertionDistance = distance * step

			featherVectors.push(x, y)

			insertionOrigin = vectors.getIntersectionPoint(unit, insertionDistance)

			let insertionDest = vectors.getCoordsFromMagAndAngle(
				featherMagnitude + this.scaleMagnitude(step * 10),
				featherAngle,
			)

			// New Wing Coordinates
			let featherX = insertionOrigin[0] + insertionDest[0]
			let featherY = insertionOrigin[1] + insertionDest[1]

			featherVectors.push(...insertionOrigin, featherX, featherY)
		}
		return featherVectors
	}
}
