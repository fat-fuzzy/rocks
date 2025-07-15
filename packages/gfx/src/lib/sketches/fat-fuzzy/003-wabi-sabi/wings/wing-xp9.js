import vectors from '../../../../math/vectors.js'
import Wing from '../../wing.js'

export default class WingXp9 extends Wing {
	constructor({
		name = 'xp9',
		position,
		translation = [0.835, 0.565],
		scale = [0.5175, 0.5175],
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
		let featherMagnitude = 100
		let featherCount = this.magnitudes.feathers[this.currentStep].featherCount
		let featherAngles = this.angles.feathers[this.currentTime]
		let featherAngle = featherAngles[this.currentStep]

		let distance = magnitude / featherCount
		// console.log('featherCount', featherCount)
		// console.log('distance', distance)
		// console.log('magnitude', magnitude)

		for (let step = 0; step < featherCount; step++) {
			insertionDistance = distance * step
			// Save current coordinate system
			// if (bone === 1) {
			// 	featherAngle = utils.degToRad(
			// 		this.magnitudes.feathers[this.currentStep].beginning,
			// 	)
			// }
			// if (bone === 2) {
			// 	featherAngle = utils.degToRad(this.magnitudes.feathers[this.currentStep].middle)
			// }
			// if (bone === 3) {
			// 	featherAngle = utils.degToRad(this.magnitudes.feathers[this.currentStep].end)
			// }

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
			featherVectors.push(x + insertionOrigin[0], y + insertionOrigin[1])
		}

		return featherVectors
	}
}
