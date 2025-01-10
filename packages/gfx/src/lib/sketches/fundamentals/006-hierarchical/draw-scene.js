import matrices from '../../../math/matrices'

const {M3} = matrices

function drawScene(gl, programInfo, buffers) {
	// - tell WebGL how to covert clip space values for gl_Position back into screen space (pixels)
	// -> use gl.viewport
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
	gl.clearDepth(1.0) // clear everything (?)
	gl.enable(gl.DEPTH_TEST) // enable depth testing
	gl.depthFunc(gl.LEQUAL) // near things obscure far things

	// Clear the canvas before drawing on it
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

	// Create a perspective matrix:
	// - simulates the distortion of perspective in the camera
	// Set the Field Of View to 45 degrees in radians
	// Set the aspect ratio to the display dimensions of the canvas

	// set the resolution
	gl.uniform2f(
		programInfo.uniformLocations.u_resolution,
		gl.canvas.width,
		gl.canvas.height,
	)
	// Set a random color.
	gl.uniform4f(
		programInfo.uniformLocations.u_color,
		...programInfo.context.geometry.color,
	)

	// Compute Matrices
	const translationMatrix = M3.translation(
		programInfo.context.geometry.translation[0],
		programInfo.context.geometry.translation[1],
	)
	const rotationMatrix = M3.rotation(programInfo.context.geometry.rotation)
	const scaleMatrix = M3.scaling(
		programInfo.context.geometry.scale[0],
		programInfo.context.geometry.scale[1],
	)

	// Initialize the matrix
	let matrix = M3.identity()

	setPositionAttribute(gl, buffers, programInfo)

	// setColorAttribute(gl, buffers, programInfo)
	// Set a random color.
	// gl.uniform4f(programInfo.uniformLocations.u_color, Math.random(), Math.random(), Math.random(), 1)
	// Tell WebGL to use our program when drawing
	gl.useProgram(programInfo.program)
	// Set the shader uniforms
	// gl.uniform4fv(programInfo.uniformLocations.u_color, programInfo.context.geometry.color)

	for (let i = 0; i < 5; i++) {
		// Multiply the Matrices in order for Hierarchical animation
		matrix = M3.multiply(matrix, translationMatrix)
		matrix = M3.multiply(matrix, rotationMatrix)
		matrix = M3.multiply(matrix, scaleMatrix)

		// Set the matrix
		gl.uniformMatrix3fv(programInfo.uniformLocations.u_matrix, false, matrix)

		const primitiveType = gl.TRIANGLES
		const offset = 0
		const count = 18
		gl.drawArrays(primitiveType, offset, count)
	}
}

function setPositionAttribute(gl, buffers, programInfo) {
	const count = 2 // pull out 2 values from buffer per iteration
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
	const count = 2
	const type = gl.FLOAT
	const normalize = false
	const stride = 0
	const offset = 0

	gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color)
	gl.vertexAttribPointer(
		programInfo.attribLocations.u_color,
		count,
		type,
		normalize,
		stride,
		offset,
	)
	gl.enableVertexAttribArray(programInfo.attribLocations.u_color)
}

export {drawScene}
