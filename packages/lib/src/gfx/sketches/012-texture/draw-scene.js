import geometries from '../../lib/geometries'

const {DEFAULT_TEXTURE_COORDS} = geometries

/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {*} programInfo
 * @param {*} buffers
 */
function drawScene(gl, programInfo, channels) {
	// Create a texture
	let texture = gl.createTexture()

	// make unit 0 the active texture unit
	// i.e the unit all other texture commands will affect
	gl.activeTexture(gl.TEXTURE0 + 0)

	// Bind texture to 'texture unit 0' 2D bind point
	gl.bindTexture(gl.TEXTURE_2D, texture)

	// Set the parameters so we don't need mips (?):
	// - we're not filtering
	// - we don't repeat
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

	// Upload the image into the texture
	let mipLevel = 0 // the largest mip
	let internalFormat = gl.RGBA // format we want in the texture
	let srcFormat = gl.RGBA // format of data we are supplying
	let srcType = gl.UNSIGNED_BYTE // type of data we are supplying

	// texImage2D(target, level, internalformat, format, type, source)
	gl.texImage2D(
		gl.TEXTURE_2D,
		mipLevel,
		internalFormat,
		srcFormat,
		srcType,
		programInfo.context.image,
	)

	gl.uniform4iv(programInfo.uniformLocations.u_channelSwap, channels)
	// Pass in the canvas resolution to convert from pixels to clipspace in the shader
	gl.uniform2f(programInfo.uniformLocations.u_resolution, gl.canvas.width, gl.canvas.height)
	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)

	// Tell the shader to get the texture from texture unit 0
	gl.uniform1i(programInfo.uniformLocations.u_image, 0)

	// Set a rectangle the same dimensions as the image
	const primitiveType = gl.TRIANGLES
	const offset = 0
	const count = 6
	gl.drawArrays(primitiveType, offset, count)
}

function setPositionAttribute(gl, buffers, programInfo) {
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

function setTextureAttribute(gl, buffers, programInfo) {
	const count = 2 // pull out 3 values from buffer per iteration
	const type = gl.FLOAT // the data in the buffer is 32bit floats
	const normalize = false
	const stride = 0 // indicates # of bytes from one set of values to the next = 0 -> use type & count instead
	const offset = 0 // byte index to start reading data in the buffer = 0 -> start at the beginning

	gl.bindBuffer(gl.ARRAY_BUFFER, buffers.texCoordBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(DEFAULT_TEXTURE_COORDS), gl.STATIC_DRAW)
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

export {drawScene, setPositionAttribute, setTextureAttribute}
