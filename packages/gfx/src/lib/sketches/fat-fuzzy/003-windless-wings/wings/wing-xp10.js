import vectors from '../../../../math/vectors.js'
import Wing from '../../wing.js'

export default class WingXp10 extends Wing {
	constructor({
		name = 'xp10',
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
	 *
	 * @param {*} angle
	 * @param {*} bone
	 * @param {*} magnitude
	 * @param {*} origin
	 * @return {number[]} featherVectors
	 */
	getFeatherVertices(angle, bone, magnitude, origin) {
		let [x, y] = origin
		let featherVectors = []

		let dest = vectors.getCoordsFromMagAndAngle(magnitude, angle)
		let insertionOrigin = origin
		let insertionDistance = 0
		let featherMagnitude = this.magnitudes.feathers[bone - 1].beginning
		let featherCount = this.magnitudes.feathers[bone - 1].featherCount
		let featherAngles = this.angles.feathers[this.currentTime]
		let featherAngle = featherAngles[bone]

		let distance = magnitude / featherCount
		// console.log('featherCount', featherCount)
		// console.log('distance', distance)
		// console.log('magnitude', magnitude)

		for (let step = 0; step < featherCount; step++) {
			insertionDistance = distance * step

			featherVectors.push(x, y)
			// console.log('featherAngle', featherAngle)
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
