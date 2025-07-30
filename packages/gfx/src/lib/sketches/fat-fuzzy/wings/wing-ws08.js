import utils from '../../../math/utils.js'
import vectors from '../../../math/vectors.js'
import Wing from './wing.js'

export default class WabiSabi08 extends Wing {
	constructor({
		name = 'ws08',
		position,
		translation = [0.965, 0.505],
		scale = [0.605, 0.605],
		rotation = utils.degToRad(12),
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
		let featherAngles = this.angles.feathers[this.currentTime]

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
