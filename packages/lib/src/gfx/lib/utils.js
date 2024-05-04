/**
 ***********************
 * HELPER FUNCTIONS
 ***********************
 */

function centerImage(image, canvas) {
	// Calculate the image aspect ratio
	let imageAspectRatio = image.width / image.height

	// Calculate the canvas aspect ratio
	let canvasAspectRatio = canvas.clientWidth / canvas.clientHeight

	let viewportWidth, viewportHeight

	// If the image aspect ratio is less than the canvas aspect ratio,
	// the image fits within the canvas width, and the height should be adjusted.
	if (imageAspectRatio < canvasAspectRatio) {
		viewportWidth = canvas.clientWidth
		viewportHeight = viewportWidth / imageAspectRatio
	} else {
		// Otherwise, the image fits within the canvas height, and the width should be adjusted.
		viewportHeight = canvas.clientHeight
		viewportWidth = viewportHeight * imageAspectRatio
	}

	// Calculate the position to center the viewport within the canvas
	let x = (canvas.clientWidth - viewportWidth) / 2
	let y = (canvas.clientHeight - viewportHeight) / 2

	return {x, y, viewportWidth, viewportHeight}
}

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
 * Canvas, like Images, has 2 sizes
 * - Size the canvas is displayed: set with CSS
 * - Number of pixels displayed inside the canvas
 * @param {HTMLCanvasElement} canvas
 */
function resizeCanvasToImage(canvas, image) {
	// Get the size that the browser is displaying the canvas
	const {x, y, viewportWidth, viewportHeight} = centerImage(image, canvas)
	// Check if the canvas is the same size
	if (canvas.width !== viewportWidth || canvas.height !== viewportHeight) {
		// If not, make it the same
		canvas.width = viewportWidth
		canvas.height = viewportHeight
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

function isPowerOf2(value) {
	return (value & (value - 1)) === 0
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
 * @param {number} rads
 * @returns number
 */
function radToDeg(rads) {
	return (rads * Math.PI) / 180
}

/**
 * @param {number} n
 * @param {number} decimals
 * @returns number
 */
function round(n, decimals) {
	return Number(Math.round(Number(n + 'e' + decimals)) + 'e-' + decimals)
}

export default {
	resize,
	resizeHD,
	randomInt,
	multiply,
	degToRad,
	radToDeg,
	isPowerOf2,
	round,
	centerImage,
	resizeCanvasToImage,
}
