import vectors from '../../../../math/vectors'
import Wing from '../../wing.js'

export default class WingXp14 extends Wing {
	constructor({
		name = 'xp14',
		position,
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
		// console.log('featherCount', featherCount)
		// console.log('distance', distance)
		// console.log('magnitude', magnitude)

		for (let step = 0; step < featherCount; step++) {
			insertionDistance = distance * step

			featherVectors.push(x, y)
			// console.log('featherAngle', featherAngle)
			insertionOrigin = vectors.getIntersectionPoint(
				x,
				y,
				insertionDistance,
				magnitude,
			)

			featherVectors.push(x, y)
			featherVectors.push(x + insertionOrigin[0], y + insertionOrigin[1])
			// console.log('featherAngle', featherAngle)
			let insertionDest = vectors.getCoordsFromMagAndAngle(
				featherMagnitude + step * 10,
				featherAngle,
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
