import vectors from '../../../../math/vectors.js'
import Wing from '../../wing.js'

export default class WingXp8 extends Wing {
	constructor({
		name = 'xp8',
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

	getFeatherVertices(angle, bone, magnitude, origin, vectorVertices) {
		let [x, y] = origin

		let insertionOrigin = origin
		let insertionDistance = 0
		let featherMagnitude = 100
		let featherCount = this.magnitudes.feathers[bone - 1].featherCount
		let featherAngles = this.angles.feathers[this.currentTime]
		let featherAngle = featherAngles[bone - 1]

		let distance = magnitude / featherCount
		// console.log('featherCount', featherCount)
		// console.log('distance', distance)
		// console.log('magnitude', magnitude)

		for (let step = 0; step < featherCount; step++) {
			insertionDistance = distance * step
			// Save current coordinate system
			// if (bone === 1) {
			// 	featherAngle = utils.degToRad(
			// 		this.magnitudes.feathers[bone - 1].beginning,
			// 	)
			// }
			// if (bone === 2) {
			// 	featherAngle = utils.degToRad(this.magnitudes.feathers[bone - 1].middle)
			// }
			// if (bone === 3) {
			// 	featherAngle = utils.degToRad(this.magnitudes.feathers[bone - 1].end)
			// }

			vectorVertices.push(x, y)
			// console.log('featherAngle', featherAngle)
			insertionOrigin = vectors.getIntersectionPoint(
				x,
				y,
				insertionDistance,
				magnitude,
			)

			vectorVertices.push(x, y)
			vectorVertices.push(x + insertionOrigin[0], y + insertionOrigin[1])
			vectorVertices.push(insertionOrigin[0], insertionOrigin[1])
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
			vectorVertices.push(featherX, featherY)
		}
	}
}
