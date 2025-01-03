// @ts-check
/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {*} programInfo
 * @param {*} context
 */
function drawScene(gl, programInfo, {channels, blur}) {
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
	const image = programInfo.context.image
	console.log('image', image)

	gl.texImage2D(
		gl.TEXTURE_2D,
		mipLevel,
		internalFormat,
		srcFormat,
		srcType,
		image,
	)

	gl.uniform4iv(programInfo.uniformLocations.u_channels, channels)
	gl.uniform1i(programInfo.uniformLocations.u_blur, blur)
	// Pass in the canvas resolution to convert from pixels to clipspace in the shader
	gl.uniform2f(
		programInfo.uniformLocations.u_resolution,
		gl.canvas.width,
		gl.canvas.height,
	)
	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)

	// Tell the shader to get the texture from texture unit 0
	gl.uniform1i(programInfo.uniformLocations.u_image, 0)

	// Set a rectangle the same dimensions as the image
	const primitiveType = gl.TRIANGLES
	const offset = 0
	const count = 6
	gl.drawArrays(primitiveType, offset, count)
}

export {drawScene}
