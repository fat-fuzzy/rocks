import utils from '../../../math/utils.js'
import vectors from '../../../math/vectors.js'
import Wing from './wing.js'

export default class WabiSabi06 extends Wing {
	constructor({
		name = 'ws06',
		position,
		translation = [0.895, 0.55],
		scale = [0.575, 0.575],
		rotation = utils.degToRad(5),
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
			featherVectors.push(x + insertionOrigin[0], y + insertionOrigin[1])
			let insertionDest = vectors.getCoordsFromMagAndAngle(
				featherMagnitude + this.scaleMagnitude(step * 10),
				featherAngle - angle,
			)

			// New Wing Coordinates
			let featherX = insertionOrigin[0] + insertionDest[0]
			let featherY = insertionOrigin[1] + insertionDest[1]

			// Draw the feather
			featherVectors.push(featherX, featherY)
		}

		return featherVectors
	}
}
