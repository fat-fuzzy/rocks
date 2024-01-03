import geometries from '../../lib/geometries'

const {DEFAULT_3D_GEOMETRY_COORDS} = geometries

function initBuffers(gl, programInfo) {
	const {color} = programInfo.geometry
	const positionBuffer = initPositionBuffer(gl)
	const colorBuffer = initColorBuffer(gl, [color, color, color, color])

	return {
		position: positionBuffer,
		color: colorBuffer,
	}
}

function initPositionBuffer(gl) {
	// Create a buffer for the geometry's positions.
	const positionBuffer = gl.createBuffer()

	// Select positionBuffer as current buffer to use for buffer ops
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

	const coords = DEFAULT_3D_GEOMETRY_COORDS
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
