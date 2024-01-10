import geometries from '../../lib/geometries'

const {DEFAULT_GEOMETRY_COORDS} = geometries

function initBuffers(gl) {
	const positionBuffer = initPositionBuffer(gl)

	return {
		position: positionBuffer,
	}
}

function initPositionBuffer(gl) {
	// Create a buffer for the geometry's positions.
	const positionBuffer = gl.createBuffer()

	// Select positionBuffer as current buffer to use for buffer ops
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

	// TODO here: extract values from coordinates (width + height)
	/* prettier-ignore */
	const coords = DEFAULT_GEOMETRY_COORDS
	// Pass the list of positions into WebGL to build the shape.
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW)

	return positionBuffer
}

export {initBuffers}
