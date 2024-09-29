import geometries from '../../geometries'

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
export function updateBuffers(
	gl,
	programInfo,
	{texCoordBuffer, positionBuffer},
) {
	const {width, height} = programInfo.context
	updateTextureBufferData(gl, texCoordBuffer)
	updatePositionBufferData(gl, positionBuffer, width, height)

	return {
		texCoordBuffer,
		positionBuffer,
	}
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
	const count = 2 // pull out 3 values from buffer per iteration
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
