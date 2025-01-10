// @ts-check
import matrices from '../../../math/matrices'

const {M4} = matrices

/**
 *
 * @param {*} gl
 * @param {*} programInfo
 */
function drawScene(gl, programInfo) {
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

	// Initialize the Camera matrix
	let cameraPosition = [0, 0, 200]
	let up = [0, 1, 0]
	let target = [0, 0, 0]

	// Compute the Camera matrix's position in relation to its target
	let cameraMatrix = M4.lookAt(cameraPosition, target, up)

	// Make a View matrix from the camera matrix
	let viewMatrix = M4.inverse(cameraMatrix)

	// Make the Projection matrix: move the projection space to vue space (=space in front of camera)
	let viewProjectionMatrix = M4.multiply(projectionMatrix, viewMatrix)

	let matrix = M4.xRotate(
		viewProjectionMatrix,
		programInfo.context.geometry.rotation[0],
	)
	matrix = M4.yRotate(matrix, programInfo.context.geometry.rotation[1])

	// Set the matrix.
	gl.uniformMatrix4fv(programInfo.uniformLocations.u_matrix, false, matrix)

	// setPositionAttribute(gl, buffers, programInfo)
	// setColorAttribute(gl, buffers, programInfo)

	// Draw the geometry.
	let primitiveType = gl.TRIANGLES
	let offset = 0
	let count = 16 * 6
	gl.drawArrays(primitiveType, offset, count)
}

export {drawScene}
