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
	gl.enable(gl.DEPTH_TEST) // enable depth testing
	gl.depthFunc(gl.LEQUAL) // near things obscure far things

	// Clear the canvas before drawing on it
	gl.clear(gl.COLOR_BUFFER_BIT, gl.DEPTH_BUFFER_BIT)

	// Tell WebGL to use our program when drawing
	gl.useProgram(programInfo.program)
	gl.bindVertexArray(vao)

	// Initialize the matrices
	// Compute tool Matrices
	let matrix = MATRIX_3D.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 400)
	matrix = MATRIX_3D.translate(matrix, ...programInfo.geometry.translation)
	matrix = MATRIX_3D.xRotate(matrix, programInfo.geometry.rotation[0])
	matrix = MATRIX_3D.yRotate(matrix, programInfo.geometry.rotation[1])
	matrix = MATRIX_3D.zRotate(matrix, programInfo.geometry.rotation[2])
	matrix = MATRIX_3D.scale(matrix, ...programInfo.geometry.scale)
	// matrix = MATRIX_3D.translate(matrix, -50, -75) // centerOriginMatrix
	// Set the matrix
	gl.uniformMatrix4fv(programInfo.uniformLocations.u_matrix, false, matrix)

	setPositionAttribute(gl, buffers, programInfo)
	setColorAttribute(gl, buffers, programInfo)

	const primitiveType = gl.TRIANGLES
	const offset = 0
	const count = 16 * 6
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
	const type = gl.UNSIGNED_BYTE
	const normalize = true
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
