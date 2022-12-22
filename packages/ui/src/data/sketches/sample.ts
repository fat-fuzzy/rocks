const sketchData = {
	id: '000',
	slug: 'example-mdn',
	title: 'Example Sketch',
	emoji: '💡',
	dimensions: 'video',
}

let gl

// Random color helper function.
function getRandomColor() {
	return [Math.random(), Math.random(), Math.random()]
}

function draw() {
	let color = getRandomColor()
	gl.clearColor(color[0], color[1], color[2], 1.0)
	// Clear the context with the newly set color.
	gl.clear(gl.COLOR_BUFFER_BIT)
}

function update() {
	draw()
}

function clear() {
	gl.clearColor(color[0], color[1], color[2], 1.0)
	// Clear the context with the newly set color.
	gl.clear(gl.COLOR_BUFFER_BIT)
}

function main(canvas) {
	gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
	if (!gl) {
		clearInterval(timer)
		alert('Failed to get WebGL context.\n' + 'Your browser or device may not support WebGL.')
		return
	}
	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)

	// Get a random color value using a helper function.
	let color = getRandomColor()
	// Set the WebGLRenderingContext clear color to the
	// random color.
	gl.clearColor(color[0], color[1], color[2], 1.0)
	// Clear the context with the newly set color.
	gl.clear(gl.COLOR_BUFFER_BIT)
}

export default {
	main,
	draw,
	update,
	clear,
	sketchData,
}
