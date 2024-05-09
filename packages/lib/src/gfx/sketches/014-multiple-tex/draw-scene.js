/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {*} programInfo
 * @param {*} buffers
 */
function drawScene(gl, programInfo, {textures, channels, blur}) {
	// Enable blending
	gl.enable(gl.BLEND)
	// Set the blend function
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

	// Set the viewport and the resolution uniform
	gl.uniform2f(
		programInfo.uniformLocations.u_resolution,
		gl.canvas.width,
		gl.canvas.height,
	)
	const primitiveType = gl.TRIANGLES
	const offset = 0
	const count = 6

	// Draw each texture
	for (let i = 0; i < textures.length; i++) {
		let texture = textures[i]

		// Set the parameters so we don't need mips (?):
		// - we're not filtering
		// - we don't repeat
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

		let image = programInfo.context.images[i]
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
			image,
		)

		// make unit i the active texture unit
		// i.e the unit all other texture commands will affect
		gl.activeTexture(gl.TEXTURE0 + i)
		gl.bindTexture(gl.TEXTURE_2D, texture)

		// Bind texture to 'texture unit i' 2D bind point
		// Tell the shader to get the texture from texture unit i
		gl.uniform1i(programInfo.uniformLocations[`u_image${i} `], i)
		gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
		gl.drawArrays(primitiveType, offset, count)
	}
	// gl.uniform4iv(programInfo.uniformLocations.u_channels, channels)
	// gl.uniform1i(programInfo.uniformLocations.u_blur, blur)

	// Pass in the canvas resolution to convert from pixels to clipspace in the shader
}

export {drawScene}
