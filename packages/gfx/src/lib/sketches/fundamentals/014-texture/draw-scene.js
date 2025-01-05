// @ts-check
import matrices from '../../../math/matrices'

const {M4} = matrices

/**
 *
 * @param {*} gl
 * @param {*} programInfo
 * @param {*} buffers
 */
function drawScene(gl, programInfo, buffers) {
	// - tell WebGL how to covert clip space values for gl_Position back into screen space (pixels)
	// -> use gl.viewport
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
	gl.clearDepth(1.0) // clear everything (?)

	// tell webgl to cull faces
	gl.enable(gl.CULL_FACE)
	gl.enable(gl.DEPTH_TEST) // enable depth testing
	gl.depthFunc(gl.LEQUAL) // near things obscure far things

	// Clear the canvas before drawing on it
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

	// Tell WebGL to use our program when drawing
	gl.useProgram(programInfo.program)

	// Geometry, View and Camera factors
	let aspect = gl.canvas.width / gl.canvas.height
	let zNear = 1
	let zFar = 2000

	// Initialize the Geometry projection matrix
	let projectionMatrix = M4.perspective(
		programInfo.context.camera.fieldOfView,
		aspect,
		zNear,
		zFar,
	)

	// Compute the position of the first F
	let target = [0, 0, 0]

	// Initialize the Camera matrix
	let cameraMatrix = M4.yRotation(programInfo.context.camera.cameraAngle)

	/* prettier-ignore */
	let cameraPosition = [
		cameraMatrix[12],
		cameraMatrix[13],
		cameraMatrix[14],
	]

	let up = [0, 1, 0]

	// Compute the Camera matrix's position in relation to its target
	cameraMatrix = M4.lookAt(cameraPosition, target, up)

	// Make a View matrix from the camera matrix
	let viewMatrix = M4.inverse(cameraMatrix)

	// Make the Projection matrix: move the projection space to vue space (=space in front of camera)
	let viewProjectionMatrix = M4.multiply(projectionMatrix, viewMatrix)

	let matrix = M4.xRotate(
		viewProjectionMatrix,
		programInfo.context.geometry.rotation[0],
	)
	matrix = M4.yRotate(matrix, programInfo.context.geometry.rotation[1])
	matrix = M4.zRotate(matrix, programInfo.context.geometry.rotation[2])

	// Set the matrix.
	gl.uniformMatrix4fv(programInfo.uniformLocations.u_matrix, false, matrix)

	setPositionAttribute(gl, buffers, programInfo)
	setColorAttribute(gl, buffers, programInfo)

	// Draw the geometry.
	let primitiveType = gl.TRIANGLES
	let offset = 0
	let count = 16 * 6
	gl.drawArrays(primitiveType, offset, count)
}

function setPositionAttribute(gl, buffers, programInfo) {
	const count = 3 // pull out 3 values from buffer per iteration
	const type = gl.FLOAT // the data in the buffer is 32bit floats
	const normalize = false
	const stride = 0 // indicates # of bytes from one set of values to the next = 0 -> use type & count instead
	const offset = 0 // byte index to start reading data in the buffer = 0 -> start at the beginning

	gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
	gl.vertexAttribPointer(
		programInfo.attribLocations.a_position,
		count,
		type,
		normalize,
		stride,
		offset,
	)
	gl.enableVertexAttribArray(programInfo.attribLocations.a_position)
}

function setColorAttribute(gl, buffers, programInfo) {
	const count = 3
	const type = gl.UNSIGNED_BYTE // the data is 8bit unsigned bytes
	const normalize = true // convert from 0-255 to 0.0-1.0
	const stride = 0
	const offset = 0

	gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color)
	gl.vertexAttribPointer(
		programInfo.attribLocations.a_color,
		count,
		type,
		normalize,
		stride,
		offset,
	)
	gl.enableVertexAttribArray(programInfo.attribLocations.a_color)
}

export {drawScene}
