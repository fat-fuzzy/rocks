import geometries from './geometries'

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

/**
 * Canvas, like Images, has 2 sizes
 * - Size the canvas is displayed: set with CSS
 * - Number of pixels displayed inside the canvas
 * @param {number} range
 */
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

/**
 * @param {number} degrees
 * @returns number
 */
function degToRad(degrees) {
	return degrees * (Math.PI / 180)
}

/**
 * @param {number} n
 * @param {number} decimals
 * @returns number
 */
function round(n, decimals) {
	return Number(Math.round(Number(n + 'e' + decimals)) + 'e-' + decimals)
}

/**
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @returns geometry
 */
function getGeometryDefaults(canvasWidth, canvasHeight) {
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

/**
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @returns geometry
 */
function getGeometryRandom(canvasWidth, canvasHeight) {
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

/**
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @returns geometry
 */

function getGeometryMatrix2D(canvasWidth, canvasHeight) {
	return getGeometryDefaults(canvasWidth, canvasHeight)
}

/**
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @returns geometry
 */
function getGeometryHierarchical(canvasWidth, canvasHeight) {
	return getGeometryDefaults(canvasWidth, canvasHeight)
}

/**
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @param {number} maxDepth
 * @returns geometry
 */
function getGeometryMatrix3D(canvasWidth, canvasHeight, maxDepth) {
	const width = randomInt(canvasWidth)
	const height = randomInt(canvasHeight)
	const depth = maxDepth ? randomInt(maxDepth / 2) : height
	return {
		color: geometries.DEFAULT_3D_GEOMETRY_COLORS,
		translation: [width, height, depth],
		rotation: [
			Number(degToRad(randomInt(360)).toFixed()),
			Number(degToRad(randomInt(360)).toFixed()),
			Number(degToRad(randomInt(360)).toFixed()),
		],
		scale: [1, 1, 1],
		width,
		height,
		depth,
		fudge: 1.0,
	}
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
	getGeometryMatrix3D,
}
