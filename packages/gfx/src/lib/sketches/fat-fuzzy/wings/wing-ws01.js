import vectors from '../../../math/vectors.js'
import Wing from './wing.js'

export default class WabiSabi01 extends Wing {
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
		let featherCount = this.magnitudes.feathers[this.currentStep].featherCount

		let distance = magnitude / featherCount

		for (let step = 0; step < featherCount; step++) {
			insertionDistance = distance * step
			insertionOrigin = vectors.getIntersectionPoint(
				x,
				y,
				insertionDistance,
				magnitude,
			)

			// New Wing Coordinates
			featherVectors.push(x, y)
			let featherX = insertionOrigin[0] + this.scaleMagnitude(20)
			let featherY = insertionOrigin[1] + this.scaleMagnitude(100)
			;[x, y] = [x + featherX, y + featherY]

			// Draw the feather
			featherVectors.push(featherX, featherY)
		}

		return featherVectors
	}
}
