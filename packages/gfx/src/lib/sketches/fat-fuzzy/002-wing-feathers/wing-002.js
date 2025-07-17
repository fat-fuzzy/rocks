import vectors from '../../../math/vectors'
import Wing from './wing.js'

class Wing002 extends Wing {
	constructor({
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

		let featherMagnitude = this.magnitudes.feathers[bone - 1].beginning
		let insertionOrigin
		let insertionDistance = 0
		let featherCount = this.magnitudes.feathers[bone - 1].featherCount
		let featherAngles = this.angles.feathers[this.currentTime]
		let featherAngle = featherAngles[bone - 1]

		let distance = magnitude / featherCount

		for (let step = 0; step < featherCount; step++) {
			// Save current coordinate system
			let angleStep = step + 1
			if (bone === 1) {
				insertionDistance = distance * step
				featherMagnitude = 30 + step * step
				featherAngle = featherAngle + angleStep
			}
			if (bone === 2) {
				insertionDistance = distance * step
				featherMagnitude = 20 + step * step
				featherAngle = featherAngle
			}
			if (bone === 3) {
				insertionDistance = distance * step
				featherMagnitude = 50 + step * step
				featherAngle = featherAngle + angleStep * 1.5
			}

			insertionOrigin = vectors.getIntersectionPoint(
				x,
				y,
				insertionDistance,
				magnitude,
			)

			// New Wing Coordinates

			let featherX = insertionOrigin[0] + featherMagnitude * featherAngle
			let featherY = insertionOrigin[1] + featherMagnitude * featherAngle

			// Draw the feather
			vectorVertices.push(featherX, featherY)
			// Draw the feather
			vectorVertices.push(origin[0], origin[1])
		}
	}
}

export default Wing002
