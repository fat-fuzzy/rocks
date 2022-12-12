function initBuffers(gl, programInfo) {
	const {translation, width, height, color} = programInfo.geometry
	const [x, y] = translation
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

	// TODO here: extract values from coordinates (width + height)
	/* prettier-ignore */
	const coords = [
		// left column
		0, 0,
		30, 0,
		0, 150,
		0, 150,
		30, 0,
		30, 150,

		// top rung
		30, 0,
		100, 0,
		30, 30,
		30, 30,
		100, 0,
		100, 30,

		// middle rung
		30, 60,
		67, 60,
		30, 90,
		30, 90,
		67, 60,
		67, 90,
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
