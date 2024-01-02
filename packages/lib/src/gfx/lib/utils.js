/**
 ***********************
 * HELPER FUNCTIONS
 ***********************
 */

/**
 * Canvas, like Images, has 2 sizes
 * - Size the canvas is displayed: set with CSS
 * - Number of pixels displayed inside the canvas
 * @param {HTMLCanvasElement} canvas
 */
function resize(canvas) {
	// Get the size that the browser is displaying the canvas
	const displayWidth = canvas.clientWidth
	const displayHeight = canvas.clientHeight

	// Check if the canvas is the same size
	if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
		// If not, make it the same
		canvas.width = displayWidth
		canvas.height = displayHeight
	}
}

/**
 * Use with caution, as this makes the WebGL program draw more pixels
 * -> it might be better to let the GPU take over
 * @param {HTMLCanvasElement} canvas
 */
function resizeHD(canvas) {
	const realToCSSPixels = window.devicePixelRatio

	// - Get the size that the browser is displaying the canvas in CSS pixels
	// - Compute the size needed to make the drawing buffer match it in device pixels
	const displayWidth = Math.floor(canvas.clientWidth * realToCSSPixels)
	const displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels)

	// Check if the canvas is the same size
	if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
		// If not, make it the same
		canvas.width = displayWidth
		canvas.height = displayHeight
	}
}

// Returns a random integer from 0 to range - 1.
function randomInt(range) {
	return Math.floor(Math.random() * range)
}

/**
 *
 * @param {*} characters
 */
function multiply(characters) {
	return new Array(100) // code from Svelte tutorial confetti
		.fill(0)
		.map((_, i) => {
			return {
				class: 'hide:rm-block',
				character: characters[i % characters.length],
				x: Math.random() * 100,
				y: -10 - Math.random() * 100,
				ratio: 0.1 + Math.random() * 1,
			}
		})
		.sort((a, b) => a.ratio - b.ratio)
}

function degToRad(degrees) {
	return degrees * (Math.PI / 180)
}

function round(n, decimals) {
	return Number(Math.round(n + 'e' + decimals) + 'e-' + decimals)
}

function getGeometryDefaults(canvasWidth, canvasHeight) {
	const width = round(canvasWidth / 5, 2)
	const height = round(canvasHeight / 5, 2)
	return {
		color: [Math.random(), Math.random(), Math.random(), 1],
		translation: [canvasWidth / 2, canvasHeight / 2],
		rotation: [Math.cos(degToRad(45)), Math.sin(degToRad(45))],
		scale: [1, 1],
		width,
		height,
	}
}

function getGeometryRandom(canvasWidth, canvasHeight) {
	const width = randomInt(canvasWidth)
	const height = randomInt(canvasHeight)
	return {
		color: [Math.random(), Math.random(), Math.random(), 1],
		translation: [width, height],
		rotation: [Math.cos(degToRad(randomInt(360))), Math.sin(randomInt(360))],
		scale: [1, 1],
		width,
		height,
	}
}

function getGeometryMatrix2D(canvasWidth, canvasHeight) {
	const width = randomInt(canvasWidth)
	const height = randomInt(canvasHeight)
	return {
		color: [Math.random(), Math.random(), Math.random(), 1],
		translation: [width, height],
		rotation: degToRad(randomInt(360)),
		scale: [1, 1],
		width,
		height,
	}
}

function getGeometryHierarchical(canvasWidth, canvasHeight) {
	const width = round(canvasWidth / 5, 2)
	const height = round(canvasHeight / 5, 2)
	return {
		color: [Math.random(), Math.random(), Math.random(), 1],
		translation: [canvasWidth / 2, canvasHeight / 2],
		rotation: degToRad(randomInt(360)),
		scale: [1, 1],
		width,
		height,
	}
}

const MATRICES_2D = {
	identity: function () {
		/* prettier-ignore */
		return [
			1, 0, 0,
			0, 1, 0,
			0, 0, 1,
		]
	},
	multiply: function (a, b) {
		var a00 = a[0 * 3 + 0]
		var a01 = a[0 * 3 + 1]
		var a02 = a[0 * 3 + 2]
		var a10 = a[1 * 3 + 0]
		var a11 = a[1 * 3 + 1]
		var a12 = a[1 * 3 + 2]
		var a20 = a[2 * 3 + 0]
		var a21 = a[2 * 3 + 1]
		var a22 = a[2 * 3 + 2]
		var b00 = b[0 * 3 + 0]
		var b01 = b[0 * 3 + 1]
		var b02 = b[0 * 3 + 2]
		var b10 = b[1 * 3 + 0]
		var b11 = b[1 * 3 + 1]
		var b12 = b[1 * 3 + 2]
		var b20 = b[2 * 3 + 0]
		var b21 = b[2 * 3 + 1]
		var b22 = b[2 * 3 + 2]

		return [
			b00 * a00 + b01 * a10 + b02 * a20,
			b00 * a01 + b01 * a11 + b02 * a21,
			b00 * a02 + b01 * a12 + b02 * a22,
			b10 * a00 + b11 * a10 + b12 * a20,
			b10 * a01 + b11 * a11 + b12 * a21,
			b10 * a02 + b11 * a12 + b12 * a22,
			b20 * a00 + b21 * a10 + b22 * a20,
			b20 * a01 + b21 * a11 + b22 * a21,
			b20 * a02 + b21 * a12 + b22 * a22,
		]
	},

	translation: function (tx, ty) {
		/* prettier-ignore */
		return [
			1, 0, 0,
			0, 1, 0,
			tx, ty, 1,
		]
	},

	rotation: function (angleInRadians) {
		const c = Math.cos(angleInRadians)
		const s = Math.sin(angleInRadians)

		/* prettier-ignore */
		return [
			c, -s, 0,
			s, c, 0,
			0, 0, 1,
		]
	},

	scale: function (sx, sy) {
		/* prettier-ignore */
		return [
			sx, 0, 0,
			0, sy, 0,
			0, 0, 1,
		]
	},
}

export default {
	resize,
	resizeHD,
	randomInt,
	multiply,
	degToRad,
	round,
	getGeometryDefaults,
	getGeometryRandom,
	getGeometryMatrix2D,
	getGeometryHierarchical,
	MATRICES_2D,
}
