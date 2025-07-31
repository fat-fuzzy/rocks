import utils from '../../../math/utils.js'
import vectors from '../../../math/vectors.js'
import Wing from './wing.js'

export default class WabiSabi09 extends Wing {
	constructor({
		name = 'ws09',
		position,
		translation = [0.575, 0.525],
		scale = [0.645, 0.645],
		rotation = utils.degToRad(25.75),
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

		let dest = vectors.getCoordsFromMagAndAngle(magnitude, angle)
		let insertionOrigin = origin
		let insertionDistance = 0
		let featherMagnitude = this.scaleMagnitude(
			this.magnitudes.feathers[this.currentStep].beginning,
		)
		let featherCount = this.magnitudes.feathers[this.currentStep].featherCount
		let featherAngles = this.angles.feathers[this.currentTime]
		let featherAngle = featherAngles[this.currentStep]

		let distance = magnitude / featherCount

		for (let step = 0; step < featherCount; step++) {
			insertionDistance = distance * step

			featherVectors.push(x, y)

			insertionOrigin = vectors.getIntersectionPoint(
				...dest,
				insertionDistance,
				magnitude,
			)

			featherVectors.push(...dest)
			featherVectors.push(
				dest[0] + insertionOrigin[0],
				dest[1] + insertionOrigin[1],
			)

			let insertionDest = vectors.getCoordsFromMagAndAngle(
				featherMagnitude + this.scaleMagnitude(step * 10),
				featherAngle,
			)

			// New Wing Coordinates
			let featherX = insertionOrigin[0] + insertionDest[0]
			let featherY = insertionOrigin[1] + insertionDest[1]

			featherVectors.push(featherX, featherY)
		}
		return featherVectors
	}
}
