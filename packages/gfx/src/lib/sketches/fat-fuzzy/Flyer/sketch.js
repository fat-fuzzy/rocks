// A wing bone structure with movement
// p5.js Doc:
// - https://p5js.org/examples/transformation-translate/
// - https://p5js.org/examples/transformation-rotate/
// - https://p5js.org/reference/p5/push/

let flyer
let wingSpeed = 750

function setup() {
	// Create the canvas
	createCanvas(900, 600)

	// Set angle mode to degrees
	angleMode(DEGREES)

	// Set the color mode to hue-saturation-brightness (HSB)
	colorMode(HSB)

	// Create screen reader accessible description
	describe('Wing movement')
	flyer = new Flyer(wing, wingSpeed)
	// flyer.colors = drawVector
	flyer.drawingFn = drawVector
	// flyer.drawingFn = drawPoints
}

// The step is only used for a color change, it does not affect 'movement'
function drawVector(angle, step, origin) {
	// Rotate by angle (no need to translate)
	rotate(angle)
	// Set color based on angle and draw new bone along x-axis
	colors.mute(angle, step)
	strokeWeight(1)

	line(0, 0, ...origin)
}

// The step is only used for a color change, it does not affect 'movement'
function drawPoints(angle, step, origin) {
	// Rotate by angle (no need to translate)
	rotate(angle)
	// Set color based on angle and draw new bone along x-axis
	colors.mute(angle, step)
	strokeWeight(1)

	point(0, 0)
	point(...origin)
}

function drawBoneStructure(angles, bones, origin, feathers, time, drawingFn) {
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
		drawingFn(angle, section, origin)

		if (section > 0) {
			drawFeathers(angle, section, origin, feathers, time, drawingFn)
		}
	}

	// 2. Draw the last bone that shares its origin with the previous bone
	section = angles.length - 1
	magnitude = bones[section]
	angle = angles[section]
	origin = getCoordsFromMagAndAngle(magnitude, angle)
	drawingFn(angle, section, origin)

	// Reset coordinate system
	pop()
}

function drawFeathers(angle, section, origin, feathers, time, drawingFn) {
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
		drawingFn(featherAngle, step, featherCoords)
		pop()
	}
}

function interpolate(beginning, end, t) {
	return normalizeAngle(beginning + (end - beginning) * t)
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

function getUnitVector(x, y, magnitude) {
	return [x / magnitude, y / magnitude]
}

function getMagnitudeFromCoords(x, y) {
	return Math.abs(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)))
}

function getCoordsFromMagAndAngle(magnitude, angle) {
	const angleInRadians = angle * (Math.PI / 180) // Convert angle to radians
	const x = magnitude * Math.cos(angleInRadians) // The horizontal component
	const y = magnitude * Math.sin(angleInRadians) // The vertical component
	return [x, y]
}

/*
 * (x, y) are the coordinates of the bone vector
 * distance is the lenght along the bone where we want to insert the feather
 * returns the coordinates of the insertion point: we want to translate the origin here
 */
function getInsertionPoint(x, y, distance, magnitude) {
	let unit = getUnitVector(x, y, magnitude)
	return [distance * unit[0], distance * unit[1]]
}

function draw() {
	flyer.update()
	flyer.show()
}

const colors = {
	mute: (angle, step) => {
		stroke(step * 10, step * 15, step * 22, 0.25)
	},
	bright: (angle, step) => {
		stroke(angle + step, angle + step, angle + step, 0.25)
	},
	section: (angle, section, step) => {
		stroke(angle + section + 0.5 * 12, step + 2 * 15, step + 2 * 20, 0.25)
	},
}

function normalizeAngle(angle) {
	return ((angle % 360) + 360) % 360
}

// + sprites
const wing = {
	bones: [160, 180, 200, 80, 50], // Bone magnitudes (=length)
	beginning: [305, 292, 158, 257, 320],
	middle: [315, 260, 200, 220, 300],
	end: [320, 250, 212, 212, 290],
	feathers: [
		{
			featherCount: 8,
			beginning: 180,
			middle: 190,
			end: 200,
			angles: normalizeAndInterpolate(
				[180, 358, 160],
				[220, 340, 120],
				wingSpeed,
			),
		},
		{
			featherCount: 10,
			beginning: 360,
			middle: 350,
			end: 340,
		},
		{
			featherCount: 8,
			beginning: 160,
			middle: 170,
			end: 180,
		},
	],
	featherAngles: {
		startPauseAngles: normalizeAndInterpolate(
			[180, 358, 160],
			[280, 340, 120],
			7,
		),
		middleAngles: normalizeAndInterpolate(
			[180, 358, 160],
			[280, 340, 100],
			wingSpeed,
		),
		endAngles: normalizeAndInterpolate(
			[280, 340, 100],
			[200, 330, 90],
			wingSpeed / 3,
		),
		endPauseAngles: normalizeAndInterpolate([220, 340, 100], [200, 330, 90], 7),
	},
}

class Flyer {
	constructor(wing, wingSpeed) {
		this.origin = [width * 0.9, height / 2 + height * 0.1]

		// (x, y) points for each bone from current origin at time of drawing
		this.bones = wing.bones
		this.feathers = wing.feathers
		this.featherAngles = wing.featherAngles
		this.beginning = wing.beginning
		this.middle = wing.middle
		this.end = wing.end
		this.steps = wingSpeed // This controls movement speed
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
			this.drawingFn,
		)
	}
}
