import geometries from '../../math/geometries'
import matrices from '../../math/matrices'

const {M4} = matrices
const {DEFAULT_TEXTURE_COORDS} = geometries

//  {width, height} = programInfo.context
export function initBuffers(gl) {
	let positionBuffer = gl.createBuffer()
	let texCoordBuffer = gl.createBuffer()

	return {
		texCoordBuffer,
		positionBuffer,
	}
}

//  {width, height} = programInfo.context
export function updateGeometryBuffers(gl, {texCoordBuffer, positionBuffer}) {
	updateTextureBufferData(gl, texCoordBuffer)
	updatePositionBufferGeometry(gl, positionBuffer)

	return {
		texCoordBuffer,
		positionBuffer,
	}
}
//  {width, height} = programInfo.context
export function updateBuffers(
	gl,
	programInfo,
	{texCoordBuffer, positionBuffer},
) {
	const {width, height} = programInfo.context.texture.image
	updateTextureBufferData(gl, texCoordBuffer)
	updatePositionBufferData(gl, positionBuffer, width, height)

	return {
		texCoordBuffer,
		positionBuffer,
	}
}

function updatePositionBufferGeometry(gl, positionBuffer) {
	// Select positionBuffer as current buffer to use for buffer ops
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
	// Pass the list of positions into WebGL to build the shape.
	// Center the F around the origin and Flip it around. We do this because
	// we're in 3D now with and +Y is up where as before when we started with 2D
	// we had +Y as down.

	// We could do by changing all the values above but I'm lazy.
	// We could also do it with a matrix at draw time but you should
	// never do stuff at draw time if you can do it at init time.
	var matrix = M4.translate(M4.xRotation(Math.PI), -50, -75, -15)
	//var matrix = M4.xRotate(m4.translation(-50, -75, -15), Math.PI);

	for (var ii = 0; ii < DEFAULT_TEXTURE_COORDS.length; ii += 3) {
		var vector = M4.transformPoint(matrix, [
			DEFAULT_TEXTURE_COORDS[ii + 0],
			DEFAULT_TEXTURE_COORDS[ii + 1],
			DEFAULT_TEXTURE_COORDS[ii + 2],
			1,
		])
		DEFAULT_TEXTURE_COORDS[ii + 0] = vector[0]
		DEFAULT_TEXTURE_COORDS[ii + 1] = vector[1]
		DEFAULT_TEXTURE_COORDS[ii + 2] = vector[2]
	}

	gl.bufferData(gl.ARRAY_BUFFER, DEFAULT_TEXTURE_COORDS, gl.STATIC_DRAW)
}

function updatePositionBufferData(gl, positionBuffer, width, height) {
	// Select positionBuffer as current buffer to use for buffer ops
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

	// Create an array of positions for the geometry.
	const x1 = 0
	const x2 = width
	const y1 = 0
	const y2 = height
	// prettier-ignore
	const coords = [
			x1, y1,
			x2, y1,
			x1, y2,
			x1, y2,
			x2, y1,
			x2, y2,
		]
	// Pass the list of positions into WebGL to build the shape.
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW)
}

function updateTextureBufferData(gl, texCoordBuffer) {
	gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array(DEFAULT_TEXTURE_COORDS),
		gl.STATIC_DRAW,
	)
}

export function setPositionAttributeGeometry(gl, buffers, programInfo) {
	const count = 3 // pull out 3 values from buffer per iteration
	const type = gl.FLOAT // the data in the buffer is 32bit floats
	const normalize = false
	const stride = 0 // indicates # of bytes from one set of values to the next = 0 -> use type & count instead
	const offset = 0 // byte index to start reading data in the buffer = 0 -> start at the beginning

	gl.bindBuffer(gl.ARRAY_BUFFER, buffers.positionBuffer)
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

export function setPositionAttribute(gl, buffers, programInfo) {
	const count = 2 // pull out 3 values from buffer per iteration
	const type = gl.FLOAT // the data in the buffer is 32bit floats
	const normalize = false
	const stride = 0 // indicates # of bytes from one set of values to the next = 0 -> use type & count instead
	const offset = 0 // byte index to start reading data in the buffer = 0 -> start at the beginning

	gl.bindBuffer(gl.ARRAY_BUFFER, buffers.positionBuffer)
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

export function setTextureAttribute(gl, buffers, programInfo) {
	const count = 2 // pull out 2 values from buffer per iteration
	const type = gl.FLOAT // the data in the buffer is 32bit floats
	const normalize = false
	const stride = 0 // indicates # of bytes from one set of values to the next = 0 -> use type & count instead
	const offset = 0 // byte index to start reading data in the buffer = 0 -> start at the beginning

	gl.bindBuffer(gl.ARRAY_BUFFER, buffers.texCoordBuffer)
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array(DEFAULT_TEXTURE_COORDS),
		gl.STATIC_DRAW,
	)
	gl.vertexAttribPointer(
		programInfo.attribLocations.a_texCoord,
		count,
		type,
		normalize,
		stride,
		offset,
	)
	gl.enableVertexAttribArray(programInfo.attribLocations.a_texCoord)
}
