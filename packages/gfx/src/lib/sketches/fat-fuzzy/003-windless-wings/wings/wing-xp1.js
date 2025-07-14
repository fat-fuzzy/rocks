import vectors from '../../../../math/vectors.js'
import Wing from '../../wing.js'

export default class WingXp1 extends Wing {
	constructor({
		name = 'xp1',
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

	getFeatherVertices(angle, bone, magnitude, origin) {
		let [x, y] = origin
		let featherVectors = []

		let insertionOrigin
		let insertionDistance = 0
		let featherCount = this.magnitudes.feathers[bone - 1].featherCount
		let featherAngles = this.angles.feathers[this.currentTime]
		let featherAngle = featherAngles[this.currentStep]

		let distance = magnitude / featherCount
		// console.log('featherCount', featherCount)
		// console.log('distance', distance)
		// console.log('magnitude', magnitude)

		for (let step = 0; step < featherCount; step++) {
			insertionDistance = distance * step
			// Save current coordinate system

			console.log('featherAngle', featherAngle)
			insertionOrigin = vectors.getIntersectionPoint(
				x,
				y,
				insertionDistance,
				magnitude,
			)

			// New Wing Coordinates
			// Draw the feather
			featherVectors.push(x, y)
			let featherX = insertionOrigin[0] + 20
			let featherY = insertionOrigin[1] + 100
			;[x, y] = [x + featherX, y + featherY]
			// Experiment 1
			// let featherX = insertionOrigin[0]
			// let featherY = insertionOrigin[1]
			// Experiment 2
			// let featherX = insertionOrigin[0] * featherAngle
			// let featherY = insertionOrigin[1] * featherAngle

			// Draw the feather
			featherVectors.push(featherX, featherY)
		}

		return featherVectors
	}
}
