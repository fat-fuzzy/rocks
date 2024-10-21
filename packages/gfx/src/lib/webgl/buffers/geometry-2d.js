function initBuffers(gl, programInfo) {
	const positionBuffer = initPositionBuffer(gl, programInfo)

	return {
		position: positionBuffer,
	}
}

function initPositionBuffer(gl, programInfo) {
	// Create a buffer for the geometry's positions.
	const positionBuffer = gl.createBuffer()

	// Select positionBuffer as current buffer to use for buffer ops
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

	// Pass the list of positions into WebGL to build the shape.
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array(programInfo.context.geometry),
		gl.STATIC_DRAW,
	)

	return positionBuffer
}

export {initBuffers}
