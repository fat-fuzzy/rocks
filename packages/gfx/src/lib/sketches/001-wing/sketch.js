// A wing bone structure with movement
// p5.js Doc:
// - https://p5js.org/examples/transformation-translate/
// - https://p5js.org/examples/transformation-rotate/
// - https://p5js.org/reference/p5/push/

let flyer
function setup() {
	// Create the canvas
	createCanvas(740, 600)

	// Set angle mode to degrees
	angleMode(DEGREES)

	// Set the color mode to hue-saturation-brightness (HSB)
	colorMode(HSB)

	// Create screen reader accessible description
	describe('Wing movement')
	flyer = new Flyer(wing)
}

// The step is only used for a color change, it does not affect 'movement'
function drawBone(angle, step, origin) {
	// Rotate by angle (no need to translate)
	rotate(angle)
	// Set color based on angle and draw new bone along x-axis
	colors.bright(angle, step)
	strokeWeight(1)
	line(0, 0, origin[0], origin[1])
}

function buildBoneStructure(angles, bones, origin) {
	// background(200);
	// Save current coordinate system
	push()

	let angle

	// 1. Draw the bones in sequence so that a new bone's origin is the last bone's tip
	for (let i = 0; i < angles.length - 1; i++) {
		// Translate to current origin (initial or previous bone coords)
		translate(origin[0], origin[1])

		// Set current origin to new bone coordinates
		origin = bones[i]

		// Set the new angle -> This is what creates the movement !
		angle = angles[i]

		// Draw the bone
		drawBone(angle, i, origin)
	}

	// 2. Draw the last bone that shares its origin with the previous bone
	let i = angles.length - 1
	angle = angles[i]
	// Set origin to current bone coordinates
	origin = bones[i]

	// Draw the bone
	drawBone(angle, i, origin)

	// Reset coordinate system
	pop()
}

function interpolate(beginning, end, t) {
	return beginning + (end - beginning) * t
}

function normalizeAndInterpolate(beginValues, endValues, steps) {
	const result = []

	for (let i = 0; i <= steps; i++) {
		// `t` gives a value between 0 and 1 used to normalize (= place) the point for which we want to calculate a value (= draw)
		const t = i / steps

		const interpolated = beginValues.map((begin, index) =>
			interpolate(begin, endValues[index], t),
		)

		result.push(interpolated)
	}

	return result
}

function draw() {
	flyer.update()
	flyer.show()
}

const colors = {
	mute: (angle, step) => {
		stroke(angle + step + 0.5 * 12, step + 2 * 15, step + 2 * 20)
	},
	bright: (angle, step) => {
		stroke(angle / 2 + step * 80, angle / 2 + step * 10, angle / 2 + step * 10)
	},
}

const wing = {
	bones: [
		[160, -2],
		[20, 180],
		[10, -200],
		[0, -80],
		[5, -50],
	],
	beginning: [-120, -147, 180, 5, 20],
	middle: [-120, -225, 335, -160, 7],
	end: [-100, -245, 345, -170, 0],
}

export class Flyer {
	constructor(wing) {
		this.origin = [width * 0.95, height / 2 + height * 0.1]

		// (x, y) points for each bone from current origin at time of drawing
		this.bones = wing.bones
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
				// set the next movement (a pause movement) to start
				this.time = 0
			}
			// 3. We have arrived at the end of the first movement of the sequence
			if (this.currentStep === 0) {
				// load the next movement
				this.currentStep = 1
				// load the next movement's steps
				this.angles = this.endAngles // step 1 is the last movement in this case
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
				this.time = this.angles.length - 1
				this.currentStep = 0
			}
			// 3. We arrive at the last movement of the sequence (= a pause): update the current movement's coordinates sequence to the data of the previous movement, set the current step to the previous movement
			if (this.currentStep === 2) {
				this.angles = this.endAngles
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
		buildBoneStructure(this.angles[this.time], this.bones, this.origin)
	}
}
