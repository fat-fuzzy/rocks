// A wing movement functions

// The step is only used for a color change, it does not affect 'movement'
function drawVector(angle, step, origin) {
	// Rotate by angle (no need to translate)
	rotate(angle)
	// Set color based on angle and draw new bone along x-axis
	colors.bright(angle, step)
	strokeWeight(1)
	line(0, 0, ...origin)
}

function drawBoneStructure(angles, bones, origin, feathers, time) {
	// Save current coordinate system
	push()

	let angle
	let magnitude
	let section

	// 1. Draw the bones in sequence so that a new bone's origin is the last bone's tip
	for (section = 0; section < angles.length - 1; section++) {
		// Translate to current origin (initial or previous bone coords)
		translate(...origin)

		magnitude = bones[section]

		// Set the new angle -> This is what creates the movement !
		angle = angles[section]

		// Set current origin to new bone coordinates
		origin = getCoordsFromMagAndAngle(magnitude, angle)

		// Draw the bone
		drawVector(angle, section, origin)

		if (section > 0) {
			drawFeathers(angle, section, origin, feathers, time)
		}
	}

	// 2. Draw the last bone that shares its origin with the previous bone
	section = angles.length - 1
	magnitude = bones[section]
	angle = angles[section]
	origin = getCoordsFromMagAndAngle(magnitude, angle)
	drawVector(angle, section, origin)

	// Reset coordinate system
	pop()
}

function drawFeathers(angle, section, origin, feathers, time) {
	let [x, y] = origin

	// Hypothenuse
	let magnitude = Math.abs(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)))

	let featherMagnitude
	let featherCoords
	let insertionOrigin
	let insertionDistance = 0
	let featherCount = feathers.featherCount
	let featherAngles = feathers.angles[time]
	let featherAngle = featherAngles[section - 1]

	let distance = magnitude / featherCount

	for (let step = 0; step < featherCount; step++) {
		// Save current coordinate system
		push()
		let angleStep = step + 1
		if (section === 1) {
			insertionDistance = distance * step
			featherMagnitude = 30 + (step * step) / 30
			featherAngle = featherAngle + angleStep
		}
		if (section === 2) {
			insertionDistance = distance * step
			featherMagnitude = 20 + (step * step) / 20
			featherAngle = featherAngle
		}
		if (section === 3) {
			insertionDistance = distance * step
			featherMagnitude = 50 + (step * step) / 20
			featherAngle = featherAngle + angleStep * 1.5
		}

		insertionOrigin = getInsertionPoint(x, y, insertionDistance, magnitude)

		translate(...insertionOrigin)

		// New Wing Coordinates

		let angleRad = featherAngle * (Math.PI / 180)
		let featherX = insertionOrigin[0] + featherMagnitude * angleRad
		let featherY = insertionOrigin[1] + featherMagnitude * angleRad
		featherCoords = [featherX, featherY]

		// Draw the feather
		drawVector(featherAngle, step, featherCoords)
		pop()
	}
}

// The step is only used for a color change, it does not affect 'movement'
function drawPoints(angle, step, origin) {
	// Rotate by angle (no need to translate)
	rotate(angle)
	// Set color based on angle and draw new bone along x-axis
	colors.bright(angle, step)
	strokeWeight(1)

	point(0, 0)
	point(...origin)
}

function draw() {
	flyer.update()
	flyer.show()
}

class Flyer {
	constructor(wing) {
		this.origin = [width * 0.9, height / 2 + height * 0.1]

		// (x, y) points for each bone from current origin at time of drawing
		this.bones = wing.bones
		this.feathers = wing.feathers
		this.featherAngles = wing.featherAngles
		this.beginning = wing.beginning
		this.middle = wing.middle
		this.end = wing.end
		this.steps = 100 // This controls movement speed
		this.pause = 7
		this.startPauseAngles = normalizeAndInterpolate(
			this.beginning,
			this.middle,
			this.pause,
		)
		this.middleAngles = normalizeAndInterpolate(
			this.beginning,
			this.middle,
			this.steps,
		)
		this.endAngles = normalizeAndInterpolate(
			this.middle,
			this.end,
			this.steps / 3,
		)
		this.endPauseAngles = normalizeAndInterpolate(
			this.middle,
			this.end,
			this.pause,
		)
		this.angles = this.middleAngles
		this.time = 0
		this.direction = -1
		this.currentStep = 0
	}

	/**
	 * This function manipulates an ordered sequence of movements.
	 * A movement is a sequence of bone structure arrangements drawn slightly changed from one step to the next
	 * Each movement needs a set of data to be drawn:
	 * - an order number (currentStep)
	 * - a direction (1 or -1)
	 * - an ordered array of angles to draw (an array of arrays of angle values):
	 *   - the root array's length is the number of time steps that the movement takes to be drawn
	 *   - each array of angle values provides the bone coordinates for the given time step
	 */
	update() {
		// Case 1 : we are in an opening sequence (= positive direction) and this is the end of a movent
		if (this.direction === 1 && this.time === this.angles.length - 1) {
			// 1. We have arrived at the end of the pause: change to an closing movement (= negative direction)
			if (this.currentStep === 2) {
				this.direction = -1
			}

			// 2. We have arrived at the end of the last movement of the sequence
			if (this.currentStep === 1) {
				// load the next movement
				this.currentStep = 2
				this.angles = this.endPauseAngles //step 2 is the pause in this case. A pause is a movement where the angles are the same as the last movement's angles. A pause has its own, shorter steps (= shorter duration)
				this.feathers[this.currentStep].angles =
					this.featherAngles.endPauseAngles
				// set the next movement (a pause movement) to start
				this.time = 0
			}
			// 3. We have arrived at the end of the first movement of the sequence
			if (this.currentStep === 0) {
				// load the next movement
				this.currentStep = 1
				// load the next movement's steps
				this.angles = this.endAngles // step 1 is the last movement in this case
				this.feathers[this.currentStep].angles = this.featherAngles.endAngles
				// set the next movement to start
				this.time = 0
			}
		}
		// Case 2 : we are in a closing sequence (= negative direction) and this is the start of a movent
		if (this.direction === -1 && this.time === 0) {
			// 1. We arrive at the first movement of the sequence: change to an opening movement (= positive direction)
			if (this.currentStep === 0) {
				this.direction = 1
			}
			// 2. We arrive at a middle movement:
			// - update the current data with the data of the middle movement
			// - set the current step to the preceding movement in order
			if (this.currentStep === 1) {
				this.angles = this.middleAngles
				this.feathers[this.currentStep].angles = this.featherAngles.middleAngles
				this.time = this.angles.length - 1
				this.currentStep = 0
			}
			// 3. We arrive at the last movement of the sequence (= a pause): update the current movement's coordinates sequence to the data of the previous movement, set the current step to the previous movement
			if (this.currentStep === 2) {
				this.angles = this.endAngles
				this.feathers[this.currentStep].angles = this.featherAngles.endAngles
				this.time = this.angles.length - 1
				this.currentStep = 1
			}
		}

		// Finally: Update the movement one step in the current direction
		this.time = this.time + this.direction
	}

	show() {
		// Pause the movement when the direction changes (step 2 is the end-pause movement in this case)
		if (this.currentStep === 2) {
			return
		}
		drawBoneStructure(
			this.angles[this.time],
			this.bones,
			this.origin,
			this.feathers[this.currentStep],
			this.time,
		)
	}
}
