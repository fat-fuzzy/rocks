import utils from '../../lib/utils'

function initBuffers(gl, programInfo) {
	const x = utils.randomInt(gl.canvas.clientWidth)
	const y = utils.randomInt(gl.canvas.clientHeight)
	const width = utils.randomInt(gl.canvas.clientWidth)
	const height = utils.randomInt(gl.canvas.clientHeight)
	const positionBuffer = initPositionBuffer(gl, {x, y, width, height})
	// const colorBuffer = initColorBuffer(gl, [color, color, color, color])

	return {
		position: positionBuffer,
		// color: colorBuffer,
	}
}

function initPositionBuffer(gl, {x, y, width, height}) {
	// Create a buffer for the geometry's positions.
	const positionBuffer = gl.createBuffer()

	// Select positionBuffer as current buffer to use for buffer ops
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

	// Create an array of positions for the geometry.
	const x1 = x
	const x2 = x + width
	const y1 = y
	const y2 = y + height
	// prettier-ignore
	const coords = [
			x1, y1,
			x2, y1,
			x1, y2,
			x1, y2,
			x2, y1,
			x2, y2,
		]
	// Pass the list of positions into WebGL to build the shape.
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW)

	return positionBuffer
}

function initColorBuffer(gl, colors) {
	const colorBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)

	return colorBuffer
}
export {initBuffers}
