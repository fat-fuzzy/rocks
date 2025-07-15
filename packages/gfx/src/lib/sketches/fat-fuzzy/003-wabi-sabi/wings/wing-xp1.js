import vectors from '../../../../math/vectors.js'
import Wing from '../../wing.js'

export default class WingXp1 extends Wing {
	constructor({
		name = 'xp1',
		position,
		translation = [0.725, 0.0275],
		scale = [0.11, 0.11],
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
			scale,
			translation,
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
			let featherX = insertionOrigin[0] + 20
			let featherY = insertionOrigin[1] + 100
			;[x, y] = [x + featherX, y + featherY]

			// Draw the feather
			featherVectors.push(featherX, featherY)
		}

		return featherVectors
	}
}
