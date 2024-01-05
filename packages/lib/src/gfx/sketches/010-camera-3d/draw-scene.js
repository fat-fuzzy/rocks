import matrices from '../../lib/matrices'

const {MATRIX_3D} = matrices

/**
 *
 * @param {*} gl
 * @param {*} programInfo
 * @param {*} buffers
 */
function drawScene(gl, programInfo, buffers, vao) {
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
	gl.bindVertexArray(vao)

	// Geometry, View and Camera factors
	let geometryCount = 5
	let geometriesRadius = 200
	let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
	let zNear = 1
	let zFar = 2000

	// Initialize the Geometry projection matrix
	let projectionMatrix = MATRIX_3D.perspective(
		programInfo.geometry.fieldOfView,
		aspect,
		zNear,
		zFar,
	)

	// Compute the position of the first F
	let target = [geometriesRadius, 0, 0]

	// Initialize the Camera matrix
	let cameraMatrix = MATRIX_3D.yRotation(programInfo.geometry.cameraAngle)
	cameraMatrix = MATRIX_3D.translate(cameraMatrix, 0, 0, geometriesRadius * 1.5)

	/* prettier-ignore */
	let cameraPosition = [
		cameraMatrix[12],
		cameraMatrix[13],
		cameraMatrix[14],
	]

	var up = [0, 1, 0]

	// Compute the Camera matrix's position in relation to its target
	cameraMatrix = MATRIX_3D.lookAt(cameraPosition, target, up)

	// Make a View matrix from the camera matrix
	let viewMatrix = MATRIX_3D.inverse(cameraMatrix)

	// Make the Projection matrix: move the projection space to vue space (=space in front of camera)
	let viewProjectionMatrix = MATRIX_3D.multiply(projectionMatrix, viewMatrix)

	// Draw the geometries
	for (let i = 0; i < geometryCount; i++) {
		let angle = (i * Math.PI * 3) / geometryCount
		let x = Math.cos(angle) * geometriesRadius
		let z = Math.sin(angle) * geometriesRadius

		let matrix = MATRIX_3D.translate(viewProjectionMatrix, x, 0, z)

		gl.uniformMatrix4fv(programInfo.uniformLocations.u_matrix, false, matrix)

		setPositionAttribute(gl, buffers, programInfo)
		setColorAttribute(gl, buffers, programInfo)

		const primitiveType = gl.TRIANGLES
		const offset = 0
		const count = 16 * 6
		gl.drawArrays(primitiveType, offset, count)
	}
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
