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
		// console.log('imageAspectRatio < canvasAspectRatio')
		viewportWidth = canvas.clientWidth
		viewportHeight = viewportWidth / imageAspectRatio
	} else if (imageAspectRatio > canvasAspectRatio) {
		// console.log('imageAspectRatio > canvasAspectRatio')
		// Otherwise, the image fits within the canvas height, and the width should be adjusted.
		viewportHeight = canvas.clientHeight
		viewportWidth = viewportHeight * imageAspectRatio
	} else {
		// console.log('imageAspectRatio === canvasAspectRatio')
		viewportWidth = canvas.clientWidth
		viewportHeight = canvas.clientHeight
	}

	// Calculate the position to center the viewport within the canvas
	let x = (canvas.clientWidth - viewportWidth) / 2
	let y = (canvas.clientHeight - viewportHeight) / 2

	// Use to set the fit the image within the canvas
	// gl.viewport(x, y, viewportWidth, viewportHeight)
	// console.log('image.width', image.width)
	// console.log('image.height', image.height)
	// console.log('canvas.width', canvas.width)
	// console.log('canvas.height', canvas.height)
	// console.log('canvas.clientWidth', canvas.clientWidth)
	// console.log('canvas.clientHeight', canvas.clientHeight)
	// console.log('{x, y, viewportWidth, viewportHeight}', {x, y, viewportWidth, viewportHeight})
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
 * Utils to poke at the DOM
 *
 * see: `dom.md` for more details about dom events
 */

/**
 * This function will log the order of events that happen when the document is loaded
 */
function domEventLogger() {
	// 1. DOM EVENT -> Document's readyState becomes 'interactive'
	console.log('document.readyState', document.readyState)

	// 2. Wait for styles and subframes that are inserted by the parser and their media matches to finish loading

	// 3. Wait for and execute all 'defer' scripts in order

	// 4. DOM EVENT -> DOMContentLoaded event fires on the document

	// 5. Wait for anything else that triggered a request

	// 6. DOM EVENT -> document state becomes complete

	// 7. DOM EVENT -> 'load' event fires on the window

	// 8. DOM EVENT -> 'pageshow' event fires on the window

	document.addEventListener('readystatechange', function () {
		// Document's readyState becomes 'complete'
		console.log('readystatechange', document.readyState)
	})
}

export default {
	resize,
	resizeHD,
	centerImage,
	resizeCanvasToImage,
}
