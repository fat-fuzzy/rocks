import utils from '../../../math/utils.js'
import vectors from '../../../math/vectors.js'
import Wing from '../wing.js'

export default class WingBase extends Wing {
	constructor({
		name = 'WingBase',
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

	// TODO: transform wing data into geometry coordinates (= vertices)
	getBoneVertices() {
		// Save current coordinate system
		let coords = this.position
		let origin = coords
		let angle = 0
		let magnitude
		let vectorVertices = []
		let currentMovement = this.angles.bones[this.currentTime]
		let bone

		// 1. Add the  bone vertices in sequence so that a new bone's coords is the last bone's tip
		for (bone = 0; bone < currentMovement.length - 1; bone++) {
			// Translate to current coords (initial or previous bone coords)
			vectorVertices.push(...coords)
			origin = coords
			magnitude = this.magnitudes.bones[bone]
			// Set the new angle -> This is what creates the movement !
			angle = currentMovement[bone]

			// Set current coords to new bone coordinates
			let dest = vectors.getCoordsFromMagAndAngle(magnitude, angle)

			coords = [origin[0] + dest[0], origin[1] + dest[1]]
			// Draw the bone
			vectorVertices.push(...coords)

			if (this.drawFeathers && bone > 0) {
				this.getFeatherVertices(angle, bone, coords, vectorVertices)
				// Draw the bone
				vectorVertices.push(...coords)
			}
		}

		// 2. Draw the last bone that shares its coords with the previous bone
		magnitude = this.magnitudes.bones[bone]
		angle = currentMovement[bone]
		vectorVertices.push(...origin)
		let dest = vectors.getCoordsFromMagAndAngle(magnitude, angle)
		coords = [origin[0] + dest[0], origin[1] + dest[1]]

		// Draw the bone
		vectorVertices.push(...coords)

		if (this.drawFeathers && bone > 0) {
			this.getFeatherVertices(angle, bone - 1, coords, vectorVertices)
			// Draw the bone
			vectorVertices.push(...coords)
		}

		return vectorVertices
	}
}
