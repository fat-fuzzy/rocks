import vectors from '../../../../math/vectors.js'
import Wing from '../../wing.js'

export default class WingXp17 extends Wing {
	constructor({
		name = 'xp17',
		position,
		translation = [0.945, 0.6],
		scale = [1.1, 1.1],
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
			translation,
			scale,
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
		let featherMagnitude = this.magnitudes.feathers[this.currentStep].beginning
		let featherCount = this.magnitudes.feathers[this.currentStep].featherCount
		let featherAngles = this.angles.feathers[this.currentTime]
		let featherAngle = featherAngles[this.currentStep]

		let distance = magnitude / featherCount
		let unit = vectors.getUnitVector(x, y, magnitude)
		featherVectors.push(x, y)

		for (let step = 0; step < featherCount; step++) {
			insertionDistance = distance * step

			insertionOrigin = vectors.getIntersectionPoint(unit, insertionDistance)

			let insertionDest = vectors.getCoordsFromMagAndAngle(
				featherMagnitude + step * 10,
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
