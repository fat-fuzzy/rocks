import geometries from '../../lib/geometries'
import matrices from '../../lib/matrices'

const {DEFAULT_3D_GEOMETRY_COORDS, DEFAULT_3D_GEOMETRY_COLORS, flipAndCenter} = geometries

function initBuffers(gl) {
	const positionBuffer = initPositionBuffer(gl)
	const colorBuffer = initColorBuffer(gl)

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

	const coords = flipAndCenter(DEFAULT_3D_GEOMETRY_COORDS)

	// // Center the geometry around the origin and flip it around

	// let matrix = M4.xRotation(Math.PI)
	// matrix = M4.translate(matrix, -50, -75, -15) // these values are dependent on the geometry

	// for (let i = 0; i < coords.length; i += 3) {
	// 	let vector = M4.transformVector(matrix, [coords[i + 0], coords[i + 1], coords[i + 2], 1])
	// 	coords[i + 0] = vector[0]
	// 	coords[i + 1] = vector[1]
	// 	coords[i + 2] = vector[2]
	// }

	// Pass the list of positions into WebGL to build the shape.
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW)

	return positionBuffer
}

function initColorBuffer(gl) {
	const colorBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(DEFAULT_3D_GEOMETRY_COLORS), gl.STATIC_DRAW)

	return colorBuffer
}
export {initBuffers}
